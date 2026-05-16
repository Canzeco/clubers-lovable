import { useState, type ComponentType, type SVGProps } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  Map as MapIcon,
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
  Bot,
  KeyRound,
  Cpu,
  Workflow,
  Zap,
  Activity,
  Mic,
  Send,
  AlertTriangle,
  ExternalLink,
  PlayCircle,
  PauseCircle,
} from "lucide-react";

// Lucide / SVG icon component shape. Permissive on purpose so any icon
// (lucide, custom SVG wrapper, etc.) can be slotted in without ceremony.
export type IconType = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

type Tab =
  | "pipeline"
  | "stage-sourced"
  | "stage-enriching"
  | "stage-review"
  | "stage-sales"
  | "bots"
  | "stack"
  | "portfolio"
  | "editor"
  | "discover"
  | "promos"
  | "metrics"
  | "trust";

type Stage = {
  id: string;
  label: string;
  hint: string;
  color: string;
  count: number;
};

type Lead = {
  id: string;
  name: string;
  type: string;
  area: string;
  ig: string;
  rating: number;
  ticket: string;
  fit: "Hot" | "Warm" | "Cold";
  stage: string;
  owner: string;
  lastTouch: string;
};

function useStages() {
  return useQuery<Stage[]>({
    queryKey: ["pipeline_stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pipeline_stages")
        .select("stage_id, label, hint, color, count, position")
        .order("position", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((s) => ({
        id: s.stage_id,
        label: s.label,
        hint: s.hint ?? "",
        color: s.color ?? "bg-muted",
        count: s.count ?? 0,
      }));
    },
  });
}

function useLeads() {
  return useQuery<Lead[]>({
    queryKey: ["venues", "leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("venues")
        .select("id, name, type, area, instagram, rating, ticket, fit, stage, owner, last_touch, position")
        .eq("status", "lead")
        .order("position", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((v) => ({
        id: v.id,
        name: v.name,
        type: v.type ?? "",
        area: v.area ?? "",
        ig: v.instagram ?? "—",
        rating: Number(v.rating ?? 0),
        ticket: v.ticket ?? "",
        fit: (v.fit as Lead["fit"]) ?? "Warm",
        stage: v.stage ?? "sourced",
        owner: v.owner ?? "",
        lastTouch: v.last_touch ?? "",
      }));
    },
  });
}

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
  const [tab, setTab] = useState<Tab>("stage-sourced");

  const mainNav: { id: Tab; label: string; Icon: IconType; hint: string }[] = [
    { id: "stage-sourced", label: "Venues Sourcing", Icon: MapPin, hint: "Get the list of venues" },
    { id: "pipeline", label: "Venues Enriching", Icon: Sparkles, hint: "Build rich profiles" },
    { id: "editor", label: "Venues Manager", Icon: Building2, hint: "Boring manual edits" },
  ];

  return (
    <div className="flex h-full bg-background text-foreground">
      <aside className="flex w-64 flex-col border-r border-border bg-sidebar p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary text-lg">
            🦚
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none">Mesita HQ</p>
            <p className="eyebrow">Operations</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {mainNav.map((n) => {
            const active = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                }`}
              >
                <n.Icon className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="flex-1">
                  <span className="block text-[13px] font-medium">{n.label}</span>
                  <span className="block text-[10.5px] text-muted-foreground">{n.hint}</span>
                </span>
              </button>
            );
          })}
        </nav>
        <div className="rounded-xl border border-dashed border-border/60 bg-card/50 p-3">
          <p className="eyebrow">MVP build</p>
          <p className="mt-1 text-xs text-foreground/80">Provisional console — more tools land as we scale.</p>
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
        {tab === "stage-sourced" && <StageView stageId="sourced" />}
        {tab === "stage-enriching" && <StageView stageId="enriching" />}
        {tab === "stage-review" && <StageView stageId="review" />}
        {tab === "stage-sales" && <StageView stageId="sales" />}
        {tab === "bots" && <BotFleet />}
        {tab === "stack" && <SaasStack />}
        {tab === "portfolio" && <Portfolio />}
        {tab === "editor" && <Venues />}
        {tab === "discover" && <DiscoverVenues />}
        {tab === "promos" && <PromoRadar />}
        {tab === "metrics" && <Metrics />}
        {tab === "trust" && <TrustTier />}
      </main>
    </div>
  );
}

function Pipeline() {
  return <PipelineBoard />;
}

function StageView({ stageId }: { stageId: string }) {
  const { data: stages = [] } = useStages();
  const { data: leads = [] } = useLeads();
  const s = stages.find((x) => x.id === stageId);
  const items = leads.filter((l) => l.stage === stageId);
  if (!s) {
    return <div className="p-6 text-xs text-muted-foreground">Loading stage…</div>;
  }
  const descriptions: Record<string, string> = {
    sourced: "Lista manual desde Google Business Profile. Selecciona un venue y lanza Super-sourcing.",
    enriching: "Agente AI buscando IG, FB, web, reseñas y posts. Consulta la base para evitar duplicados.",
    review: "Revisión humana del perfil enriquecido. Edita y aprueba antes de pasar a ventas.",
    sales: "Contacto comercial · convertir en partner de Mesita.",
  };
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow text-[11px] font-semibold">Etapa {s.label}</p>
          <h1 className="font-display text-3xl font-semibold">{s.hint}</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{descriptions[stageId]}</p>
        </div>
        {stageId === "sourced" && (
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            <MapPin className="h-3.5 w-3.5" /> Importar de Google Business
          </button>
        )}
        {stageId === "enriching" && (
          <button className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Lanzar agente en lote
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((l) => (
          <LeadCard key={l.id} l={l} stage={stageId} />
        ))}
      </div>
    </div>
  );
}

function PipelineBoard() {
  const { data: stages = [], isLoading: stagesLoading } = useStages();
  const { data: leads = [] } = useLeads();
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Sourcing pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Source → Super-sourcing AI → Approve → Sales · 133 prospectos abiertos
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
          <MapPin className="h-3.5 w-3.5" /> Importar de Google Business
        </button>
      </div>

      {stagesLoading ? (
        <div className="text-xs text-muted-foreground">Loading pipeline…</div>
      ) : (
      <div className="grid grid-cols-4 gap-3">
        {stages.map((s) => {
          const items = leads.filter((l) => l.stage === s.id);
          return (
            <div key={s.id} className="rounded-xl border border-border bg-card/40 p-2">
              <div className="mb-2 px-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${s.color}`} />
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground">{s.label}</p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">{s.count}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{s.hint}</p>
              </div>
              <div className="space-y-2">
                {items.map((l) => (
                  <LeadCard key={l.id} l={l} stage={s.id} />
                ))}
                {s.id === "sourced" && (
                  <button className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:text-foreground">
                    <Plus className="h-3 w-3" /> Añadir manual
                  </button>
                )}
                {s.id === "enriching" && (
                  <button className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-accent/50 py-2 text-xs text-accent hover:bg-accent/5">
                    <Sparkles className="h-3 w-3" /> Lanzar agente
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}

function LeadCard({ l, stage }: { l: Lead; stage: string }) {
  if (stage === "enriching") {
    return (
      <div className="space-y-2 rounded-lg border border-accent/40 bg-accent/5 p-2.5 text-xs shadow-elev">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold leading-tight">{l.name}</p>
            <p className="caption">{l.type}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-semibold text-accent">
            <Sparkles className="h-2.5 w-2.5" /> AI
          </span>
        </div>
        <div>
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>Super-sourcing…</span>
            <span>{l.name === "Galápago" ? "82%" : "47%"}</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full animate-pulse bg-gradient-to-r from-accent to-primary" style={{ width: l.name === "Galápago" ? "82%" : "47%" }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 text-[9px] text-muted-foreground">
          <span className="rounded-full bg-card px-1.5 py-0.5">IG ✓</span>
          <span className="rounded-full bg-card px-1.5 py-0.5">FB ✓</span>
          <span className="rounded-full bg-card px-1.5 py-0.5">Web ✓</span>
          <span className="rounded-full bg-card px-1.5 py-0.5 opacity-50">Reseñas…</span>
        </div>
      </div>
    );
  }

  if (stage === "sourced") {
    return (
      <div className="cursor-grab space-y-1.5 rounded-lg border border-border bg-card p-2.5 text-xs shadow-elev transition hover:border-primary/50">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold leading-tight">{l.name}</p>
            <p className="caption">{l.type}</p>
          </div>
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">GBP</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{l.area}</span>
          <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-secondary text-secondary" />{l.rating}</span>
        </div>
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-accent/10 py-1 text-[10px] font-semibold text-accent hover:bg-accent/20">
          <Sparkles className="h-2.5 w-2.5" /> Super-source
        </button>
      </div>
    );
  }

  return (
    <div className="cursor-grab space-y-2 rounded-lg border border-border bg-card p-2.5 text-xs shadow-elev transition hover:border-primary/50">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold leading-tight">{l.name}</p>
          <p className="caption">{l.type}</p>
        </div>
        <FitChip fit={l.fit} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{l.area}</span>
        <span className="flex items-center gap-0.5"><Instagram className="h-2.5 w-2.5" />{l.ig}</span>
        <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-secondary text-secondary" />{l.rating}</span>
      </div>
      {stage === "review" && (
        <div className="flex gap-1">
          <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-emerald-500/10 py-1 text-[10px] font-semibold text-emerald-600 hover:bg-emerald-500/20">
            <Check className="h-2.5 w-2.5" /> Aprobar
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-card py-1 text-[10px] font-semibold text-muted-foreground hover:bg-muted">
            <PencilLine className="h-2.5 w-2.5" /> Editar
          </button>
        </div>
      )}
      {stage === "sales" && (
        <div className="flex gap-1">
          <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-primary/10 py-1 text-[10px] font-semibold text-primary hover:bg-primary/20">
            <Phone className="h-2.5 w-2.5" /> Contactar
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-secondary/10 py-1 text-[10px] font-semibold text-secondary hover:bg-secondary/20">
            <Crown className="h-2.5 w-2.5" /> Firmar
          </button>
        </div>
      )}
      <div className="flex items-center justify-between border-t border-border/50 pt-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-peacock text-[9px] font-bold text-primary-foreground">
          {l.owner}
        </div>
        <span className="caption">ticket {l.ticket}</span>
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
        <div className="grid grid-cols-12 border-b border-border bg-card px-4 py-2 eyebrow">
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
              <p className="eyebrow">Confianza</p>
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

function Stat({
  label,
  value,
  delta,
  Icon,
}: {
  label: string;
  value: React.ReactNode;
  delta: React.ReactNode;
  Icon: IconType;
}) {
  return (
    <div className="rounded-xl border border-border bg-card-soft p-4">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{label}</p>
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
  return null;
}

type VenueCard = {
  name: string;
  city: string;
  category: string;
  img: string;
  managed: "partner" | "admin";
  status: "live" | "draft" | "review";
  completeness: number;
  active: boolean;
};

const VENUE_CARDS: VenueCard[] = [
  { name: "La Cabaña de Pecos", city: "SLP · Lomas", category: "Steakhouse", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1414235077428-338989a2e8c0.jpg", managed: "admin", status: "draft", completeness: 72, active: true },
  { name: "Bocanada", city: "CDMX · Roma Nte.", category: "Rooftop · Mediterranean", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1517248135467-4c7edcad34c4.jpg", managed: "partner", status: "live", completeness: 100, active: true },
  { name: "Patio Verde", city: "CDMX · Condesa", category: "Brunch · Café", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1559339352-11d035aa65de.jpg", managed: "partner", status: "live", completeness: 96, active: true },
  { name: "Galápago", city: "CDMX · Juárez", category: "Wine bar · Tapas", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1592861956120-e524fc739696.jpg", managed: "admin", status: "review", completeness: 58, active: true },
  { name: "Casa Luminar", city: "CDMX · Polanco", category: "Cocktails · Late night", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1551024601-bec78aea704b.jpg", managed: "partner", status: "live", completeness: 100, active: true },
  { name: "Sal de Mar", city: "Cancún · Centro", category: "Seafood", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1559339352-11d035aa65de.jpg", managed: "admin", status: "draft", completeness: 41, active: false },
  { name: "Mar Verde", city: "Tulum", category: "Seafood · Beach", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1543007630-9710e4a00a20.jpg", managed: "partner", status: "live", completeness: 94, active: true },
  { name: "El Huerto", city: "GDL · Lafayette", category: "Plant-forward", img: "https://vawhthlklfegseboiwye.supabase.co/storage/v1/object/public/venue-images/unsplash/1551782450-a2132b4ba21d.jpg", managed: "admin", status: "review", completeness: 63, active: false },
];

function Venues() {
  const [selected, setSelected] = useState<string | null>(null);
  const [cards] = useState(VENUE_CARDS);

  if (selected) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span
            onClick={() => setSelected(null)}
            className="cursor-pointer text-xs text-muted-foreground hover:text-foreground"
          >
            ← Back
          </span>
          <p className="text-sm font-medium">{selected}</p>
        </div>
        <VenueEditorImpl />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Venue Catalog</h1>
        <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent to-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
          <Plus className="h-3.5 w-3.5" /> Create Venue
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {cards.map((v) => (
          <div
            key={v.name}
            onClick={() => setSelected(v.name)}
            className={`group relative flex aspect-[4/5] cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-elev ${
              v.active ? "border-border" : "border-destructive/30 opacity-70"
            }`}
          >
            <div className="relative h-3/5 overflow-hidden">
              <img
                src={v.img}
                alt={v.name}
                className={`h-full w-full object-cover transition group-hover:scale-105 ${
                  v.active ? "" : "grayscale"
                }`}
              />
              <span
                className={`absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur ${
                  v.managed === "partner"
                    ? "bg-secondary/90 text-secondary-foreground"
                    : "bg-accent/90 text-accent-foreground"
                }`}
              >
                {v.managed === "partner" ? "Partner" : "Admin"}
              </span>
              {!v.active && (
                <span className="absolute right-2 top-2 rounded-full bg-destructive/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  Inactive
                </span>
              )}
              {v.active && (
                <span
                  className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur ${
                    v.status === "live"
                      ? "bg-emerald-500/90 text-white"
                      : v.status === "review"
                      ? "bg-amber-500/90 text-white"
                      : "bg-muted/90 text-foreground/70"
                  }`}
                >
                  {v.status}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-3">
              <div>
                <p className="line-clamp-1 font-display text-base font-semibold leading-tight">{v.name}</p>
                <p className="line-clamp-1 text-[11px] text-muted-foreground">{v.category}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{v.city}</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Profile</span>
                  <span className="font-semibold text-foreground">{v.completeness}%</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full ${v.completeness >= 90 ? "bg-emerald-500" : v.completeness >= 60 ? "bg-secondary" : "bg-amber-500"}`}
                    style={{ width: `${v.completeness}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VenueEditorImpl() {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card-soft p-6">
      <p className="text-sm text-muted-foreground">Venue detail view coming soon.</p>
    </div>
  );
}

function Field({ label, value, textarea, Icon }: { label: string; value: string; textarea?: boolean; Icon?: IconType }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1 eyebrow">
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

function ScoreRow({ Icon, label, hint, value, locked }: { Icon: IconType; label: string; hint: string; value: string; locked?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card-soft p-3">
      <Icon className="h-4 w-4 text-secondary" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{label}</p>
          {locked && <span className="rounded bg-secondary/20 px-1.5 py-0.5 text-[9px] font-bold text-secondary">AUTO</span>}
        </div>
        <p className="caption">{hint}</p>
      </div>
      <input defaultValue={value} disabled={locked} className="w-56 rounded-md border border-border bg-card px-2 py-1 text-xs outline-none disabled:opacity-60" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// BOT FLEET — agentic workers sourcing & enriching venues
// ─────────────────────────────────────────────────────────
type BotStatus = "running" | "idle" | "error";
type BotDef = {
  name: string;
  role: string;
  Icon: IconType;
  status: BotStatus;
  region: string;
  found: number;
  goal: number;
  uses: string[];
  lastEvent: string;
};

const BOT_ICONS: Record<string, IconType> = {
  MapIcon, Sparkles, ShieldCheck, Send, Mic, Activity,
};

function useBots(): BotDef[] {
  const { data } = useQuery({
    queryKey: ["bots"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bots").select("*").order("position");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });
  return (data ?? []).map((r: any) => ({
    name: r.name, role: r.role, Icon: BOT_ICONS[r.icon] ?? Activity,
    status: r.status as BotStatus, region: r.region, found: r.found, goal: r.goal,
    uses: r.uses ?? [], lastEvent: r.last_event ?? "",
  }));
}

function useFeed() {
  const { data } = useQuery({
    queryKey: ["sourcing_feed"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sourcing_feed").select("*").order("position");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });
  return (data ?? []).map((r: any) => ({ t: r.t, b: r.bot, msg: r.msg, kind: r.kind }));
}

function BotFleet() {
  const BOTS = useBots();
  const FEED = useFeed();
  return (
    <div className="space-y-6 p-6">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Bot fleet</h1>
          <p className="text-xs text-muted-foreground">
            Agentic workers sourcing, enriching and qualifying venues across the network.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-medium">5 running</span>
            <span className="text-muted-foreground">· 1 idle · 1 error</span>
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-3.5 w-3.5" /> Deploy bot
          </button>
        </div>
      </div>

      {/* fleet stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Venues sourced (7d)", value: "1,284", delta: "+18%", Icon: MapIcon },
          { label: "Enriched profiles", value: "642", delta: "+22%", Icon: Sparkles },
          { label: "Outreach sent", value: "317", delta: "+12%", Icon: Send },
          { label: "Cost · last 24h", value: "$ 184", delta: "−6%", Icon: Wallet },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <s.Icon className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-widest">{s.delta}</span>
            </div>
            <p className="mt-1 font-display text-xl">{s.value}</p>
            <p className="eyebrow">{s.label}</p>
          </div>
        ))}
      </div>

      {/* bot grid + live feed */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        <div className="grid grid-cols-2 gap-3">
          {BOTS.map((b) => (
            <div key={b.name} className="relative overflow-hidden rounded-xl border border-border bg-card p-4">
              {/* pulse for running */}
              {b.status === "running" && (
                <span className="absolute right-3 top-3 inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              )}
              {b.status === "idle" && (
                <span className="absolute right-3 top-3 inline-flex h-2 w-2 rounded-full bg-muted-foreground/50" />
              )}
              {b.status === "error" && (
                <span className="absolute right-3 top-3 inline-flex h-2 w-2 animate-pulse rounded-full bg-destructive" />
              )}

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                  <b.Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-semibold leading-none">{b.name}</p>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {b.role}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{b.region}</p>
                </div>
              </div>

              {/* progress */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>
                    <span className="font-semibold text-foreground">{b.found.toLocaleString()}</span> / {b.goal.toLocaleString()}
                  </span>
                  <span>{Math.round((b.found / b.goal) * 100)}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full ${b.status === "error" ? "bg-destructive" : "bg-secondary"}`}
                    style={{ width: `${Math.min(100, (b.found / b.goal) * 100)}%` }}
                  />
                </div>
              </div>

              {/* tools */}
              <div className="mt-3 flex flex-wrap gap-1">
                {b.uses.map((u) => (
                  <span key={u} className="rounded-full border border-border bg-card-soft px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                    {u}
                  </span>
                ))}
              </div>

              {/* last event */}
              <p className="mt-3 line-clamp-1 text-[11px] italic text-foreground/80">
                <Zap className="mr-1 inline h-3 w-3 text-secondary" />
                {b.lastEvent}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-muted-foreground">
                  {b.status === "running" ? <PauseCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                  {b.status === "running" ? "Pause" : "Run"}
                </button>
                <button className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-muted-foreground">
                  <Workflow className="h-3 w-3" /> Workflow
                </button>
                <button className="ml-auto text-[10px] text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* live feed */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-semibold">Live feed</p>
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-600">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              streaming
            </span>
          </div>
          <div className="space-y-2">
            {FEED.map((f, i) => (
              <div key={i} className="flex gap-2 border-b border-border/60 pb-2 last:border-0">
                <span className="w-7 flex-shrink-0 font-mono text-[9px] text-muted-foreground">{f.t}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-snug">
                    <span
                      className={`mr-1 font-semibold ${
                        f.kind === "hot"
                          ? "text-secondary"
                          : f.kind === "error"
                          ? "text-destructive"
                          : f.kind === "found"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {f.b}
                    </span>
                    {f.msg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SAAS STACK — API keys & integrations powering the platform
// ─────────────────────────────────────────────────────────
type StackStatus = "connected" | "missing" | "expired" | "low_credits";
type Integration = {
  name: string;
  category: string;
  purpose: string;
  status: StackStatus;
  monthly: string;
  usage: string;
  link?: string;
};

function useStack(): { group: string; items: Integration[] }[] {
  const { data } = useQuery({
    queryKey: ["integrations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("integrations").select("*").order("position");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });
  const rows = data ?? [];
  const groups = new Map<string, Integration[]>();
  for (const r of rows as any[]) {
    const item: Integration = {
      name: r.name, category: r.category, purpose: r.purpose,
      status: r.status as StackStatus, monthly: r.monthly ?? "—",
      usage: r.usage ?? "—", link: r.link ?? undefined,
    };
    if (!groups.has(r.group_name)) groups.set(r.group_name, []);
    groups.get(r.group_name)!.push(item);
  }
  return Array.from(groups, ([group, items]) => ({ group, items }));
}

function statusMeta(s: StackStatus) {
  switch (s) {
    case "connected":
      return { label: "Connected", cls: "bg-emerald-500/15 text-emerald-600", Icon: Check };
    case "missing":
      return { label: "Needs key", cls: "bg-muted text-muted-foreground", Icon: KeyRound };
    case "expired":
      return { label: "Expired", cls: "bg-destructive/15 text-destructive", Icon: XIcon };
    case "low_credits":
      return { label: "Low credits", cls: "bg-amber-500/15 text-amber-600", Icon: AlertTriangle };
  }
}

function SaasStack() {
  const STACK = useStack();
  const all = STACK.flatMap((g) => g.items);
  const counts = {
    total: all.length,
    connected: all.filter((i) => i.status === "connected").length,
    issues: all.filter((i) => i.status !== "connected").length,
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">SaaS stack</h1>
          <p className="text-xs text-muted-foreground">
            API keys and integrations powering the agentic platform. Top up, rotate or add new tools.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
            <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> {counts.connected} live</span>
            <span className="flex items-center gap-1 text-amber-600"><AlertTriangle className="h-3 w-3" /> {counts.issues} need attention</span>
            <span className="text-muted-foreground">· {counts.total} tools</span>
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-3.5 w-3.5" /> Add integration
          </button>
        </div>
      </div>

      {/* monthly burn summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Monthly spend", value: "$ 1,761", delta: "+9%", Icon: Wallet },
          { label: "Cost / sourced venue", value: "$ 1.37", delta: "−14%", Icon: TrendingUp },
          { label: "Active credentials", value: `${counts.connected}`, delta: "stable", Icon: KeyRound },
          { label: "Quotas > 80%", value: "3", delta: "watchlist", Icon: AlertTriangle },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <s.Icon className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-widest">{s.delta}</span>
            </div>
            <p className="mt-1 font-display text-xl">{s.value}</p>
            <p className="eyebrow">{s.label}</p>
          </div>
        ))}
      </div>

      {/* groups */}
      {STACK.map((group) => (
        <div key={group.group} className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{group.group}</p>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-card-soft eyebrow">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Tool</th>
                  <th className="px-3 py-2 text-left font-semibold">Purpose</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                  <th className="px-3 py-2 text-left font-semibold">Usage</th>
                  <th className="px-3 py-2 text-right font-semibold">Monthly</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((i) => {
                  const m = statusMeta(i.status);
                  return (
                    <tr key={i.name} className="border-t border-border/60">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Cpu className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold leading-none">{i.name}</p>
                            <p className="mt-0.5 eyebrow">{i.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{i.purpose}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.cls}`}>
                          <m.Icon className="h-2.5 w-2.5" /> {m.label}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{i.usage}</td>
                      <td className="px-3 py-2 text-right font-mono text-xs">{i.monthly}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-end gap-1">
                          {i.status === "connected" ? (
                            <button className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-muted-foreground">
                              <RefreshCw className="mr-1 inline h-3 w-3" /> Rotate
                            </button>
                          ) : (
                            <button className="rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background">
                              <KeyRound className="mr-1 inline h-3 w-3" /> Add key
                            </button>
                          )}
                          <button className="rounded-md border border-border bg-card px-1.5 py-1 text-[10px] text-muted-foreground">
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
