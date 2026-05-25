import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ManagerWeb } from "@/components/emulators/ManagerWeb";
import { ManagerShell } from "@/components/manager/Shell";
import { findUnit, UNIT_TYPE_META, type UnitType } from "@/lib/manager/units";
import { PartyPopper, Users, ChevronLeft, Sparkles, UserCircle2, ShoppingBag, Wrench, Smartphone } from "lucide-react";

const VALID_TYPES: UnitType[] = ["place", "event", "community", "person", "product", "service", "app"];

export const Route = createFileRoute("/business/unit/$type/$id")({
  ssr: false,
  params: {
    parse: (raw) => {
      const t = raw.type as UnitType;
      if (!VALID_TYPES.includes(t)) throw notFound();
      return { type: t, id: String(raw.id) };
    },
    stringify: (p) => ({ type: p.type, id: p.id }),
  },
  head: ({ params }) => {
    const meta = UNIT_TYPE_META[params.type as UnitType];
    return {
      meta: [
        { title: `Mesita — ${meta.label}` },
        { name: "description", content: `Manage your ${meta.label.toLowerCase()} on Mesita.` },
      ],
    };
  },
  component: UnitDashboard,
});

function UnitDashboard() {
  const params = Route.useParams();
  const type = params.type as UnitType;
  const id = params.id;
  const unit = findUnit(type, id);

  if (!unit) {
    return (
      <ManagerShell>
        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Unit not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find a {UNIT_TYPE_META[type].label.toLowerCase()} with id <code>{id}</code> in your workspace.
          </p>
          <Link
            to="/manager/central"
            className="mt-6 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-card-soft"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back to central
          </Link>
        </div>
      </ManagerShell>
    );
  }

  // Places have the full prototype dashboard. Other types get a stub
  // tailored to their content shape until we build them out.
  if (type === "place") {
    return (
      <div className="h-screen w-screen overflow-hidden bg-background">
        <ManagerWeb />
      </div>
    );
  }

  return <SoonDashboard type={type} name={unit.name} />;
}

function SoonDashboard({ type, name }: { type: Exclude<UnitType, "place">; name: string }) {
  const Icon =
    type === "event" ? PartyPopper :
    type === "community" ? Users :
    type === "person" ? UserCircle2 :
    type === "product" ? ShoppingBag :
    type === "service" ? Wrench :
    Smartphone;
  const meta = UNIT_TYPE_META[type];

  return (
    <ManagerShell>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/manager/central"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3 w-3" /> Central
        </Link>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/15 to-rose-500/5">
            <Icon className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {meta.label}
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight">{name}</h1>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2 text-pink-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Coming soon</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold">
            The {meta.label.toLowerCase()} dashboard is on its way
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {meta.hint}. Once it ships, you'll manage capacity, ticketing, member rules and promos for <span className="font-medium text-foreground">{name}</span> from right here — same shape as the place dashboard you've already seen.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {["Home", "Details", "Promos", "Performance", "Wallet", "Team"].map((m) => (
              <div key={m} className="rounded-xl border border-dashed border-black/10 bg-black/[0.02] p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground/70">{m}</p>
                <p className="mt-0.5 text-[10.5px]">Module coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ManagerShell>
  );
}