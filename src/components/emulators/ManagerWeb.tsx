import { useState } from "react";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Coins,
  Image as ImageIcon,
  Instagram,
  LayoutDashboard,
  MapPin,
  Megaphone,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  UserPlus,
  Users,
  Wallet as WalletIcon,
  Bell,
  Globe,
  LifeBuoy,
  Lock,
  LogOut,
  CreditCard,
  FileText,
  ChevronRight,
  GraduationCap,
  Mail,
  Filter,
} from "lucide-react";

type TabId =
  | "dashboard"
  | "place"
  | "promos"
  | "analytics"
  | "wallet"
  | "team"
  | "account";

const UNITS = [
  { id: "luminar", name: "Casa Luminar", city: "CDMX · Roma Nte.", emoji: "🦚" },
  { id: "loto", name: "Loto Café", city: "CDMX · Condesa", emoji: "🌿" },
  { id: "mar", name: "Mar Verde", city: "Tulum · Centro", emoji: "🌊" },
];

export function ManagerWeb() {
  const [tab, setTab] = useState<TabId>("dashboard");
  const [unitId, setUnitId] = useState(UNITS[0].id);
  const [unitOpen, setUnitOpen] = useState(false);
  const unit = UNITS.find((u) => u.id === unitId)!;

  const nav: { id: TabId; label: string; Icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { id: "place", label: "Place", Icon: Store },
    { id: "promos", label: "Promos", Icon: Megaphone },
    { id: "analytics", label: "Analytics", Icon: BarChart3 },
    { id: "wallet", label: "Wallet", Icon: WalletIcon },
    { id: "team", label: "Team", Icon: Users },
  ];

  return (
    <div className="flex h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-border bg-sidebar p-4">
        {/* Unit switcher */}
        <div className="relative mb-5">
          <button
            onClick={() => setUnitOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-2 text-left hover:bg-card-soft"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-peacock text-lg">
              {unit.emoji}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-display text-sm font-semibold leading-none">
                {unit.name}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                {unit.city}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          {unitOpen && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-elev">
              {UNITS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setUnitId(u.id);
                    setUnitOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-card-soft ${
                    u.id === unitId ? "bg-card-soft" : ""
                  }`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-peacock/30">
                    {u.emoji}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">{u.name}</p>
                    <p className="truncate text-[9px] text-muted-foreground">
                      {u.city}
                    </p>
                  </div>
                </button>
              ))}
              <button className="flex w-full items-center gap-2 border-t border-border px-2 py-2 text-left text-xs text-secondary hover:bg-card-soft">
                <Plus className="h-3.5 w-3.5" /> Add new unit
              </button>
            </div>
          )}
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
            Generate your next campaign in 1 click.
          </p>
        </div>
        {/* Account chip */}
        <button
          onClick={() => setTab("account")}
          className="mt-3 flex w-full items-center gap-2 rounded-xl border border-border bg-card p-2 text-left hover:bg-card-soft"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-peacock to-secondary text-xs font-bold text-primary-foreground">
            DS
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-semibold leading-none">
              Diego Salas
            </p>
            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
              Owner · diego@luminar.mx
            </p>
          </div>
          <ChevronDown className="h-3 w-3 -rotate-90 text-muted-foreground" />
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {tab === "dashboard" && <Dashboard unit={unit} />}
        {tab === "place" && <Place unit={unit} />}
        {tab === "promos" && <Promos />}
        {tab === "analytics" && <Analytics />}
        {tab === "wallet" && <Wallet />}
        {tab === "team" && <Team />}
        {tab === "account" && <AccountView />}
      </main>
    </div>
  );
}

/* ============== DASHBOARD ============== */

function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
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

function Dashboard({ unit }: { unit: { name: string } }) {
  const bars = [40, 55, 38, 70, 62, 88, 95, 72, 80, 110, 96, 130];
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">
          Good afternoon, Diego
        </h1>
        <p className="text-sm text-muted-foreground">
          {unit.name} is running 3 active promos · 47 coupons redeemed this week.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Influenced spend" value="$84.2k" delta="+22% vs last wk" />
        <Stat label="Coupons redeemed" value="312" delta="+18%" />
        <Stat label="Average ticket" value="$642" delta="+9%" />
        <Stat label="Verified stories" value="46" delta="+31%" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-card-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Redemptions · last 12 weeks</p>
            <span className="text-xs text-muted-foreground">
              Bronze · Silver · Gold
            </span>
          </div>
          <div className="flex h-40 items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col gap-0.5">
                <div
                  className="rounded-t bg-tier-gold"
                  style={{ height: `${h * 0.3}%` }}
                />
                <div
                  className="bg-tier-silver"
                  style={{ height: `${h * 0.35}%` }}
                />
                <div
                  className="rounded-b bg-tier-bronze"
                  style={{ height: `${h * 0.35}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">Guests by tier</p>
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
                  <div
                    className={`h-full ${r.c}`}
                    style={{ width: `${(r.v / 130) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg bg-secondary py-2 text-xs font-semibold text-secondary-foreground">
            <Instagram className="h-3 w-3" /> Launch stories campaign
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============== PLACE ============== */

function Place({ unit }: { unit: { name: string; city: string } }) {
  const photos = [
    "from-amber-400/50 to-rose-500/50",
    "from-emerald-400/50 to-teal-500/50",
    "from-violet-400/50 to-fuchsia-500/50",
    "from-sky-400/50 to-indigo-500/50",
    "from-orange-400/50 to-pink-500/50",
    "from-lime-400/50 to-emerald-500/50",
  ];
  const menu = [
    { n: "Burrata & heirloom tomato", p: 280 },
    { n: "Octopus, smoked paprika", p: 420 },
    { n: "Wagyu tagliata, truffle", p: 680 },
    { n: "Saffron risotto", p: 340 },
    { n: "Mezcal sour", p: 190 },
  ];
  return (
    <div className="space-y-5 p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Place</h1>
          <p className="text-xs text-muted-foreground">
            Everything guests see about {unit.name}.
          </p>
        </div>
        <button className="rounded-lg bg-peacock px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
          Save changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Identity */}
        <div className="col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card-soft p-4">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              Identity
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" value={unit.name} />
              <Field label="Category" value="Rooftop · Cocktails" />
              <Field label="Price range" value="$$$" />
              <Field label="Hours" value="Tue–Sun · 5pm – 1am" />
            </div>
            <div className="mt-3">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Bio
              </label>
              <div className="mt-1 rounded-lg border border-border bg-input px-3 py-2 text-xs leading-relaxed">
                Rooftop garden in Roma Nte. with peacock-blue tiles, a wood-fired
                kitchen and golden-hour cocktails. Reservations recommended on
                weekends.
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="rounded-xl border border-border bg-card-soft p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Photos
              </p>
              <button className="text-[10px] text-secondary">
                + Upload
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-lg bg-gradient-to-br ${p}`}
                >
                  {i === 0 && (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
                      Cover
                    </span>
                  )}
                </div>
              ))}
              <button className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground hover:bg-card">
                <ImageIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="rounded-xl border border-border bg-card-soft p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Menu
              </p>
              <button className="text-[10px] text-secondary">+ Add item</button>
            </div>
            <div className="space-y-2">
              {menu.map((m) => (
                <div
                  key={m.n}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs"
                >
                  <span>{m.n}</span>
                  <span className="font-semibold text-secondary">${m.p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card-soft p-4">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              Location
            </p>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-peacock/40 to-secondary/30">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <p className="mt-2 text-xs">Av. Álvaro Obregón 185</p>
            <p className="text-[11px] text-muted-foreground">
              Roma Nte., 06700 CDMX
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card-soft p-4">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              Social & links
            </p>
            <SocialRow icon="IG" handle="@casaluminar" />
            <SocialRow icon="TT" handle="@casaluminar" />
            <SocialRow icon="G" handle="Casa Luminar · 4.6 ★" />
            <SocialRow icon="UE" handle="Uber Eats · 4.8 ★" />
            <SocialRow icon="W" handle="casaluminar.mx" />
          </div>

          <div className="rounded-xl border border-border bg-card-soft p-4">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              Ratings
            </p>
            <div className="space-y-1.5 text-xs">
              <Rating label="Mesita" value="4.8" count="1.2k" />
              <Rating label="Google" value="4.6" count="3.4k" />
              <Rating label="Instagram" value="4.9" count="980" />
              <Rating label="Uber Eats" value="4.8" count="2.1k" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <div className="mt-1 rounded-lg border border-border bg-input px-3 py-2 text-xs">
        {value}
      </div>
    </div>
  );
}

function SocialRow({ icon, handle }: { icon: string; handle: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/40 py-1.5 last:border-0">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-peacock/30 text-[9px] font-bold">
        {icon}
      </div>
      <span className="text-xs">{handle}</span>
    </div>
  );
}

function Rating({
  label,
  value,
  count,
}: {
  label: string;
  value: string;
  count: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>
        <Star className="mr-1 inline h-3 w-3 fill-tier-gold text-tier-gold" />
        <span className="font-semibold">{value}</span>
        <span className="ml-1 text-[10px] text-muted-foreground">({count})</span>
      </span>
    </div>
  );
}

/* ============== PROMOTIONS ============== */

function Promos() {
  const tiers: {
    name: "Bronze" | "Silver" | "Gold" | "Diamond";
    color: string;
    cb: number;
    visits: string;
    audience: number;
    handles: string[];
    reach: string;
  }[] = [
    { name: "Bronze", color: "bg-tier-bronze", cb: 5, visits: "0 – 2 visits", audience: 18420, handles: [], reach: "Everyone" },
    { name: "Silver", color: "bg-tier-silver", cb: 10, visits: "3 – 6 visits", audience: 6240, handles: ["@sofip", "@renatak", "@tomasl"], reach: "1K+ followers" },
    { name: "Gold", color: "bg-tier-gold", cb: 20, visits: "7 – 19 visits", audience: 1860, handles: ["@valenrose", "@lucasm", "@camivb", "@matef", "@anat"], reach: "5K+ followers" },
    {
      name: "Diamond",
      color: "bg-gradient-to-r from-cyan-300 to-sky-400",
      cb: 30,
      visits: "20+ visits",
      audience: 184,
      handles: ["@valenrose", "@camivb", "@anat", "@matef"],
      reach: "20K+ followers · invite-only",
    },
  ];
  const [values, setValues] = useState({
    Welcome: 20,
    Bronze: 5,
    Silver: 10,
    Gold: 20,
    Diamond: 30,
  });
  const extras = [
    { name: "Story bonus", desc: "+10% when guest posts a verified story", on: true },
    { name: "Birthday boost", desc: "+30% during birthday week", on: true },
    { name: "Weekday lift", desc: "+5% Mon – Wed", on: false },
  ];
  const communities: {
    id: string;
    name: string;
    color: string;
    audience: number;
    handles: string[];
    boost: number;
    on: boolean;
  }[] = [
    { id: "tec", name: "Tec de Monterrey", color: "bg-[#0033A0] text-white", audience: 1840, handles: ["@valenrose", "@camivb", "@anat"], boost: 5, on: true },
    { id: "udem", name: "UDEM", color: "bg-[#003F2D] text-white", audience: 920, handles: ["@sofip", "@matef"], boost: 5, on: true },
    { id: "stanford", name: "Stanford", color: "bg-[#8C1515] text-white", audience: 312, handles: ["@lucasm", "@tomasl"], boost: 10, on: false },
    { id: "itam", name: "ITAM", color: "bg-[#003366] text-white", audience: 640, handles: ["@diegoa", "@renatak"], boost: 5, on: false },
  ];
  const [commState, setCommState] = useState(
    Object.fromEntries(communities.map((c) => [c.id, { boost: c.boost, on: c.on }])),
  );
  const COUNTRIES = [
    { code: "MX", flag: "🇲🇽", name: "Mexico" },
    { code: "US", flag: "🇺🇸", name: "United States" },
    { code: "CO", flag: "🇨🇴", name: "Colombia" },
    { code: "AR", flag: "🇦🇷", name: "Argentina" },
    { code: "ES", flag: "🇪🇸", name: "Spain" },
    { code: "BR", flag: "🇧🇷", name: "Brazil" },
  ];
  const [audience, setAudience] = useState({
    on: false,
    countries: ["MX", "US"] as string[],
    ageMin: 21,
    ageMax: 35,
    sex: "all" as "all" | "female" | "male",
  });
  const toggleCountry = (code: string) =>
    setAudience((a) => ({
      ...a,
      countries: a.countries.includes(code)
        ? a.countries.filter((c) => c !== code)
        : [...a.countries, code],
    }));
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Promos</h1>
        <p className="text-xs text-muted-foreground">
          Set Mesita cashback for each tier. Everything else is automatic.
        </p>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          First-time visitors
        </p>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="rounded-full bg-gradient-to-r from-fuchsia-400 to-amber-300 px-2 py-0.5 text-[10px] font-bold text-black">
                WELCOME
              </span>
              <p className="mt-2 text-xs text-muted-foreground">
                One-time discount to convert a new guest into a regular.
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground">First visit only</span>
          </div>
          <div className="mt-3 flex items-end gap-1">
            <span className="font-display text-5xl font-semibold text-secondary">
              {values.Welcome}
            </span>
            <span className="mb-1 text-xl text-secondary">%</span>
            <span className="mb-2 ml-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              cashback
            </span>
          </div>
          <div className="mt-3 grid max-w-xs grid-cols-4 gap-1">
            {[5, 10, 20, 50].map((v) => (
              <button
                key={v}
                onClick={() => setValues((s) => ({ ...s, Welcome: v }))}
                className={`rounded-md border px-1 py-1 text-[10px] font-semibold transition ${
                  values.Welcome === v
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
          <div className="mt-3 max-w-xs rounded-lg border border-border bg-card p-2">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-sm font-semibold text-foreground">
                12,480
              </span>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                guests nearby · never visited
              </span>
            </div>
            <p className="mt-1 text-[9px] text-muted-foreground">
              Identity revealed after first visit.
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Returning visitors · by tier
      </p>
      <div className="grid grid-cols-4 gap-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="rounded-xl border border-border bg-card-soft p-4"
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-black ${t.color}`}
              >
                {t.name.toUpperCase()}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {t.visits}
              </span>
            </div>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-5xl font-semibold text-secondary">
                {values[t.name]}
              </span>
              <span className="mb-1 text-xl text-secondary">%</span>
              <span className="mb-2 ml-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                cashback
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1">
              {[5, 10, 20, 50].map((v) => (
                <button
                  key={v}
                  onClick={() => setValues((s) => ({ ...s, [t.name]: v }))}
                  className={`rounded-md border px-1 py-1 text-[10px] font-semibold transition ${
                    values[t.name] === v
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {v}%
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-peacock/10 p-2 text-[10px] text-muted-foreground">
              Est. <span className="text-secondary">+{values[t.name] * 1.2 | 0} visits/wk</span>
            </div>
            <div className="mt-2 rounded-lg border border-border bg-card p-2">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm font-semibold text-foreground">
                  {t.audience.toLocaleString()}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                  on Mesita
                </span>
              </div>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-secondary">
                {t.reach}
              </p>
              {t.handles.length > 0 ? (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {t.handles.slice(0, 3).map((h) => (
                    <a
                      key={h}
                      href={`https://instagram.com/${h.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 rounded-full bg-card-soft px-1.5 py-0.5 text-[9px] font-medium text-foreground transition hover:text-secondary"
                    >
                      <Instagram className="h-2.5 w-2.5" />
                      {h}
                    </a>
                  ))}
                  {t.handles.length > 3 && (
                    <span className="rounded-full bg-card-soft px-1.5 py-0.5 text-[9px] text-muted-foreground">
                      +{t.handles.length - 3}
                    </span>
                  )}
                </div>
              ) : (
                <p className="mt-1 text-[9px] text-muted-foreground">No social profile shared</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Communities · email-verified audiences
        <span className="rounded-full bg-tier-gold/20 px-2 py-0.5 text-[9px] font-bold text-tier-gold">Coming soon</span>
      </p>
      <div className="relative rounded-xl border border-dashed border-border bg-card-soft p-4">
        <div className="pointer-events-none opacity-40">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Filter & boost by community</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Reach members of specific schools or orgs (Tec, UDEM, Stanford…). Membership requires email verification — only verified members see the boost.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1 text-[10px] font-semibold text-secondary">
            <Mail className="h-3 w-3" /> Verified
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {communities.map((c) => {
            const s = commState[c.id];
            return (
              <div key={c.id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.color}`}>
                    <GraduationCap className="h-3 w-3" /> {c.name}
                  </span>
                  <button
                    onClick={() =>
                      setCommState((st) => ({ ...st, [c.id]: { ...st[c.id], on: !st[c.id].on } }))
                    }
                    className={`flex h-5 w-9 items-center rounded-full px-0.5 ${
                      s.on ? "bg-secondary" : "bg-muted"
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white transition ${s.on ? "ml-auto" : ""}`} />
                  </button>
                </div>
                <div className="mt-3 flex items-end gap-1">
                  <span className={`font-display text-3xl font-semibold ${s.on ? "text-secondary" : "text-muted-foreground"}`}>
                    +{s.boost}
                  </span>
                  <span className={`mb-1 text-base ${s.on ? "text-secondary" : "text-muted-foreground"}`}>%</span>
                  <span className="mb-1.5 ml-1 text-[9px] uppercase tracking-widest text-muted-foreground">
                    boost
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {[5, 10, 15].map((v) => (
                    <button
                      key={v}
                      onClick={() =>
                        setCommState((st) => ({ ...st, [c.id]: { ...st[c.id], boost: v } }))
                      }
                      className={`rounded-md border px-1 py-1 text-[10px] font-semibold transition ${
                        s.boost === v
                          ? "border-secondary bg-secondary text-secondary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      +{v}%
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-md bg-card-soft p-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-sm font-semibold">{c.audience.toLocaleString()}</span>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground">members nearby</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {c.handles.slice(0, 3).map((h) => (
                      <a
                        key={h}
                        href={`https://instagram.com/${h.replace("@", "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 rounded-full bg-card px-1.5 py-0.5 text-[9px] font-medium text-foreground hover:text-secondary"
                      >
                        <Instagram className="h-2.5 w-2.5" />
                        {h}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">
          Boost stacks on top of tier cashback. A Tec-verified Gold guest gets {values.Gold}% + community boost.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Note: community boosts don't apply to the welcome cashback — first-visit reward stays flat for everyone.
        </p>
        </div>
      </div>

      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Audience filters · soft targeting
        <span className="rounded-full bg-tier-gold/20 px-2 py-0.5 text-[9px] font-bold text-tier-gold">Coming soon</span>
      </p>
      <div className="relative rounded-xl border border-dashed border-border bg-card-soft p-4">
        <div className="pointer-events-none opacity-40">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Who sees this promo</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Narrow distribution by country, age, or sex using guests' profile data. Internal targeting only — guests never see they were filtered. Use responsibly and within local advertising rules.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
            <Lock className="h-3 w-3" /> Manager-only
          </span>
        </div>

        <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">Enable audience filters</span>
          </div>
          <button
            onClick={() => setAudience((a) => ({ ...a, on: !a.on }))}
            className={`flex h-5 w-9 items-center rounded-full px-0.5 ${
              audience.on ? "bg-secondary" : "bg-muted"
            }`}
          >
            <div className={`h-4 w-4 rounded-full bg-white transition ${audience.on ? "ml-auto" : ""}`} />
          </button>
        </div>

        <div className={`grid gap-3 lg:grid-cols-3 ${audience.on ? "" : "opacity-50 pointer-events-none"}`}>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Countries
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COUNTRIES.map((c) => {
                const active = audience.countries.includes(c.code);
                return (
                  <button
                    key={c.code}
                    onClick={() => toggleCountry(c.code)}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium transition ${
                      active
                        ? "border-secondary bg-secondary/15 text-secondary"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm leading-none">{c.flag}</span>
                    {c.code}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              {audience.countries.length === 0 ? "All countries" : `${audience.countries.length} selected`}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Age range
            </p>
            <div className="flex items-end gap-1">
              <span className="font-display text-3xl font-semibold text-secondary">{audience.ageMin}</span>
              <span className="mb-1 text-muted-foreground">–</span>
              <span className="font-display text-3xl font-semibold text-secondary">{audience.ageMax}</span>
              <span className="mb-1.5 ml-1 text-[9px] uppercase tracking-widest text-muted-foreground">years</span>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Min</label>
                <input
                  type="range"
                  min={18}
                  max={80}
                  value={audience.ageMin}
                  onChange={(e) =>
                    setAudience((a) => ({ ...a, ageMin: Math.min(Number(e.target.value), a.ageMax) }))
                  }
                  className="w-full accent-secondary"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Max</label>
                <input
                  type="range"
                  min={18}
                  max={80}
                  value={audience.ageMax}
                  onChange={(e) =>
                    setAudience((a) => ({ ...a, ageMax: Math.max(Number(e.target.value), a.ageMin) }))
                  }
                  className="w-full accent-secondary"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Sex
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {(["all", "female", "male"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAudience((a) => ({ ...a, sex: opt }))}
                  className={`rounded-md border px-2 py-2 text-[11px] font-semibold capitalize transition ${
                    audience.sex === opt
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Based on the guest's self-declared profile. Optional field — guests who didn't share are excluded when not "all".
            </p>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground">
          Especially useful for bars and nightclubs (e.g. ladies' night, 25–35 weekend brunch). Check local laws before using sex-based targeting on alcohol or public-accommodation promos.
        </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card-soft p-4">
        <p className="mb-3 text-sm font-medium">Bonus rules</p>
        <div className="space-y-2">
          {extras.map((e) => (
            <div
              key={e.name}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"
            >
              <div>
                <p className="text-xs font-medium">{e.name}</p>
                <p className="text-[10px] text-muted-foreground">{e.desc}</p>
              </div>
              <div
                className={`flex h-5 w-9 items-center rounded-full px-0.5 ${
                  e.on ? "bg-secondary" : "bg-muted"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition ${
                    e.on ? "ml-auto" : ""
                  }`}
                />
              </div>
            </div>
          ))}
          {/* Locked / non-configurable parameter */}
          <div className="flex items-center justify-between rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Discount limit per visit</p>
              <p className="text-[10px] text-muted-foreground">Cashback capped at $1,000 MXN · set by Mesita</p>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">$1,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== ANALYTICS ============== */

function Analytics() {
  const funnel = [
    { label: "Profile views", v: 12480, pct: 100 },
    { label: "Swipes right", v: 4320, pct: 35 },
    { label: "Coupons claimed", v: 1860, pct: 15 },
    { label: "Visits", v: 612, pct: 5 },
    { label: "Stories shared", v: 146, pct: 1.2 },
  ];
  const stories = [
    { h: "@valenrose", t: "Gold", ago: "2h" },
    { h: "@matgg", t: "Gold", ago: "5h" },
    { h: "@sof.ah", t: "Silver", ago: "1d" },
    { h: "@luispb", t: "Silver", ago: "1d" },
    { h: "@anita", t: "Bronze", ago: "2d" },
    { h: "@noctura", t: "Gold", ago: "3d" },
  ];
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Analytics</h1>
        <p className="text-xs text-muted-foreground">
          Marketing & financial performance powered by Mesita.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Stat label="Profile views" value="12.4k" delta="+18%" />
        <Stat label="Influenced spend" value="$84.2k" delta="+22%" />
        <Stat label="Cashback paid" value="$11.8k" delta="+14%" />
        <Stat label="Gifts shared" value="146" delta="+31%" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">Conversion funnel</p>
          <div className="space-y-2">
            {funnel.map((f) => (
              <div key={f.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-semibold">
                    {f.v.toLocaleString()}{" "}
                    <span className="text-[10px] text-muted-foreground">
                      · {f.pct}%
                    </span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-to-r from-peacock to-secondary"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 text-sm font-medium">Verified stories</p>
          <div className="grid grid-cols-3 gap-2">
            {stories.map((s, i) => (
              <div
                key={i}
                className="relative aspect-[9/14] overflow-hidden rounded-lg bg-gradient-to-br from-violet-500/40 via-rose-500/40 to-amber-400/40"
              >
                <span
                  className={`absolute right-1 top-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold text-black ${
                    s.t === "Gold"
                      ? "bg-tier-gold"
                      : s.t === "Silver"
                      ? "bg-tier-silver"
                      : "bg-tier-bronze"
                  }`}
                >
                  {s.t[0]}
                </span>
                <div className="absolute inset-x-1 bottom-1 rounded bg-black/50 px-1 py-0.5 backdrop-blur">
                  <p className="truncate text-[9px] text-white">{s.h}</p>
                  <p className="text-[8px] text-white/70">{s.ago}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Average ticket
          </p>
          <p className="mt-1 font-display text-xl font-semibold">$642</p>
          <p className="text-[10px] text-emerald-400">+9% vs last 30d</p>
        </div>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Repeat rate
          </p>
          <p className="mt-1 font-display text-xl font-semibold">38%</p>
          <p className="text-[10px] text-emerald-400">+6 pts</p>
        </div>
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            ROAS
          </p>
          <p className="mt-1 font-display text-xl font-semibold">7.1×</p>
          <p className="text-[10px] text-emerald-400">+0.8×</p>
        </div>
      </div>

      <ValidatorActivity />
    </div>
  );
}

/* ============== WALLET ============== */

function ValidatorActivity() {
  const validators = [
    {
      n: "Carlos",
      role: "Bar lead",
      avatar: "C",
      color: "from-emerald-400 to-teal-500",
      online: true,
      validated: 18,
      flagged: 1,
      lastAgo: "2m",
      chat: [
        { who: "bot", t: "🦚 Mesa 7 · Valeria · $840 · 20% cashback", at: "20:12" },
        { who: "me", t: "OK validado", at: "20:12" },
        { who: "bot", t: "Mesa 3 · Diego · $1,420 · 10%", at: "20:31" },
        { who: "me", t: "OK", at: "20:31" },
        { who: "bot", t: "Mesa 11 · Sofía · $620 · 20% · ⚠ ticket sin propina", at: "20:48" },
        { who: "me", t: "Corregido, propina incluida", at: "20:49" },
      ],
    },
    {
      n: "Lucía",
      role: "Hostess",
      avatar: "L",
      color: "from-rose-400 to-pink-500",
      online: true,
      validated: 11,
      flagged: 0,
      lastAgo: "8m",
      chat: [
        { who: "bot", t: "Reserva · Tomás (+1) · 21:00", at: "20:05" },
        { who: "me", t: "Llegaron, sentados en mesa 4", at: "21:02" },
        { who: "bot", t: "Mesa 4 · Tomás · $1,160 · 20%", at: "22:40" },
        { who: "me", t: "OK validado", at: "22:40" },
        { who: "bot", t: "Mesa 9 · Renata · $980 · 10%", at: "22:55" },
        { who: "me", t: "OK", at: "22:55" },
      ],
    },
    {
      n: "Toño",
      role: "Waiter",
      avatar: "T",
      color: "from-amber-400 to-orange-500",
      online: false,
      validated: 7,
      flagged: 2,
      lastAgo: "1h",
      chat: [
        { who: "bot", t: "Mesa 2 · Andrés · $540 · 5%", at: "19:14" },
        { who: "me", t: "OK", at: "19:14" },
        { who: "bot", t: "Mesa 6 · Camila · $2,100 · 50% · ⚠ revisar tier Diamond", at: "19:45" },
        { who: "me", t: "Confirmado, es Diamond", at: "19:47" },
        { who: "bot", t: "Story verificada · @camivb · +10%", at: "19:48" },
      ],
    },
  ];
  const [active, setActive] = useState(0);
  const v = validators[active];

  return (
    <div className="rounded-xl border border-border bg-card-soft">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-medium">Validator activity</p>
          <p className="text-[10px] text-muted-foreground">
            Read-only monitor of every WhatsApp validation from your team.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <MessageCircle className="h-3 w-3 text-[oklch(0.72_0.16_152)]" /> Live
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr]">
        {/* Validator list */}
        <div className="border-r border-border">
          {validators.map((val, i) => (
            <button
              key={val.n}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-2 border-b border-border/40 px-3 py-2.5 text-left last:border-0 transition ${
                i === active ? "bg-muted/50" : "hover:bg-muted/30"
              }`}
            >
              <div className="relative">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${val.color} text-xs font-bold text-white`}
                >
                  {val.avatar}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-card ${
                    val.online ? "bg-emerald-400" : "bg-muted-foreground/50"
                  }`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{val.n}</p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {val.role} · {val.lastAgo}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold text-foreground">{val.validated}</p>
                {val.flagged > 0 && (
                  <p className="text-[9px] text-rose-400">⚠ {val.flagged}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Embedded chat */}
        <div className="bg-[oklch(0.96_0.012_150)]/40">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${v.color} text-[10px] font-bold text-white`}
            >
              {v.avatar}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">{v.n} · Mesita 🦚</p>
              <p className="text-[9px] text-muted-foreground">
                {v.online ? "online" : `last seen ${v.lastAgo} ago`}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Today · {v.validated} validated · {v.flagged} flagged
            </p>
          </div>
          <div className="max-h-64 space-y-1.5 overflow-y-auto px-3 py-3">
            {v.chat.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] rounded-lg px-2.5 py-1.5 text-[11px] shadow-sm ${
                    m.who === "me"
                      ? "bg-[oklch(0.85_0.10_152)] text-foreground"
                      : "bg-white text-foreground"
                  }`}
                >
                  <p className="leading-snug">{m.t}</p>
                  <p className="mt-0.5 text-right text-[8px] text-muted-foreground">{m.at}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== WALLET ============== */

function Wallet() {
  const tx = [
    { d: "May 11", k: "Payout", a: "+$12,400", c: "text-emerald-400" },
    { d: "May 10", k: "Cashback paid · 18 redeems", a: "-$1,820", c: "text-rose-400" },
    { d: "May 9", k: "Mesita fee · 21 coupons redeemed", a: "-$420", c: "text-muted-foreground" },
    { d: "May 8", k: "Spend influenced", a: "+$14,200", c: "text-emerald-400" },
    { d: "May 7", k: "Story bonus paid · 6", a: "-$340", c: "text-rose-400" },
  ];
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Wallet</h1>
        <p className="text-xs text-muted-foreground">
          Cash earned, cashback owed, payouts.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 rounded-2xl border border-border bg-gradient-to-br from-peacock/30 to-secondary/20 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Available balance
          </p>
          <p className="mt-2 font-display text-4xl font-semibold">$24,180</p>
          <p className="text-[11px] text-muted-foreground">MXN · ready to withdraw</p>
          <button className="mt-4 w-full rounded-lg bg-peacock py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            <Coins className="mr-1 inline h-3.5 w-3.5" /> Withdraw
          </button>
        </div>
        <Stat label="Earned this month" value="$84.2k" delta="+22%" />
        <Stat label="Cashback owed" value="$3.4k" delta="42 open coupons" />
      </div>

      <div className="rounded-xl border border-border bg-card-soft">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-medium">Recent activity</p>
          <button className="text-[10px] text-secondary">Export CSV</button>
        </div>
        {tx.map((t, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border/40 px-4 py-3 text-sm last:border-0"
          >
            <div>
              <p className="font-medium">{t.k}</p>
              <p className="text-[10px] text-muted-foreground">{t.d}</p>
            </div>
            <span className={`font-semibold ${t.c}`}>{t.a}</span>
          </div>
        ))}
      </div>

      {/* Billing & legal */}
      <div className="rounded-xl border border-border bg-card-soft p-4">
        <p className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
          <CreditCard className="h-3 w-3" /> Billing & legal
        </p>
        <div className="grid grid-cols-2 gap-3">
          <SettingRow label="Tax ID (RFC)" value="LUM240711AB3" />
          <SettingRow label="Bank account" value="BBVA ···· 4421" />
          <SettingRow label="Invoices" value="View all" action />
          <SettingRow label="Terms of service" value="Read" action />
        </div>
      </div>
    </div>
  );
}

/* ============== TEAM ============== */

function Team() {
  const managers = [
    { n: "Diego Salas", r: "Owner", e: "diego@luminar.mx", on: true },
    { n: "María Ortiz", r: "Manager", e: "maria@luminar.mx", on: true },
    { n: "Pablo Reyes", r: "Marketing", e: "pablo@luminar.mx", on: false },
  ];
  const validators = [
    { n: "Carlos", role: "Bar lead", w: "+52 55 1840 2210", on: true },
    { n: "Lucía", role: "Hostess", w: "+52 55 9112 4488", on: true },
    { n: "Toño", role: "Waiter", w: "+52 55 4490 7733", on: true },
    { n: "Rebeca", role: "Waiter", w: "+52 55 2230 9988", on: false },
  ];
  return (
    <div className="space-y-5 p-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Team</h1>
          <p className="text-xs text-muted-foreground">
            Who can manage this unit and who validates cashbacks on WhatsApp.
          </p>
        </div>
        <button className="rounded-lg bg-peacock px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
          <UserPlus className="mr-1 inline h-3.5 w-3.5" /> Invite
        </button>
      </div>

      {/* Managers */}
      <div className="rounded-xl border border-border bg-card-soft">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-medium">Managers</p>
          <p className="text-[10px] text-muted-foreground">
            Full access to dashboard, promos, wallet.
          </p>
        </div>
        {managers.map((m) => (
          <div
            key={m.e}
            className="flex items-center justify-between border-b border-border/40 px-4 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-peacock" />
              <div>
                <p className="text-sm font-medium leading-none">{m.n}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {m.e}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] text-secondary">
                {m.r}
              </span>
              <span
                className={`h-2 w-2 rounded-full ${
                  m.on ? "bg-emerald-400" : "bg-muted-foreground"
                }`}
              />
              <button className="text-[10px] text-muted-foreground">···</button>
            </div>
          </div>
        ))}
      </div>

      {/* Validators */}
      <div className="rounded-xl border border-border bg-card-soft">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-medium">WhatsApp validators</p>
            <p className="text-[10px] text-muted-foreground">
              Waiters & hosts who scan QR coupons from their own WhatsApp.
            </p>
          </div>
          <button className="rounded-md border border-border px-2 py-1 text-[10px]">
            <MessageCircle className="mr-1 inline h-3 w-3" /> Test ping
          </button>
        </div>
        {validators.map((v) => (
          <div
            key={v.w}
            className="flex items-center justify-between border-b border-border/40 px-4 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">{v.n}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {v.role} · {v.w}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  v.on
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {v.on ? "Active" : "Paused"}
              </span>
              <button className="text-[10px] text-muted-foreground">···</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============== ACCOUNT ============== */

function AccountView() {
  const [notifs, setNotifs] = useState({
    redeems: true,
    payouts: true,
    weekly: true,
    marketing: false,
  });
  const [lang, setLang] = useState("EN");
  const [currency, setCurrency] = useState("MXN");
  const faqs = [
    {
      q: "How does Mesita cashback work?",
      a: "Guests earn a % of their bill back as Mesita credit. Credits always apply automatically on their next visit at any Mesita venue.",
    },
    {
      q: "When do I receive payouts?",
      a: "Payouts run weekly, every Monday. Funds settle 1–2 business days later in your registered bank account.",
    },
    {
      q: "What is the Mesita fee?",
      a: "Mesita charges $20 MXN per coupon redeemed — you only pay for guests who actually show up. No setup fees, no monthly fees, no minimums.",
    },
    {
      q: "Can a guest abuse cashback?",
      a: "No — cashback is always capped at $1,000 MXN per visit, and validators approve each redemption from WhatsApp.",
    },
    {
      q: "How do I add another unit?",
      a: "Open the unit switcher in the sidebar and tap “Add new unit”. Each unit has its own promos, team, and wallet.",
    },
    {
      q: "Who can change cashback %?",
      a: "Only members with the Owner or Manager role. Marketing role is read-only on Wallet.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-5 p-6">
      {/* Profile header */}
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-gradient-to-br from-peacock/15 to-secondary/10 p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-peacock to-secondary text-lg font-bold text-primary-foreground shadow-glow">
          DS
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-semibold leading-tight">
            Diego Salas
          </h1>
          <p className="text-xs text-muted-foreground">
            Owner · diego@luminar.mx · Member since Jul 2024
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] text-secondary">
              3 units
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
              Verified
            </span>
          </div>
        </div>
        <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
          Edit profile
        </button>
      </div>

      <div>
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Settings
        </h2>
        <p className="text-xs text-muted-foreground">
          Preferences, billing, notifications, and help.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Account */}
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <Lock className="h-3 w-3" /> Account
          </p>
          <SettingRow label="Email" value="diego@luminar.mx" />
          <SettingRow label="Phone" value="+52 55 1840 2210" />
          <SettingRow label="Password" value="Change" action />
          <SettingRow label="Two-factor auth" value="On" />
        </div>

        {/* Preferences */}
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <Globe className="h-3 w-3" /> Preferences
          </p>
          <div className="mb-3">
            <p className="mb-1 text-[10px] text-muted-foreground">Language</p>
            <div className="flex gap-1">
              {["EN", "ES", "PT"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-md border px-2 py-1 text-[10px] font-semibold ${
                    lang === l
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-1 text-[10px] text-muted-foreground">Currency</p>
            <div className="flex gap-1">
              {["MXN", "USD", "EUR"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`flex-1 rounded-md border px-2 py-1 text-[10px] font-semibold ${
                    currency === c
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <SettingRow label="Time zone" value="GMT-6 · CDMX" />
          <SettingRow label="Theme" value="System" />
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-card-soft p-4">
          <p className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <Bell className="h-3 w-3" /> Notifications
          </p>
          {[
            { k: "redeems", l: "New redemptions" },
            { k: "payouts", l: "Payouts & invoices" },
            { k: "weekly", l: "Weekly performance digest" },
            { k: "marketing", l: "Mesita product updates" },
          ].map((n) => (
            <div
              key={n.k}
              className="flex items-center justify-between border-b border-border/40 py-2 text-xs last:border-0"
            >
              <span>{n.l}</span>
              <button
                onClick={() =>
                  setNotifs((s) => ({ ...s, [n.k]: !s[n.k as keyof typeof s] }))
                }
                className={`flex h-5 w-9 items-center rounded-full px-0.5 ${
                  notifs[n.k as keyof typeof notifs]
                    ? "bg-secondary"
                    : "bg-muted"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition ${
                    notifs[n.k as keyof typeof notifs] ? "ml-auto" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Help & FAQ */}
      <div className="rounded-xl border border-border bg-card-soft p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <LifeBuoy className="h-3 w-3" /> Help & FAQ
          </p>
          <div className="flex gap-2">
            <button className="rounded-md border border-border px-2 py-1 text-[10px]">
              <MessageCircle className="mr-1 inline h-3 w-3" /> Chat with us
            </button>
            <button className="rounded-md border border-border px-2 py-1 text-[10px]">
              <FileText className="mr-1 inline h-3 w-3" /> Docs
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium"
              >
                {f.q}
                <ChevronRight
                  className={`h-3.5 w-3.5 text-muted-foreground transition ${
                    open === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="border-t border-border/40 px-3 py-2 text-[11px] text-muted-foreground">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="flex items-center gap-2 rounded-lg border border-border bg-card-soft px-3 py-2 text-xs text-rose-400">
        <LogOut className="h-3.5 w-3.5" /> Sign out
      </button>
    </div>
  );
}

function SettingRow({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 py-2 text-xs last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={action ? "text-secondary" : "font-medium"}
      >
        {value}
      </span>
    </div>
  );
}
