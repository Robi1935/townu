"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  public_name: string | null;
  first_name: string | null;
  role: string;
  school_id: string | null;
  schools?: { name: string } | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setLoading(false);
        return;
      }

      setEmail(userData.user.email || "");
      const { data } = await supabase
        .from("profiles")
        .select("public_name, first_name, role, school_id, schools(name)")
        .eq("id", userData.user.id)
        .single();

      setProfile(data as Profile | null);
      setLoading(false);
    }

    loadProfile();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return <AppShell><p className="py-10 text-sm text-zinc-500">Loading your profile…</p></AppShell>;
  }

  if (!profile) {
    return (
      <AppShell>
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-black">You're not signed in</h1>
          <p className="mt-2 text-sm text-zinc-600">Create a TownU account or sign in to manage your profile.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/sign-up" className="rounded-xl bg-teal-700 px-4 py-3 font-bold text-white">Sign up</Link>
            <Link href="/sign-in" className="rounded-xl border border-zinc-300 px-4 py-3 font-bold">Sign in</Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const roleLabel = profile.role === "business" ? "Provider / Business" : profile.role === "parent" ? "Parent / Family" : "Student";
  const schoolName = profile.schools?.name || "School not selected";

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-teal-700">TownU Profile</p>
          <h1 className="mt-2 text-3xl font-black">{profile.public_name || profile.first_name || "TownU Member"}</h1>
          <p className="mt-1 text-sm text-zinc-500">{email}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-100 p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">Account type</p>
              <p className="mt-1 font-black">{roleLabel}</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">School community</p>
              <p className="mt-1 font-black">{schoolName}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/onboarding" className="rounded-xl border border-zinc-300 px-4 py-3 text-sm font-bold">Edit profile</Link>
            <button onClick={signOut} className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white">Sign out</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
