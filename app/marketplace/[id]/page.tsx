import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { marketplaceItems } from "@/lib/demo-data";

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = marketplaceItems.find((x) => x.id === id) ?? marketplaceItems[0];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="flex aspect-[16/10] items-center justify-center bg-zinc-100 text-8xl">{item.emoji}</div>
        <div className="p-5 md:p-7">
          <p className="text-3xl font-black">{item.price}</p>
          <h1 className="mt-1 text-2xl font-black">{item.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{item.meta}</p>
          <div className="my-5 h-px bg-zinc-100" />
          <p className="text-sm leading-6 text-zinc-700">
            Demo listing. Real listings will include condition, description, school affiliation,
            approximate pickup location, delivery options, seller verification and other seller items.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="rounded-2xl bg-black px-4 py-3 font-black text-white">Message seller</button>
            <button className="rounded-2xl border border-zinc-300 px-4 py-3 font-black">Save</button>
          </div>
          <Link href="/marketplace" className="mt-5 block text-center text-sm font-bold underline">Back to marketplace</Link>
        </div>
      </div>
    </AppShell>
  );
}
