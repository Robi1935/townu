import { AppShell } from "@/components/app-shell";
import { PageTitle } from "@/components/ui";
import { services } from "@/lib/demo-data";

const filters = ["All", "Laundry", "Cleaning", "Tutoring", "Move-in", "Storage", "Auto", "Beauty"];

export default function Page() {
  return (
    <AppShell>
      <PageTitle
        title="Local Services"
        subtitle="Laundry, cleaning, tutoring, moving, storage, auto help, beauty, photography and more."
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2 text-xs font-bold">
        {filters.map((filter) => (
          <button
            key={filter}
            className="whitespace-nowrap rounded-full border border-zinc-200 bg-white px-4 py-2"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.name} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="text-4xl">{service.emoji}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black text-amber-800">
                DEMO
              </span>
            </div>
            <h2 className="mt-4 text-lg font-black">{service.name}</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-600">{service.detail}</p>
            <button className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-sm font-black text-white">
              View service
            </button>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-sm text-zinc-600">
        These are starter demo listings so early students and parents have something to browse. We will replace them with real Tuscaloosa providers as partners join TownU.
      </div>
    </AppShell>
  );
}
