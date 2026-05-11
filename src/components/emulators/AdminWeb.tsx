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
  Radar,
  Facebook,
  Calendar,
  Check,
  X as XIcon,
  RefreshCw,
} from "lucide-react";

type Tab = "pipeline" | "portfolio" | "editor" | "discover" | "promos" | "metrics" | "trust";

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
    { id: "promos", label: "Promo radar", Icon: Radar },
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
        {tab === "promos" && <PromoRadar />}
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
  return MetricsImpl();
}

type PromoFind = {
  id: string;
  venue: string;
  area: string;
  source: "instagram" | "facebook";
  handle: string;
  detected: string;
  title: string;
  excerpt: string;
  when: string;
  type: "Promo" | "Evento" | "Happy hour" | "DJ set";
  confidence: number;
  status: "new" | "approved" | "rejected";
};

const findsSeed: PromoFind[] = [
  {
    id: "p1",
    venue: "Casa Luminar",
    area: "Roma Nte.",
    source: "instagram",
    handle: "@casaluminar",
    detected: "hace 4 min",
    title: "2x1 en mezcalitas · jueves",
    excerpt: "Esta semana arrancamos jueves con 2x1 en toda la carta de mezcal de 7 a 10 pm 🌵",
    when: "Jue 14 · 19:00 – 22:00",
    type: "Happy hour",
    confidence: 96,
    status: "new",
  },
  {
    id: "p2",
    venue: "Neón Bar",
    area: "Condesa",
    source: "instagram",
    handle: "@neon.bar",
    detected: "hace 22 min",
    title: "DJ Set · Lola Vegga",
    excerpt: "Sábado en la cabina: Lola Vegga b2b residentes. Cover gratis antes de las 11.",
    when: "Sáb 16 · 22:30",
    type: "DJ set",
    confidence: 92,
    status: "new",
  },
  {
    id: "p3",
    venue: "Patio Verde",
    area: "Condesa",
    source: "facebook",
    handle: "Patio Verde Café",
    detected: "hace 1 h",
    title: "Brunch de mamás · 15% off",
    excerpt: "Domingo celebramos a las mamás con 15% en todo el brunch y mimosa de cortesía.",
    when: "Dom 17 · 10:00 – 14:00",
    type: "Promo",
    confidence: 88,
    status: "new",
  },
  {
    id: "p4",
    venue: "Tropikalia",
    area: "Cuauhtémoc",
    source: "instagram",
    handle: "@tropikalia.mx",
    detected: "hace 2 h",
    title: "Tropikalia x Boiler Room",
    excerpt: "Anuncio oficial: Boiler Room CDMX se monta en Tropikalia el 28. Lineup pronto.",
    when: "Vie 28 · 23:00",
    type: "Evento",
    confidence: 81,
    status: "new",
  },
  {
    id: "p5",
    venue: "Galápago",
    area: "Roma Sur",
    source: "instagram",
    handle: "@galapago.wine",
    detected: "hace 5 h",
    title: "Cata vinos naturales",
    excerpt: "Cupos limitados · 6 vinos de productores mexicanos + tabla. $480 por persona.",
    when: "Mié 13 · 20:00",
    type: "Evento",
    confidence: 74,
    status: "new",
  },
  {
    id: "p6",
    venue: "El Hueco",
    area: "Juárez",
    source: "facebook",
    handle: "El Hueco Mezcalería",
    detected: "ayer",
    title: "Martes de mezcal · flight $180",
    excerpt: "Cada martes: flight de 3 mezcales artesanales por $180. Hasta agotar.",
    when: "Martes",
    type: "Happy hour",
    confidence: 69,
    status: "approved",
  },
];

function PromoRadar() {
  const [finds, setFinds] = useState<PromoFind[]>(findsSeed);
  const [filter, setFilter] = useState<"all" | "new" | "approved" | "rejected">("new");

  const visible = finds.filter((f) => (filter === "all" ? true : f.status === filter));
  const counts = {
    new: finds.filter((f) => f.status === "new").length,
    approved: finds.filter((f) => f.status === "approved").length,
    rejected: finds.filter((f) => f.status === "rejected").length,
  };

  const setStatus = (id: string, status: PromoFind["status"]) =>
    setFinds((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Promo radar</h1>
          <p className="text-sm text-muted-foreground">
            Bot escanea Instagram y Facebook de venues 24/7 · {counts.new} promos nuevas por revisar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" />
            Bot online · 312 cuentas observadas
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
            <RefreshCw className="h-3.5 w-3.5" /> Re-escanear ahora
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Stat label="Cuentas observadas" value="312" delta="IG · FB" Icon={Radar} />
        <Stat label="Promos detectadas (7d)" value="184" delta="+22% vs sem ant." Icon={Sparkles} />
        <Stat label="Auto-publicadas" value="76%" delta="conf ≥ 85" Icon={CheckCircle2} />
        <Stat label="Tiempo medio detección" value="6 min" delta="desde el post" Icon={Clock} />
      </div>

      <div className="flex gap-2 text-xs">
        {([
          ["new", `Nuevas · ${counts.new}`],
          ["approved", `Aprobadas · ${counts.approved}`],
          ["rejected", `Rechazadas · ${counts.rejected}`],
          ["all", "Todas"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`rounded-full px-3 py-1 ${
              filter === id ? "bg-foreground text-background" : "border border-border text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {visible.map((f) => (
          <PromoCard key={f.id} f={f} setStatus={setStatus} />
        ))}
        {visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Sin promos en esta vista.
          </div>
        )}
      </div>
    </div>
  );
}

function PromoCard({
  f,
  setStatus,
}: {
  f: PromoFind;
  setStatus: (id: string, status: PromoFind["status"]) => void;
}) {
  const SourceIcon = f.source === "instagram" ? Instagram : Facebook;
  const typeColor =
    f.type === "Evento"
      ? "bg-secondary/20 text-secondary"
      : f.type === "DJ set"
      ? "bg-accent/20 text-accent"
      : f.type === "Happy hour"
      ? "bg-tier-gold/20 text-tier-gold"
      : "bg-emerald-500/20 text-emerald-300";

  return (
    <div className="rounded-xl border border-border bg-card-soft p-4">
      <div className="flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-peacock">
          <SourceIcon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-base font-semibold leading-none">{f.venue}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColor}`}>
                  {f.type}
                </span>
                {f.status === "approved" && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Publicado
                  </span>
                )}
                {f.status === "rejected" && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    Descartado
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {f.area}
                <span>·</span>
                <SourceIcon className="h-3 w-3" />
                {f.handle}
                <span>·</span>
                <Clock className="h-3 w-3" />
                {f.detected}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Confianza</p>
              <p
                className={`font-display text-lg font-semibold ${
                  f.confidence >= 85
                    ? "text-emerald-400"
                    : f.confidence >= 70
                    ? "text-secondary"
                    : "text-muted-foreground"
                }`}
              >
                {f.confidence}%
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-card p-3">
            <p className="text-sm font-semibold">{f.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">“{f.excerpt}”</p>
            <p className="mt-2 flex items-center gap-1 text-[11px] text-secondary">
              <Calendar className="h-3 w-3" /> {f.when}
            </p>
          </div>

          {f.status === "new" && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setStatus(f.id, "approved")}
                className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black"
              >
                <Check className="h-3 w-3" /> Publicar en catálogo
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                <PencilLine className="h-3 w-3" /> Editar antes
              </button>
              <button
                onClick={() => setStatus(f.id, "rejected")}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive"
              >
                <XIcon className="h-3 w-3" /> Descartar
              </button>
              <button className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
                <Link2 className="h-3 w-3" /> Ver post original
              </button>
            </div>
          )}

          {f.status !== "new" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatus(f.id, "new")}
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                ↺ Volver a revisar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricsImpl() {
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
function VenueEditor() {
  const [igUrl, setIgUrl] = useState("https://instagram.com/lacabanadepecos");
  const [tab, setTab] = useState<"profile" | "media" | "social" | "ai">("profile");

  const sourcedPosts = [
    { id: 1, img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", likes: "2.4k", caption: "Cortes premium, brasa de mezquite 🔥", picked: true },
    { id: 2, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400", likes: "1.8k", caption: "Mixología de autor", picked: true },
    { id: 3, img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400", likes: "3.1k", caption: "Domingos familiares", picked: true },
    { id: 4, img: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400", likes: "920", caption: "Carta de vinos", picked: false },
    { id: 5, img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400", likes: "1.2k", caption: "Postres de la casa", picked: false },
    { id: 6, img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400", likes: "780", caption: "Eventos privados", picked: false },
    { id: 7, img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", likes: "640", caption: "Brunch dominical", picked: false },
    { id: 8, img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400", likes: "1.1k", caption: "Música en vivo", picked: false },
  ];

  return (
    <div className="grid grid-cols-[320px_1fr_360px] gap-4 p-6">
      {/* Left: venue list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Editando</p>
          <button className="text-[10px] text-secondary">+ Nuevo perfil</button>
        </div>
        <div className="rounded-xl border border-secondary/40 bg-secondary/5 p-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-tier-gold to-secondary" />
            <div>
              <p className="text-sm font-semibold">La Cabaña de Pecos</p>
              <p className="text-[10px] text-muted-foreground">SLP · Steakhouse · desde 1982</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="rounded-full bg-card px-1.5 py-0.5">Draft</span>
            <span>completitud 72%</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[72%] bg-secondary" />
          </div>
        </div>
        {["Bocanada (Roma)", "Patio Verde", "Galápago", "Casa Luminar"].map((n) => (
          <div key={n} className="flex items-center gap-2 rounded-lg border border-border bg-card p-2 text-xs hover:border-primary/40">
            <div className="h-8 w-8 rounded bg-peacock" />
            <div className="flex-1">
              <p className="font-medium">{n}</p>
              <p className="text-[10px] text-muted-foreground">draft · 34%</p>
            </div>
            <PencilLine className="h-3 w-3 text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* Center: editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold">Perfil de venue</h1>
            <p className="text-xs text-muted-foreground">Construye el perfil que verán los guests · cambios en vivo a la derecha</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs"><Eye className="h-3 w-3" /> Preview</button>
            <button className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground"><Save className="h-3 w-3" /> Publicar</button>
          </div>
        </div>

        <div className="flex gap-1 border-b border-border text-xs">
          {[
            { id: "profile", l: "Info" },
            { id: "media", l: "Fotos (IG)" },
            { id: "social", l: "Social proof" },
            { id: "ai", l: "AI assist" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`-mb-px border-b-2 px-3 py-2 ${tab === t.id ? "border-secondary text-foreground" : "border-transparent text-muted-foreground"}`}
            >
              {t.l}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <div className="space-y-3">
            <Field label="Nombre" value="La Cabaña de Pecos" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Categoría" value="Steakhouse · Premium" />
              <Field label="Ticket promedio" value="$780 MXN" />
              <Field label="Ciudad" value="San Luis Potosí" />
              <Field label="Zona" value="Lomas 4ta sección" />
            </div>
            <Field label="Bio (un párrafo)" textarea value="Desde 1982 servimos cortes a la brasa de mezquite. Cocina familiar potosina con alma de cantina. Reservas vía WhatsApp." />
            <div className="grid grid-cols-3 gap-3">
              <Field label="Teléfono" value="444 813 9252" Icon={Phone} />
              <Field label="WhatsApp" value="444 189 4681" Icon={Phone} />
              <Field label="Web" value="bit.ly/3CmHYRh" Icon={Globe} />
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {["familiar", "carnes", "kids friendly", "música en vivo", "estacionamiento", "eventos privados"].map((t) => (
                  <span key={t} className="flex items-center gap-1 rounded-full bg-card-soft px-2 py-1 text-[11px]">
                    <Tag className="h-2.5 w-2.5 text-secondary" /> {t}
                    <button className="text-muted-foreground hover:text-destructive">×</button>
                  </span>
                ))}
                <button className="rounded-full border border-dashed border-border px-2 py-1 text-[11px] text-muted-foreground">+ tag</button>
              </div>
            </div>
          </div>
        )}

        {tab === "media" && (
          <div className="space-y-3">
            <div className="rounded-xl border border-border bg-card-soft p-3">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Fuente Instagram</p>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5">
                  <Instagram className="h-3.5 w-3.5 text-pink-400" />
                  <input
                    value={igUrl}
                    onChange={(e) => setIgUrl(e.target.value)}
                    className="flex-1 bg-transparent text-xs outline-none"
                  />
                </div>
                <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  <Download className="h-3 w-3" /> Importar feed
                </button>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">Último scrape: hace 2 h · 1,016 posts · 9,866 followers</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Selecciona hasta 10 fotos · arrastra para ordenar</p>
              <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-secondary">3 / 10 seleccionadas</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {sourcedPosts.map((p, i) => (
                <div key={p.id} className={`group relative overflow-hidden rounded-lg border-2 ${p.picked ? "border-secondary" : "border-border"}`}>
                  <img src={p.img} alt="" className="aspect-square w-full object-cover" />
                  {p.picked && (
                    <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                      {i + 1}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                    <p className="line-clamp-1 text-[9px] text-white">{p.caption}</p>
                    <p className="text-[9px] text-white/70">♥ {p.likes}</p>
                  </div>
                  <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <button className="rounded bg-black/60 p-1 text-white"><GripVertical className="h-2.5 w-2.5" /></button>
                    <button className="rounded bg-black/60 p-1 text-white"><Trash2 className="h-2.5 w-2.5" /></button>
                  </div>
                </div>
              ))}
              <button className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:text-foreground">
                <ImagePlus className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {tab === "social" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Conecta cuentas y rellena scores manualmente si el scrape no está disponible.</p>
            <ScoreRow Icon={Sparkles} label="Mesita score" hint="auto · de canjeos verificados" value="4.9 · 312 reviews" locked />
            <ScoreRow Icon={Star} label="Google" hint="Google Place ID" value="4.7 · 2,418 reviews" />
            <ScoreRow Icon={Instagram} label="Instagram" hint="@lacabanadepecos" value="9,866 followers · 1,016 posts" />
            <ScoreRow Icon={Globe} label="Facebook" hint="facebook.com/lacabanadepecos" value="12,340 followers · 4.6 ★" />
            <div className="rounded-xl border border-border bg-card-soft p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Mesita visitors (auto)</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-tier-gold/10 p-2"><p className="font-display text-lg text-tier-gold">142</p><p className="text-[10px] text-muted-foreground">Gold · 90d</p></div>
                <div className="rounded-lg bg-tier-silver/10 p-2"><p className="font-display text-lg text-tier-silver">318</p><p className="text-[10px] text-muted-foreground">Silver</p></div>
                <div className="rounded-lg bg-tier-bronze/10 p-2"><p className="font-display text-lg text-tier-bronze">604</p><p className="text-[10px] text-muted-foreground">Bronze</p></div>
              </div>
            </div>
          </div>
        )}

        {tab === "ai" && (
          <div className="space-y-3">
            <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/10 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold"><Wand2 className="h-4 w-4 text-accent" /> AI assist</p>
              <p className="mt-1 text-xs text-muted-foreground">Mesita AI lee Instagram, Google y reviews para autocompletar el perfil. Revisa siempre antes de publicar.</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {[
                  "Generar bio desde IG",
                  "Detectar categoría y tags",
                  "Sugerir 10 mejores fotos",
                  "Resumir reviews de Google",
                ].map((a) => (
                  <button key={a} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left hover:border-accent/50">
                    <Sparkles className="h-3 w-3 text-secondary" /> {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card-soft p-3 text-xs">
              <p className="mb-2 font-semibold">Sugerencias pendientes (3)</p>
              {[
                "Tag faltante: ‘familiar’ — detectado en 14 reviews",
                "Foto #4 baja resolución — reemplazar por IG post del 8/may",
                "Ticket promedio podría ser $820 según Google",
              ].map((s) => (
                <div key={s} className="flex items-center justify-between gap-2 border-t border-border/50 py-1.5 first:border-0">
                  <span className="text-muted-foreground">{s}</span>
                  <div className="flex gap-1">
                    <button className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">Aplicar</button>
                    <button className="rounded border border-border px-2 py-0.5 text-[10px]">Ignorar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: live preview */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preview guest</p>
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-elev">
          <div className="relative h-32 bg-gradient-to-br from-tier-gold via-secondary to-accent">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" className="h-full w-full object-cover opacity-70" alt="" />
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-tier-gold">★ TOP 1% · SLP</span>
          </div>
          <div className="space-y-2 p-3">
            <div>
              <p className="font-display text-lg font-semibold">La Cabaña de Pecos</p>
              <p className="text-[10px] text-muted-foreground">Steakhouse · SLP · desde 1982</p>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
              <div className="rounded bg-secondary/10 p-1"><p className="font-bold text-secondary">4.9</p><p className="text-muted-foreground">Mesita</p></div>
              <div className="rounded bg-card-soft p-1"><p className="font-bold">4.7</p><p className="text-muted-foreground">Google</p></div>
              <div className="rounded bg-card-soft p-1"><p className="font-bold">4.6</p><p className="text-muted-foreground">FB</p></div>
              <div className="rounded bg-card-soft p-1"><p className="font-bold">9.8k</p><p className="text-muted-foreground">IG</p></div>
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {sourcedPosts.filter((p) => p.picked).map((p) => (
                <img key={p.id} src={p.img} className="h-14 w-12 flex-shrink-0 rounded object-cover" alt="" />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">Desde 1982 servimos cortes a la brasa de mezquite…</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card-soft p-2 text-[10px] text-muted-foreground">
          <p className="flex items-center gap-1"><Link2 className="h-3 w-3" /> URL pública</p>
          <p className="mt-0.5 truncate font-mono text-foreground">mesita.app/v/la-cabana-de-pecos</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, textarea, Icon }: { label: string; value: string; textarea?: boolean; Icon?: any }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon className="h-2.5 w-2.5" />} {label}
      </span>
      {textarea ? (
        <textarea defaultValue={value} rows={3} className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-secondary" />
      ) : (
        <input defaultValue={value} className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-secondary" />
      )}
    </label>
  );
}

function ScoreRow({ Icon, label, hint, value, locked }: { Icon: any; label: string; hint: string; value: string; locked?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card-soft p-3">
      <Icon className="h-4 w-4 text-secondary" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{label}</p>
          {locked && <span className="rounded bg-secondary/20 px-1.5 py-0.5 text-[9px] font-bold text-secondary">AUTO</span>}
        </div>
        <p className="text-[10px] text-muted-foreground">{hint}</p>
      </div>
      <input defaultValue={value} disabled={locked} className="w-56 rounded-md border border-border bg-card px-2 py-1 text-xs outline-none disabled:opacity-60" />
    </div>
  );
}
