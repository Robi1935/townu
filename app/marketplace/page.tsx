import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageTitle } from "@/components/ui";
import { marketplaceItems } from "@/lib/demo-data";

export default function MarketplacePage() {
  return (
    <AppShell>
      <PageTitle title="Marketplace" subtitle="Buy, sell, give away and move out smarter." />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 text-xs font-bold">
        {["All","Furniture","Dorm","Electronics","Textbooks","Game Day","Free"].map((x) => (
          <button key={x} className="whitespace-nowrap rounded-full border border-zinc-200 bg-white px-4 py-2">{x}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {marketplaceItems.concat(marketplaceItems).map((item, i) => (
          <Link key={`${item.id}-${i}`} href={`/marketplace/${item.id}`} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-6xl">{item.emoji}</div>
            <div className="p-3">
              <p className="font-black">{item.price}</p>
              <p className="truncate text-sm">{item.title}</p>
              <p className="mt-1 text-[11px] text-zinc-500">{item.meta}</p>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
