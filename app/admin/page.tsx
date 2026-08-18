import { AppShell } from "@/components/app-shell";
import { PageTitle, Placeholder } from "@/components/ui";

export default function Page() {
  return (
    <AppShell>
      <PageTitle title="TownU Admin" subtitle="Manage markets, schools, users, listings, businesses, deals, reports and featured content." />
      <Placeholder
        title="Foundation ready"
        description="This route is included in the starter so we can wire the real Supabase data and interactions next without rebuilding navigation or structure."
      />
    </AppShell>
  );
}
