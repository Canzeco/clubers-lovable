import { useState } from "react";
import {
  Building2,
  Crown,
  Gem,
  LayoutDashboard,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Flag,
  CheckCircle2,
} from "lucide-react";

export function AdminWeb() {
  const [tab, setTab] = useState("overview");
  const nav = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "venues", label: "Venues", Icon: Building2 },
    { id: "tiers", label: "Tier Curation", Icon: Crown },
    { id: "users", label: "Users", Icon: Users },
    { id: "revenue", label: "Revenue", Icon: Wallet },
    { id: "trust", label: "Trust & Safety", Icon: Shield },
  ];

  return (
    <div className="flex h-full bg-background text-foreground">
      <aside className="flex w-60 flex-col border-r border-border bg-sidebar p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary text-lg">
            🦚
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none">
              Mesita HQ
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Super Admin
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                tab === n.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <n.Icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-3">
          <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-secondary">
            <Sparkles className="h-3 w-3" /> Network health
          </p>
          <p className="mt-1 font-display text-lg">98.2%</p>
          <p className="text-[10px] text-muted-foreground">
            312 venues · 18.4k users
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Search venues, users, transactions…
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
              ● Live
            </span>
            <button className="rounded-lg bg-gradient-to-r from-accent to-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
              Curate Gold list
            </button>
          </div>
        </div>

        {tab === "overview" && <Overview />}
        {tab === "venues" && <Venues />}
        {tab === "tiers" && <TierCuration />}
        {tab === "users" && <Overview />}
        {tab === "revenue" && <Revenue />}
        {tab === "trust" && <Trust />}
      </main>
    </div>
  );
}

function Stat({ label, value, delta, icon: Icon }: any) {
  return (
    <div className="rounded-xl border border-border bg-card-soft p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
        <TrendingUp className="h-3 w-3" /> {delta}
      </p>
    </div>
  );
}

function Overview() {
  const line = [30, 42, 38, 55, 60, 72, 68, 85, 92, 88, 110, 130, 122, 145];
  const max = Math.max(...line);
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Network overview</h1>
        <p className="text-sm text-muted-foreground">
          Real-time pulse across the Mesita network · MXN currency.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Stat label="GMV influido" value="$2.74M" delta="+19% MoM" icon={Wallet} />
        <Stat label="Comisión 10%" value="$274k" delta="+19%" icon={TrendingUp} />
        <Stat label="Venues activos" value="312" delta="+12 este mes" icon={Building2} />
        <Stat label="MAU" value="18.4k" delta="+24%" icon={Users} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">GMV influido · últimas 14 semanas</p>
          <svg viewBox="0 0 280 100" className="h-40 w-full">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.15 195)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.72 0.15 195)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="url(#g1)"
              stroke="none"
              points={`0,100 ${line.map((v, i) => `${(i / (line.length - 1)) * 280},${100 - (v / max) * 90}`).join(" ")} 280,100`}
            />
            <polyline
              fill="none"
              stroke="oklch(0.82 0.13 85)"
              strokeWidth="1.5"
              points={line.map((v, i) => `${(i / (line.length - 1)) * 280},${100 - (v / max) * 90}`).join(" ")}
            />
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
      <div className="rounded-xl border border-border bg-card-soft p-4">
        <p className="mb-3 text-sm font-medium">Actividad reciente</p>
        <div className="space-y-2 text-sm">
          {[
            { i: "🟢", t: "Casa Luminar publicó promo 22% (Jueves Gold)", time: "hace 2 min" },
            { i: "🥇", t: "Valentina R. promovida a Gold tier (manual)", time: "hace 14 min" },
            { i: "🏷️", t: "Neón Bar canjeó 12 cupones en última hora", time: "hace 32 min" },
            { i: "⚠️", t: "Flag de fraude · Mar Verde (revisar story)", time: "hace 1 h" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border/40 py-1.5 last:border-0">
              <span>
                <span className="mr-2">{a.i}</span>
                {a.t}
              </span>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Venues() {
  const venues = [
    { n: "Casa Luminar", c: "CDMX · Roma", gmv: "$84.2k", tier: "Premium", st: "Activo" },
    { n: "Neón Bar", c: "CDMX · Condesa", gmv: "$62.1k", tier: "Premium", st: "Activo" },
    { n: "Loto Café", c: "GDL · Chapalita", gmv: "$22.4k", tier: "Standard", st: "Activo" },
    { n: "Mar Verde", c: "Tulum", gmv: "$0", tier: "Discovery", st: "No afiliado" },
    { n: "Costa Azul", c: "MTY · San Pedro", gmv: "$41.7k", tier: "Standard", st: "Pendiente" },
  ];
  return (
    <div className="space-y-4 p-6">
      <h1 className="font-display text-2xl font-semibold">Venues</h1>
      <div className="overflow-hidden rounded-xl border border-border bg-card-soft">
        <div className="grid grid-cols-6 border-b border-border bg-card px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="col-span-2">Venue</span>
          <span>Ciudad</span>
          <span>GMV mes</span>
          <span>Plan</span>
          <span>Estado</span>
        </div>
        {venues.map((v) => (
          <div key={v.n} className="grid grid-cols-6 items-center border-b border-border/50 px-4 py-3 text-sm last:border-0 hover:bg-card">
            <div className="col-span-2 flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-peacock" />
              <span className="font-medium">{v.n}</span>
            </div>
            <span className="text-xs text-muted-foreground">{v.c}</span>
            <span className="font-semibold text-secondary">{v.gmv}</span>
            <span className="text-xs">{v.tier}</span>
            <span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                v.st === "Activo" ? "bg-emerald-500/15 text-emerald-300" :
                v.st === "Pendiente" ? "bg-secondary/15 text-secondary" :
                "bg-muted text-muted-foreground"
              }`}>{v.st}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TierCuration() {
  const candidates = [
    { n: "Camila S.", h: "@cami.sosa", followers: "32.4k", visits: 18, stories: 9, signal: "Aesthetic · Magnetismo" },
    { n: "Diego F.", h: "@diegof", followers: "12.1k", visits: 22, stories: 14, signal: "Local influencer" },
    { n: "Renata O.", h: "@renatao", followers: "58.2k", visits: 7, stories: 4, signal: "Alcance digital" },
    { n: "Bruno T.", h: "@brunot", followers: "4.8k", visits: 31, stories: 21, signal: "Hábito alto" },
  ];
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Curación de tiers</h1>
          <p className="text-sm text-muted-foreground">
            Aprueba manualmente la promoción a Gold. Bronze y Silver son automáticos.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-tier-gold px-3 py-1 font-bold text-black">18 Gold</span>
          <span className="rounded-full bg-tier-silver px-3 py-1 font-bold text-black">240 Silver</span>
          <span className="rounded-full bg-tier-bronze px-3 py-1 font-bold text-black">3.2k Bronze</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {candidates.map((c) => (
          <div key={c.h} className="rounded-xl border border-border bg-card-soft p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary" />
              <div className="flex-1">
                <p className="font-medium leading-none">{c.n}</p>
                <p className="text-xs text-muted-foreground">{c.h}</p>
              </div>
              <span className="rounded-full bg-tier-silver px-2 py-0.5 text-[10px] font-bold text-black">SILVER</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-card p-2">
                <p className="font-display text-base font-semibold">{c.followers}</p>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">IG</p>
              </div>
              <div className="rounded-lg bg-card p-2">
                <p className="font-display text-base font-semibold">{c.visits}</p>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Visitas</p>
              </div>
              <div className="rounded-lg bg-card p-2">
                <p className="font-display text-base font-semibold">{c.stories}</p>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Stories</p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1 text-xs text-secondary">
              <Gem className="h-3 w-3" /> {c.signal}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg bg-gradient-to-r from-secondary to-tier-gold py-1.5 text-xs font-semibold text-black">
                <CheckCircle2 className="mr-1 inline h-3 w-3" /> Promover a Gold
              </button>
              <button className="rounded-lg border border-border px-3 text-xs text-muted-foreground">
                <Flag className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Revenue() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="font-display text-2xl font-semibold">Revenue</h1>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Comisión MTD" value="$274k" delta="+19%" icon={Wallet} />
        <Stat label="ARR proyectado" value="$3.24M" delta="+22%" icon={TrendingUp} />
        <Stat label="Take rate" value="10.0%" delta="estable" icon={Sparkles} />
      </div>
      <div className="rounded-xl border border-border bg-card-soft p-4">
        <p className="mb-3 text-sm font-medium">Comisión por venue (top 5)</p>
        {[
          { n: "Casa Luminar", v: 84, p: 100 },
          { n: "Neón Bar", v: 62, p: 74 },
          { n: "Costa Azul", v: 41, p: 49 },
          { n: "Loto Café", v: 22, p: 26 },
          { n: "Bocanada", v: 18, p: 21 },
        ].map((r) => (
          <div key={r.n} className="mb-2">
            <div className="mb-1 flex justify-between text-xs">
              <span>{r.n}</span>
              <span className="font-semibold text-secondary">${r.v}k</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gold" style={{ width: `${r.p}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Trust() {
  const flags = [
    { sev: "high", t: "Story duplicada", u: "@ghost.user", v: "Neón Bar", time: "12m" },
    { sev: "med", t: "Múltiples cuentas mismo dispositivo", u: "@noemi.t", v: "—", time: "1h" },
    { sev: "low", t: "Velocidad de canje anómala", u: "@flash.x", v: "Loto Café", time: "3h" },
  ];
  return (
    <div className="space-y-4 p-6">
      <h1 className="font-display text-2xl font-semibold">Trust & Safety</h1>
      <div className="space-y-2">
        {flags.map((f, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card-soft p-3">
            <span className={`h-2.5 w-2.5 rounded-full ${
              f.sev === "high" ? "bg-destructive" : f.sev === "med" ? "bg-secondary" : "bg-muted-foreground"
            }`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{f.t}</p>
              <p className="text-xs text-muted-foreground">{f.u} · {f.v}</p>
            </div>
            <span className="text-xs text-muted-foreground">{f.time}</span>
            <button className="rounded-md border border-border px-2 py-1 text-xs">Revisar</button>
          </div>
        ))}
      </div>
    </div>
  );
}