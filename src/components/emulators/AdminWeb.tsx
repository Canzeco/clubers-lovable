import { useState } from "react";
import {
  Building2,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Flame,
  Sparkles,
  LayoutGrid,
  Map as MapIcon,
  BarChart3,
  ShieldCheck,
  Crown,
  PencilLine,
  ImagePlus,
  Link2,
  Download,
  GripVertical,
  Eye,
  Wand2,
  Save,
  Trash2,
  Globe,
  Tag,
} from "lucide-react";

type Tab = "pipeline" | "portfolio" | "editor" | "discover" | "metrics" | "trust";

const stages = [
  { id: "lead", label: "Leads", color: "bg-muted-foreground/30", count: 84 },
  { id: "contact", label: "Contacted", color: "bg-tier-bronze", count: 32 },
  { id: "demo", label: "Demo booked", color: "bg-tier-silver", count: 14 },
  { id: "negotiating", label: "Negotiating", color: "bg-secondary", count: 9 },
  { id: "onboarded", label: "Onboarded", color: "bg-primary", count: 12 },
] as const;

type Lead = {
  id: string;
  name: string;
  type: string;
  area: string;
  ig: string;
  rating: number;
  ticket: string;
  fit: "Hot" | "Warm" | "Cold";
  stage: (typeof stages)[number]["id"];
  owner: string;
  lastTouch: string;
};

const leads: Lead[] = [
  { id: "1", name: "Bocanada", type: "Rooftop · Mediterranean", area: "Roma Nte.", ig: "82k", rating: 4.7, ticket: "$720", fit: "Hot", stage: "lead", owner: "DM", lastTouch: "today" },
  { id: "2", name: "Patio Verde", type: "Brunch · Café", area: "Condesa", ig: "31k", rating: 4.5, ticket: "$380", fit: "Hot", stage: "lead", owner: "AL", lastTouch: "1d" },
  { id: "3", name: "Sal de Mar", type: "Seafood", area: "Polanco", ig: "18k", rating: 4.4, ticket: "$640", fit: "Warm", stage: "lead", owner: "DM", lastTouch: "2d" },
  { id: "4", name: "El Hueco", type: "Mezcal · Bar", area: "Juárez", ig: "9k", rating: 4.6, ticket: "$420", fit: "Warm", stage: "contact", owner: "AL", lastTouch: "today" },
  { id: "5", name: "Galápago", type: "Wine bar", area: "Roma Sur", ig: "14k", rating: 4.8, ticket: "$580", fit: "Hot", stage: "contact", owner: "DM", lastTouch: "today" },
  { id: "6", name: "Tropikalia", type: "Club · Nightlife", area: "Cuauhtémoc", ig: "120k", rating: 4.3, ticket: "$1.2k", fit: "Hot", stage: "demo", owner: "RC", lastTouch: "today" },
  { id: "7", name: "Loto Café", type: "Specialty coffee", area: "Chapultepec", ig: "22k", rating: 4.6, ticket: "$220", fit: "Warm", stage: "demo", owner: "AL", lastTouch: "1d" },
  { id: "8", name: "Costa Azul", type: "Beach club", area: "Tulum", ig: "54k", rating: 4.5, ticket: "$1.8k", fit: "Hot", stage: "negotiating", owner: "DM", lastTouch: "today" },
  { id: "9", name: "Mar Verde", type: "Seafood", area: "Tulum", ig: "11k", rating: 4.4, ticket: "$900", fit: "Cold", stage: "negotiating", owner: "RC", lastTouch: "3d" },
  { id: "10", name: "Casa Luminar", type: "Rooftop", area: "Roma Nte.", ig: "46k", rating: 4.8, ticket: "$640", fit: "Hot", stage: "onboarded", owner: "DM", lastTouch: "now" },
  { id: "11", name: "Neón Bar", type: "Speakeasy", area: "Condesa", ig: "38k", rating: 4.6, ticket: "$520", fit: "Hot", stage: "onboarded", owner: "AL", lastTouch: "now" },
];

function FitChip({ fit }: { fit: Lead["fit"] }) {
  const map = {
    Hot: "bg-destructive/20 text-destructive",
    Warm: "bg-secondary/20 text-secondary",
    Cold: "bg-muted text-muted-foreground",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[fit]}`}>
      {fit === "Hot" && <Flame className="h-2.5 w-2.5" />}
      {fit}
    </span>
  );
}

export function AdminWeb() {
  const [tab, setTab] = useState<Tab>("pipeline");

  const nav: { id: Tab; label: string; Icon: any }[] = [
    { id: "pipeline", label: "Sourcing pipeline", Icon: LayoutGrid },
    { id: "portfolio", label: "Venue portfolio", Icon: Building2 },
    { id: "editor", label: "Venue editor", Icon: PencilLine },
    { id: "discover", label: "Discover venues", Icon: MapIcon },
    { id: "metrics", label: "Network metrics", Icon: BarChart3 },
    { id: "trust", label: "Trust & tier", Icon: ShieldCheck },
  ];

  return (
    <div className="flex h-full bg-background text-foreground">
      <aside className="flex w-60 flex-col border-r border-border bg-sidebar p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary text-lg">
            🦚
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none">Mesita HQ</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Operations</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                tab === n.id ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <n.Icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-3">
          <p className="text-[10px] uppercase tracking-widest text-secondary">This month</p>
          <p className="mt-1 font-display text-lg">+12 venues</p>
          <p className="text-[10px] text-muted-foreground">target 15 · 80%</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-4/5 bg-secondary" />
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Buscar venue, owner, zona…
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs">
              <Filter className="h-3.5 w-3.5" /> CDMX · Premium · 4★+
            </button>
            <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
              <Plus className="h-3.5 w-3.5" /> Añadir venue
            </button>
          </div>
        </div>

        {tab === "pipeline" && <Pipeline />}
        {tab === "portfolio" && <Portfolio />}
        {tab === "editor" && <VenueEditor />}
        {tab === "discover" && <DiscoverVenues />}
        {tab === "metrics" && <Metrics />}
        {tab === "trust" && <TrustTier />}
      </main>
    </div>
  );
}

function Pipeline() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Sourcing pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Arrastra venues por etapa · 151 prospectos abiertos · 12 cerrados este mes
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="rounded-lg border border-border bg-card-soft px-3 py-2 text-center">
            <p className="font-display text-lg font-semibold">38%</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Lead → Demo</p>
          </div>
          <div className="rounded-lg border border-border bg-card-soft px-3 py-2 text-center">
            <p className="font-display text-lg font-semibold">64%</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Demo → Close</p>
          </div>
          <div className="rounded-lg border border-border bg-card-soft px-3 py-2 text-center">
            <p className="font-display text-lg font-semibold">9 días</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ciclo medio</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {stages.map((s) => {
          const items = leads.filter((l) => l.stage === s.id);
          return (
            <div key={s.id} className="rounded-xl border border-border bg-card/40 p-2">
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${s.color}`} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">{s.count}</span>
              </div>
              <div className="space-y-2">
                {items.map((l) => (
                  <LeadCard key={l.id} l={l} />
                ))}
                <button className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:text-foreground">
                  <Plus className="h-3 w-3" /> Añadir
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeadCard({ l }: { l: Lead }) {
  return (
    <div className="cursor-grab space-y-2 rounded-lg border border-border bg-card p-2.5 text-xs shadow-elev transition hover:border-primary/50">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold leading-tight">{l.name}</p>
          <p className="text-[10px] text-muted-foreground">{l.type}</p>
        </div>
        <FitChip fit={l.fit} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{l.area}</span>
        <span className="flex items-center gap-0.5"><Instagram className="h-2.5 w-2.5" />{l.ig}</span>
        <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-secondary text-secondary" />{l.rating}</span>
      </div>
      <div className="flex items-center justify-between border-t border-border/50 pt-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-peacock text-[9px] font-bold text-primary-foreground">
          {l.owner}
        </div>
        <span className="text-[10px] text-muted-foreground">ticket {l.ticket}</span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-2.5 w-2.5" />{l.lastTouch}
        </span>
      </div>
    </div>
  );
}

function Portfolio() {
  const venues = [
    { n: "Casa Luminar", c: "CDMX · Roma", gmv: "$84.2k", redeems: 312, plan: "Premium", st: "Activo", health: 96 },
    { n: "Neón Bar", c: "CDMX · Condesa", gmv: "$62.1k", redeems: 248, plan: "Premium", st: "Activo", health: 88 },
    { n: "Loto Café", c: "GDL · Chapalita", gmv: "$22.4k", redeems: 142, plan: "Standard", st: "Activo", health: 71 },
    { n: "Costa Azul", c: "MTY · San Pedro", gmv: "$41.7k", redeems: 168, plan: "Standard", st: "Onboarding", health: 42 },
    { n: "Bocanada", c: "CDMX · Roma", gmv: "$8.1k", redeems: 24, plan: "Trial", st: "Activo", health: 28 },
  ];
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Venue portfolio</h1>
          <p className="text-sm text-muted-foreground">312 venues activos · 18 onboarding · 4 en riesgo</p>
        </div>
        <div className="flex gap-2 text-xs">
          {["Todos", "Activos", "Onboarding", "En riesgo", "Pausados"].map((f, i) => (
            <button key={f} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card-soft">
        <div className="grid grid-cols-12 border-b border-border bg-card px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="col-span-3">Venue</span>
          <span className="col-span-2">Ciudad</span>
          <span className="col-span-2">GMV mes</span>
          <span className="col-span-1">Canjeos</span>
          <span className="col-span-1">Plan</span>
          <span className="col-span-2">Health score</span>
          <span className="col-span-1">Acción</span>
        </div>
        {venues.map((v) => (
          <div key={v.n} className="grid grid-cols-12 items-center border-b border-border/50 px-4 py-3 text-sm last:border-0 hover:bg-card">
            <div className="col-span-3 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-peacock" />
              <div>
                <p className="font-medium leading-none">{v.n}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{v.st}</p>
              </div>
            </div>
            <span className="col-span-2 text-xs text-muted-foreground">{v.c}</span>
            <span className="col-span-2 font-semibold text-secondary">{v.gmv}</span>
            <span className="col-span-1">{v.redeems}</span>
            <span className="col-span-1 text-xs">{v.plan}</span>
            <div className="col-span-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full ${v.health > 70 ? "bg-emerald-500" : v.health > 40 ? "bg-secondary" : "bg-destructive"}`}
                  style={{ width: `${v.health}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold">{v.health}</span>
            </div>
            <div className="col-span-1">
              <button className="rounded-md border border-border p-1 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoverVenues() {
  const targets = [
    { n: "Galápago", area: "Roma Sur", ig: "14k", rating: 4.8, signals: ["3 Gold guests visitaron", "12 stories tagged"], fit: 92 },
    { n: "Patio Verde", area: "Condesa", ig: "31k", rating: 4.5, signals: ["Trending IG · 7d", "Ticket alto"], fit: 88 },
    { n: "Tropikalia", area: "Cuauhtémoc", ig: "120k", rating: 4.3, signals: ["High footfall", "Late night"], fit: 84 },
    { n: "El Hueco", area: "Juárez", ig: "9k", rating: 4.6, signals: ["Vibe match · mezcal"], fit: 78 },
  ];
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Discover venues</h1>
          <p className="text-sm text-muted-foreground">
            Mesita AI rankea venues no afiliados según señal social y fit.
          </p>
        </div>
        <button className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Refrescar señales
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {targets.map((t) => (
          <div key={t.n} className="rounded-xl border border-border bg-card-soft p-4">
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-xl bg-peacock" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold leading-none">{t.n}</p>
                  <span className="rounded-full bg-gradient-to-r from-secondary to-tier-gold px-2 py-0.5 text-[10px] font-bold text-black">
                    Fit {t.fit}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />{t.area}
                  <Instagram className="h-3 w-3" />{t.ig}
                  <Star className="h-3 w-3 fill-secondary text-secondary" />{t.rating}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {t.signals.map((s) => (
                    <span key={s} className="rounded-full bg-card px-2 py-0.5 text-[10px] text-muted-foreground">
                      ✦ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-peacock py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
                <Plus className="h-3 w-3" /> Añadir a pipeline
              </button>
              <button className="rounded-lg border border-border px-2 text-muted-foreground"><Phone className="h-3 w-3" /></button>
              <button className="rounded-lg border border-border px-2 text-muted-foreground"><Mail className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metrics() {
  const line = [30, 42, 38, 55, 60, 72, 68, 85, 92, 88, 110, 130, 122, 145];
  const max = Math.max(...line);
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Network metrics</h1>
        <p className="text-sm text-muted-foreground">Pulso en tiempo real de toda la red Mesita.</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Stat label="GMV influido" value="$2.74M" delta="+19% MoM" Icon={Wallet} />
        <Stat label="Comisión 10%" value="$274k" delta="+19%" Icon={TrendingUp} />
        <Stat label="Venues activos" value="312" delta="+12 este mes" Icon={Building2} />
        <Stat label="MAU" value="18.4k" delta="+24%" Icon={Users} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">GMV influido · 14 semanas</p>
          <svg viewBox="0 0 280 100" className="h-40 w-full">
            <defs>
              <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.15 195)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.72 0.15 195)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline fill="url(#g2)" points={`0,100 ${line.map((v, i) => `${(i / (line.length - 1)) * 280},${100 - (v / max) * 90}`).join(" ")} 280,100`} />
            <polyline fill="none" stroke="oklch(0.82 0.13 85)" strokeWidth="1.5"
              points={line.map((v, i) => `${(i / (line.length - 1)) * 280},${100 - (v / max) * 90}`).join(" ")} />
          </svg>
        </div>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">Top ciudades</p>
          <div className="space-y-3">
            {[
              { c: "CDMX", v: 142, p: 100 },
              { c: "Monterrey", v: 68, p: 48 },
              { c: "Guadalajara", v: 54, p: 38 },
              { c: "Tulum", v: 28, p: 20 },
              { c: "Mérida", v: 20, p: 14 },
            ].map((r) => (
              <div key={r.c}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{r.c}</span>
                  <span className="font-semibold">{r.v}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-peacock" style={{ width: `${r.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, delta, Icon }: any) {
  return (
    <div className="rounded-xl border border-border bg-card-soft p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
        <TrendingUp className="h-3 w-3" /> {delta}
      </p>
    </div>
  );
}

function TrustTier() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="font-display text-2xl font-semibold">Trust & tier curation</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="flex items-center gap-2 text-sm font-medium"><Crown className="h-4 w-4 text-secondary" /> Pending Gold approvals</p>
          <div className="mt-3 space-y-2 text-sm">
            {["Camila S. · @cami.sosa", "Diego F. · @diegof", "Renata O. · @renatao"].map((u) => (
              <div key={u} className="flex items-center justify-between rounded-lg bg-card p-2">
                <span>{u}</span>
                <button className="rounded-md bg-gradient-to-r from-secondary to-tier-gold px-2 py-1 text-[10px] font-bold text-black">
                  <CheckCircle2 className="mr-1 inline h-3 w-3" />Promover
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-4 w-4 text-destructive" /> Trust flags</p>
          <div className="mt-3 space-y-2 text-sm">
            {[
              { t: "Story duplicada · Neón Bar", sev: "high" },
              { t: "Múltiples cuentas mismo device", sev: "med" },
              { t: "Velocidad de canje anómala", sev: "low" },
            ].map((f) => (
              <div key={f.t} className="flex items-center justify-between rounded-lg bg-card p-2">
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${f.sev === "high" ? "bg-destructive" : f.sev === "med" ? "bg-secondary" : "bg-muted-foreground"}`} />
                  {f.t}
                </span>
                <button className="rounded-md border border-border px-2 py-1 text-[10px]">Revisar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}