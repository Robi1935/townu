export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
      <section className="w-full rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-3xl font-black">Town<span className="text-amber-500">U</span></p>
        <h1 className="mt-8 text-2xl font-black">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-500">Authentication will connect to Supabase next.</p>
        <input type="email" placeholder="Email" className="mt-6 w-full rounded-xl border border-zinc-200 px-3 py-3" />
        <input type="password" placeholder="Password" className="mt-3 w-full rounded-xl border border-zinc-200 px-3 py-3" />
        <button className="mt-4 w-full rounded-xl bg-black px-4 py-3 font-black text-white">Sign in</button>
      </section>
    </main>
  );
}
