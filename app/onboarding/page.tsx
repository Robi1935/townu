"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState(searchParams.get("role") || "student");
  const [school, setSchool] = useState(searchParams.get("school") || "University of Alabama");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMetadata() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const metadata = data.user?.user_metadata;
      if (metadata?.role && !searchParams.get("role")) setRole(metadata.role);
      if (metadata?.school_name && !searchParams.get("school")) setSchool(metadata.school_name);
    }
    loadMetadata();
  }, [searchParams]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      setLoading(false);
      setMessage("Please sign in first.");
      return;
    }

    const { data: schoolRow, error: schoolError } = await supabase
      .from("schools")
      .select("id, market_id")
      .eq("name", school)
      .single();

    if (schoolError || !schoolRow) {
      setLoading(false);
      setMessage("We couldn't match that school. Please try again.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role, school_id: schoolRow.id, market_id: schoolRow.market_id, updated_at: new Date().toISOString() })
      .eq("id", authData.user.id);

    setLoading(false);

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    router.push("/profile");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-10">
      <section className="w-full rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
        <p className="text-3xl font-black">Town<span className="text-teal-600">U</span></p>
        <h1 className="mt-8 text-3xl font-black">Finish your profile</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">Choose how you're using TownU and the school community you want to follow.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <p className="text-sm font-black">I am a…</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {roles.map((item) => (
                <button key={item.value} type="button" onClick={() => setRole(item.value)} className={`rounded-xl border px-3 py-3 text-sm font-bold ${role === item.value ? "border-teal-600 bg-teal-50 text-teal-800" : "border-zinc-200"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-black">School</span>
            <select value={school} onChange={(e) => setSchool(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-3">
              {schoolOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          {message && <p className="rounded-xl bg-zinc-100 px-3 py-3 text-sm">{message}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-teal-700 px-4 py-3 font-black text-white disabled:opacity-60">{loading ? "Saving…" : "Save and continue"}</button>
        </form>
      </section>
    </main>
  );
}
