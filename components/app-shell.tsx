import Link from "next/link";
import { Home, Search, Plus, MessageCircle, UserRound } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Town<span className="text-amber-500">U</span>
          </Link>
          <div className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold">
            Tuscaloosa, AL
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white">
        <div className="mx-auto grid max-w-xl grid-cols-5 items-center px-2 py-2 text-[11px]">
          <NavItem href="/" icon={<Home size={20} />} label="Home" />
          <NavItem href="/explore" icon={<Search size={20} />} label="Explore" />
          <Link
            href="/post"
            className="mx-auto -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg"
            aria-label="Create post"
          >
            <Plus size={26} />
          </Link>
          <NavItem href="/messages" icon={<MessageCircle size={20} />} label="Messages" />
          <NavItem href="/profile" icon={<UserRound size={20} />} label="Profile" />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-1 text-zinc-600 hover:text-black">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
