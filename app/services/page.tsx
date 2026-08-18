import { AppShell } from "@/components/app-shell";
import { PageTitle, Placeholder } from "@/components/ui";

export default function Page() {
  return (
    <AppShell>
      <PageTitle title="Local Services" subtitle="Laundry, cleaning, tutoring, moving, storage, auto help, beauty, photography and more." />
      <Placeholder
        title="Foundation ready"
        description="This route is included in the starter so we can wire the real Supabase data and interactions next without rebuilding navigation or structure."
      />
    </AppShell>
  );
}
