"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(searchParams.get("confirmed") ? "Email confirmed. You can sign in now." : "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/onboarding");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
      <section className="w-full rounded-[2rem] bg-white p-6 shadow-sm">
        <Link href="/" className="text-3xl font-black">Town<span className="text-teal-600">U</span></Link>
        <h1 className="mt-8 text-2xl font-black">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-500">Welcome back to TownU.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-zinc-200 px-3 py-3" />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-zinc-200 px-3 py-3" />
          {message && <p className="rounded-xl bg-zinc-100 px-3 py-3 text-sm">{message}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-teal-700 px-4 py-3 font-black text-white disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-600">Need an account? <Link href="/sign-up" className="font-bold underline">Sign up</Link></p>
      </section>
    </main>
  );
}
