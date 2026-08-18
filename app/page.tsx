import Link from "next/link";
import { Search, ShoppingBag, BriefcaseBusiness, BadgePercent, House, HeartHandshake, CalendarDays } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/ui";
import { deals, hustles, marketplaceItems, services } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
const categories = [
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Services", href: "/services", icon: BriefcaseBusiness },
  { label: "Hustles", href: "/hustles", icon: BriefcaseBusiness },
  { label: "Deals", href: "/deals", icon: BadgePercent },
  { label: "Housing", href: "/housing", icon: House },
  { label: "Care", href: "/care", icon: HeartHandshake },
  { label: "Campus", href: "/campus", icon: CalendarDays },
];

export default async function HomePage() {
  const supabase = await createClient{};

  const { data: schools, error } = await supabase
    .from("schools")
    .select("name")
    .order("name");
  if (error) {
    console.error("Supabase connection test failed:', error);
                  }
  return (
    <AppShell>
      <section className="rounded-[2rem] bg-black p-6 text-white md:p-10">
        <p className="text-sm font-bold text-amber-400">TOWNU • TUSCALOOSA</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-black leading-tight md:text-6xl">
          Your college town. All in one place.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300 md:text-base">
          Buy, sell, save, earn and find trusted local help across Tuscaloosa’s college community.
        </p>
        <Link href="/explore" className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-3 font-black text-black">
          Explore Tuscaloosa
        </Link>
      </section>

      <Link href="/explore" className="mt-5 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-500">
        <Search size={20} />
        Search TownU
      </Link>

      <div className="hide-scrollbar mt-5 flex gap-3 overflow-x-auto pb-2">
        {categories.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className="min-w-[108px] rounded-2xl bg-white p-4 text-center shadow-sm">
            <Icon className="mx-auto mb-2" size={23} />
            <span className="text-xs font-black">{label}</span>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <SectionHeader title="Near You" href="/marketplace" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {marketplaceItems.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-6xl">{item.emoji}</div>
              <div className="p-3">
                <p className="font-black">{item.price}</p>
                <p className="truncate text-sm">{item.title}</p>
                <p className="mt-1 text-[11px] text-zinc-500">{item.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="Popular Services" href="/services" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <Link href="/services" key={service.name} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <span className="text-3xl">{service.emoji}</span>
              <div>
                <p className="font-black">{service.name}</p>
                <p className="text-xs text-zinc-500">{service.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="Student Hustles" href="/hustles" />
        <div className="grid gap-3 md:grid-cols-3">
          {hustles.map((hustle) => (
            <div key={hustle.name} className="rounded-2xl bg-white p-4 shadow-sm">
              <span className="text-3xl">{hustle.emoji}</span>
              <p className="mt-3 font-black">{hustle.name}</p>
              <p className="text-xs text-zinc-500">{hustle.school}</p>
              <p className="mt-2 text-sm font-bold">{hustle.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 mb-8">
        <SectionHeader title="Today’s Deals" href="/deals" />
        <div className="grid gap-3 md:grid-cols-3">
          {deals.map((deal) => (
            <div key={deal.title} className="rounded-2xl bg-amber-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{deal.emoji}</span>
                <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">{deal.offer}</span>
              </div>
              <p className="mt-4 font-black">{deal.title}</p>
              <p className="text-xs text-zinc-600">{deal.business}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-8 mb-8 rounded-3xl bg-white p-5 shadow-sm">
  <p className="text-xs font-black uppercase tracking-wide text-amber-600">
    Live Supabase Test
  </p>

  <h2 className="mt-2 text-xl font-black">
    Tuscaloosa schools connected
  </h2>

  <div className="mt-3 space-y-2">
    {schools?.map((school) => (
      <div
        key={school.name}
        className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold"
      >
        {school.name}
      </div>
    ))}
  </div>

  {!schools?.length && (
    <p className="mt-3 text-sm text-zinc-500">
      No school records returned yet.
    </p>
  )}
</section>
    </AppShell>
  );
}
