import { useState } from "react";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  Megaphone,
  Plus,
  Settings,
  Sparkles,
  Users,
  TrendingUp,
  Instagram,
  Search,
} from "lucide-react";

export function ManagerWeb() {
  const [tab, setTab] = useState("dashboard");
  const [cashback, setCashback] = useState(18);

  const nav = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { id: "promos", label: "Promociones", Icon: Megaphone },
    { id: "guests", label: "Huéspedes", Icon: Users },
    { id: "analytics", label: "Analítica", Icon: BarChart3 },
    { id: "settings", label: "Ajustes", Icon: Settings },
  ];

  return (
    <div className="flex h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-border bg-sidebar p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-peacock text-lg">
            🦚
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none">
              Casa Luminar
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Manager
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
        <div className="rounded-xl bg-card p-3">
          <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-secondary">
            <Sparkles className="h-3 w-3" /> AI Copilot
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Genera tu próxima campaña en 1 click.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Buscar huéspedes, promos…
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs">
              <Calendar className="mr-1 inline h-3.5 w-3.5" /> Últimos 30 días
            </button>
            <button className="rounded-lg bg-peacock px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
              <Plus className="mr-1 inline h-3.5 w-3.5" /> Nueva promo
            </button>
          </div>
        </div>

        {tab === "dashboard" && <Dashboard />}
        {tab === "promos" && (
          <Promos cashback={cashback} setCashback={setCashback} />
        )}
        {tab === "guests" && <Guests />}
        {tab === "analytics" && <Dashboard />}
        {tab === "settings" && <Dashboard />}
      </main>
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border bg-card-soft p-4">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
        <TrendingUp className="h-3 w-3" /> {delta}
      </p>
    </div>
  );
}

function Dashboard() {
  const bars = [40, 55, 38, 70, 62, 88, 95, 72, 80, 110, 96, 130];
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Buenas tardes, Diego</h1>
        <p className="text-sm text-muted-foreground">
          Tu rooftop está corriendo 3 promos activas · 47 cupones canjeados esta semana.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Spend influido" value="$84.2k" delta="+22% vs sem ant." />
        <Stat label="Cupones canjeados" value="312" delta="+18%" />
        <Stat label="Ticket promedio" value="$642" delta="+9%" />
        <Stat label="Stories verificadas" value="46" delta="+31%" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-card-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Redenciones · últimas 12 semanas</p>
            <span className="text-xs text-muted-foreground">Bronze · Silver · Gold</span>
          </div>
          <div className="flex h-40 items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col gap-0.5">
                <div className="rounded-t bg-tier-gold" style={{ height: `${h * 0.3}%` }} />
                <div className="bg-tier-silver" style={{ height: `${h * 0.35}%` }} />
                <div className="rounded-b bg-tier-bronze" style={{ height: `${h * 0.35}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">Huéspedes por tier</p>
          <div className="space-y-3">
            {[
              { t: "Gold", v: 18, c: "bg-tier-gold" },
              { t: "Silver", v: 42, c: "bg-tier-silver" },
              { t: "Bronze", v: 130, c: "bg-tier-bronze" },
            ].map((r) => (
              <div key={r.t}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{r.t}</span>
                  <span className="font-semibold">{r.v}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${r.c}`} style={{ width: `${(r.v / 130) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg bg-secondary py-2 text-xs font-semibold text-secondary-foreground">
            <Instagram className="h-3 w-3" /> Lanzar campaña de stories
          </button>
        </div>
      </div>
    </div>
  );
}

function Promos({ cashback, setCashback }: { cashback: number; setCashback: (n: number) => void }) {
  const promos = [
    { name: "Jueves Gold", tier: "Gold", cb: 22, status: "Activa", redeems: 38 },
    { name: "Brunch sábado", tier: "Silver+", cb: 12, status: "Activa", redeems: 91 },
    { name: "Story bonus", tier: "Todos", cb: 10, status: "Activa", redeems: 46 },
    { name: "Cumpleaños", tier: "Gold", cb: 30, status: "Pausada", redeems: 6 },
  ];
  return (
    <div className="grid grid-cols-5 gap-5 p-6">
      <div className="col-span-3 space-y-3">
        <h1 className="font-display text-2xl font-semibold">Promociones</h1>
        <div className="overflow-hidden rounded-xl border border-border bg-card-soft">
          <div className="grid grid-cols-6 border-b border-border bg-card px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="col-span-2">Nombre</span>
            <span>Tier</span>
            <span>Cashback</span>
            <span>Canjeos</span>
            <span>Estado</span>
          </div>
          {promos.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-6 items-center border-b border-border/50 px-4 py-3 text-sm last:border-0 hover:bg-card"
            >
              <span className="col-span-2 font-medium">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.tier}</span>
              <span className="font-semibold text-secondary">{p.cb}%</span>
              <span>{p.redeems}</span>
              <span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    p.status === "Activa"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 space-y-3">
        <h2 className="font-display text-xl font-semibold">Nueva promoción</h2>
        <div className="space-y-3 rounded-xl border border-border bg-card-soft p-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Nombre
            </label>
            <div className="mt-1 rounded-lg border border-border bg-input px-3 py-2 text-sm">
              Viernes neón
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Tier objetivo
            </label>
            <div className="mt-1 flex gap-2">
              {["Bronze", "Silver", "Gold"].map((t) => (
                <button
                  key={t}
                  className={`flex-1 rounded-lg border px-2 py-1.5 text-xs ${
                    t === "Gold"
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Cashback</span>
              <span className="font-bold text-secondary">{cashback}%</span>
            </label>
            <input
              type="range"
              min={5}
              max={40}
              value={cashback}
              onChange={(e) => setCashback(Number(e.target.value))}
              className="mt-2 w-full accent-[oklch(0.82_0.13_85)]"
            />
          </div>
          <div className="rounded-lg bg-peacock/10 p-3 text-xs text-muted-foreground">
            <p className="text-foreground">Estimado de Mesita AI</p>
            <p className="mt-0.5">
              ~ <span className="text-secondary">+24 visitas</span> · spend influido{" "}
              <span className="text-secondary">$18.4k</span>
            </p>
          </div>
          <button className="w-full rounded-lg bg-peacock py-2 text-sm font-semibold text-primary-foreground shadow-glow">
            Lanzar promo
          </button>
        </div>
      </div>
    </div>
  );
}

function Guests() {
  const guests = [
    { n: "Valentina R.", h: "@valenrose", tier: "Gold", v: 12, s: "MXN 8.4k" },
    { n: "Mateo G.", h: "@matgg", tier: "Gold", v: 9, s: "MXN 6.1k" },
    { n: "Sofía A.", h: "@sof.ah", tier: "Silver", v: 6, s: "MXN 2.9k" },
    { n: "Luis P.", h: "@luispb", tier: "Silver", v: 4, s: "MXN 1.8k" },
    { n: "Ana M.", h: "@anita", tier: "Bronze", v: 2, s: "MXN 0.6k" },
  ];
  return (
    <div className="space-y-4 p-6">
      <h1 className="font-display text-2xl font-semibold">Huéspedes</h1>
      <div className="overflow-hidden rounded-xl border border-border bg-card-soft">
        <div className="grid grid-cols-6 border-b border-border bg-card px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="col-span-2">Huésped</span>
          <span>Tier</span>
          <span>Visitas</span>
          <span>Spend</span>
          <span>Acción</span>
        </div>
        {guests.map((g) => (
          <div
            key={g.h}
            className="grid grid-cols-6 items-center border-b border-border/50 px-4 py-3 text-sm last:border-0 hover:bg-card"
          >
            <div className="col-span-2 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-peacock" />
              <div>
                <p className="font-medium leading-none">{g.n}</p>
                <p className="text-xs text-muted-foreground">{g.h}</p>
              </div>
            </div>
            <span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-black ${
                  g.tier === "Gold"
                    ? "bg-tier-gold"
                    : g.tier === "Silver"
                    ? "bg-tier-silver"
                    : "bg-tier-bronze"
                }`}
              >
                {g.tier.toUpperCase()}
              </span>
            </span>
            <span>{g.v}</span>
            <span className="text-secondary">{g.s}</span>
            <span>
              <button className="rounded-md border border-border px-2 py-1 text-xs">
                Invitar
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}