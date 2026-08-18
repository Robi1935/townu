import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageTitle } from "@/components/ui";

const choices = [
  ["Sell an item", "/post/marketplace", "🛍️"],
  ["Offer a service", "/post/service", "💰"],
  ["Post housing", "/post/housing", "🏠"],
  ["Create a deal", "/post/deal", "🔥"],
  ["Create an event", "/post/event", "📅"],
];

export default function PostPage() {
  return (
    <AppShell>
      <PageTitle title="Create" subtitle="What would you like to post?" />
      <div className="grid gap-3 sm:grid-cols-2">
        {choices.map(([label,href,emoji]) => (
          <Link key={label} href={href} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <span className="text-3xl">{emoji}</span>
            <span className="font-black">{label}</span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
