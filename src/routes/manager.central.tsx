import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Plus, Sparkles, Compass, PartyPopper, Users, Store } from "lucide-react";
import { ManagerShell } from "@/components/manager/Shell";
import { MY_UNITS, UNIT_TYPE_META, type UnitType } from "@/lib/manager/units";

export const Route = createFileRoute("/manager/central")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mesita — Central" },
      { name: "description", content: "Pick a unit to open its dashboard, or add another." },
    ],
  }),
  component: Central,
});

const TYPE_ICON: Record<UnitType, typeof Store> = {
  place: Store,
  experience: Compass,
  event: PartyPopper,
  community: Users,
};

const TYPE_ACCENT: Record<UnitType, string> = {
  place:      "from-rose-500/15 to-pink-500/5 text-rose-600",
  experience: "from-emerald-500/15 to-teal-500/5 text-emerald-600",
  event:      "from-violet-500/15 to-fuchsia-500/5 text-violet-600",
  community:  "from-sky-500/15 to-cyan-500/5 text-sky-600",
};

function Central() {
  const units = MY_UNITS;

  if (units.length === 0) {
    return (
      <ManagerShell>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24">
          <div className="w-full rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
              <Sparkles className="h-6 w-6 text-pink-500" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Add your first unit</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Mesita lists every venue, experience, event and community on the open internet. Claim what you operate (or create a brand-new listing) and your dashboard shows up here.
            </p>
            <Link
              to="/manager/add"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              <MapPin className="h-4 w-4" /> Add a unit
            </Link>
          </div>
        </div>
      </ManagerShell>
    );
  }

  return (
    <ManagerShell>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">Your units</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a unit to open its dashboard, or add another.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {units.map((u) => {
            const Icon = TYPE_ICON[u.type];
            return (
              <Link
                key={u.id}
                to="/manager/unit/$type/$id"
                params={{ type: u.type, id: u.id }}
                className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${TYPE_ACCENT[u.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {UNIT_TYPE_META[u.type].label}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold">{u.name}</h3>
                <p className="mt-1 truncate text-xs text-muted-foreground">{u.address}</p>
                <p className="mt-4 text-xs font-semibold text-pink-600 group-hover:text-pink-700">
                  Open dashboard →
                </p>
              </Link>
            );
          })}
        </div>

        <Link
          to="/manager/add"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/15 bg-white/40 py-5 text-sm font-medium text-muted-foreground transition hover:border-pink-300 hover:bg-white hover:text-foreground"
        >
          <Plus className="h-4 w-4" /> Add another unit
        </Link>
      </div>
    </ManagerShell>
  );
}