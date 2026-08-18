import { AppShell } from "@/components/app-shell";
import { PageTitle } from "@/components/ui";

export default function Page() {
  return (
    <AppShell>
      <PageTitle title="Create Business deal" subtitle="Starter form — Supabase submission will be connected next." />
      <form className="mx-auto max-w-2xl space-y-4 rounded-3xl bg-white p-5 shadow-sm">
        <label className="block">
          <span className="text-sm font-bold">Title</span>
          <input className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-3" placeholder="Enter a title" />
        </label>
        <label className="block">
          <span className="text-sm font-bold">Description</span>
          <textarea className="mt-1 min-h-32 w-full rounded-xl border border-zinc-200 px-3 py-3" placeholder="Tell people what they need to know" />
        </label>
        <button type="button" className="w-full rounded-xl bg-black px-4 py-3 font-black text-white">Save draft</button>
      </form>
    </AppShell>
  );
}
