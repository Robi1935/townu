import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-black tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
    </div>
  );
}

export function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-xl font-black">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-sm font-bold">
          See all <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

export function Placeholder({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
