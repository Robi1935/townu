"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const roles = [
  { label: "Student", value: "student" },
  { label: "Parent / Family", value: "parent" },
  { label: "Provider / Business", value: "business" },
];

const schoolOptions = [
  "University of Alabama",
  "Stillman College",
  "Shelton State Community College",
];

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [school, setSchool] = useState("University of Alabama");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/sign-in?confirmed=1`,
        data: {
          first_name: firstName,
          role,
          school_name: school,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      router.push(`/onboarding?role=${role}&school=${encodeURIComponent(school)}`);
      router.refresh();
      return;
    }

    setMessage("Account created. Check your email to confirm your account, then sign in.");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-4 py-10">
      <section className="w-full rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
        <Link href="/" className="text-3xl font-black">Town<span className="text-teal-600">U</span></Link>
        <h1 className="mt-8 text-3xl font-black">Create your TownU account</h1>
        <p className="mt-2 text-sm text-zinc-600">Join as a student, parent/family member, or local provider.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-bold">First name</span>
            <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-3" />
          </label>

          <div>
            <p className="text-sm font-bold">I am a…</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {roles.map((item) => (
                <button key={item.value} type="button" onClick={() => setRole(item.value)} className={`rounded-xl border px-3 py-3 text-sm font-bold ${role === item.value ? "border-teal-600 bg-teal-50 text-teal-800" : "border-zinc-200"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-bold">School</span>
            <select value={school} onChange={(e) => setSchool(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-3">
              {schoolOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold">Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-3" />
          </label>

          <label className="block">
            <span className="text-sm font-bold">Password</span>
            <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-3" />
          </label>

          {message && <p className="rounded-xl bg-zinc-100 px-3 py-3 text-sm">{message}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-teal-700 px-4 py-3 font-black text-white disabled:opacity-60">
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-600">Already have an account? <Link className="font-bold underline" href="/sign-in">Sign in</Link></p>
      </section>
    </main>
  );
}
