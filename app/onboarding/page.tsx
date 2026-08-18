import { schools } from "@/lib/demo-data";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-10">
      <section className="w-full rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
        <p className="text-3xl font-black">Town<span className="text-amber-500">U</span></p>
        <h1 className="mt-8 text-3xl font-black">Welcome to your college town.</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">Tell us how you’re connected so TownU can personalize your experience.</p>

        <div className="mt-6">
          <p className="text-sm font-black">I am a…</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {["Student","Parent / Family","Faculty / Staff","Alumni","Local Resident","Business Owner"].map((role) => (
              <button key={role} className="rounded-xl border border-zinc-200 px-3 py-3 text-sm font-bold hover:bg-zinc-50">{role}</button>
            ))}
          </div>
        </div>

        <label className="mt-6 block">
          <span className="text-sm font-black">School</span>
          <select className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-3">
            <option>Select school</option>
            {schools.map((school) => <option key={school}>{school}</option>)}
            <option>Other / Not affiliated</option>
          </select>
        </label>

        <button className="mt-7 w-full rounded-xl bg-black px-4 py-3 font-black text-white">Continue</button>
      </section>
    </main>
  );
}
