import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Store, Compass, PartyPopper, Users } from "lucide-react";
import { ManagerShell } from "@/components/manager/Shell";
import { UNIT_TYPE_META, type UnitType } from "@/lib/manager/units";

export const Route = createFileRoute("/manager/add")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mesita — Add a unit" },
      { name: "description", content: "Add a new unit to your Mesita workspace." },
    ],
  }),
  component: AddUnit,
});

const TYPE_ICON: Record<UnitType, typeof Store> = {
  place: Store,
  experience: Compass,
  event: PartyPopper,
  community: Users,
};

const PLACEHOLDER: Record<UnitType, string> = {
  place:      "e.g. Cosmo San Pedro, Pangea, Koli…",
  experience: "e.g. Cata de Mezcal, Pasta Workshop…",
  event:      "e.g. Pa'l Norte 2026, Bad Bunny Tour…",
  community:  "e.g. Rooftop Society MTY, Borregos Tec…",
};

function AddUnit() {
  const [type, setType] = useState<UnitType>("place");
  const [query, setQuery] = useState("");

  return (
    <ManagerShell>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-4xl font-bold tracking-tight">Add a unit</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A unit is anything you operate on Mesita — a place, an experience, an event or a community. Pick the type, then we'll pull the profile straight from the open internet and show its current Mesita status inline.
        </p>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Type of unit
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {(Object.keys(UNIT_TYPE_META) as UnitType[]).map((t) => {
              const Icon = TYPE_ICON[t];
              const active = type === t;
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition ${
                    active
                      ? "border-pink-400 bg-white shadow-sm"
                      : "border-black/5 bg-white/60 hover:bg-white"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    active ? "bg-pink-50 text-pink-600" : "bg-black/5 text-muted-foreground"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{UNIT_TYPE_META[t].label}</p>
                    <p className="text-[10.5px] text-muted-foreground">{UNIT_TYPE_META[t].hint}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Find it on the open internet
          </p>
          <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm focus-within:border-pink-300">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={PLACEHOLDER[type]}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            We pull data from Google Business, Luma, Eventbrite, Instagram and more.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <Link
            to="/manager/central"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to central
          </Link>
          <button
            disabled={!query.trim()}
            className="rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </div>
    </ManagerShell>
  );
}