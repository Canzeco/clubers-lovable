import { useState } from "react";
import {
  Compass,
  Map as MapIcon,
  Wallet,
  User,
  Heart,
  X,
  Star,
  Sparkles,
  Instagram,
  MapPin,
  Calendar,
} from "lucide-react";

type Tab = "discover" | "map" | "wallet" | "profile";

const venues = [
  {
    name: "Casa Luminar",
    type: "Rooftop · Mediterranean",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    cashback: 18,
    price: "$$$",
    rating: 4.8,
    distance: "0.4 km",
    vibe: "Golden hour terrace · live DJ",
    affiliated: true,
  },
  {
    name: "Neón Bar",
    type: "Cocktails · Late night",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    cashback: 25,
    price: "$$",
    rating: 4.6,
    distance: "0.9 km",
    vibe: "Speakeasy · 5 Gold guests tonight",
    affiliated: true,
  },
  {
    name: "Mar Verde",
    type: "Seafood · Brunch",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    cashback: 0,
    price: "$$",
    rating: 4.4,
    distance: "1.2 km",
    vibe: "Reserve via Mesita · no cashback",
    affiliated: false,
  },
];

function StatusBar() {
  return (
    <div className="flex h-9 items-end justify-between px-7 pb-1 pt-2 text-[11px] font-semibold text-foreground">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span>●●●●</span>
        <span>100%</span>
      </span>
    </div>
  );
}

function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-5 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold leading-none">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tier-gold text-[10px] font-bold text-black">
          GOLD
        </div>
      </div>
    </div>
  );
}

function Discover() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const v = venues[idx % venues.length];

  const swipe = (d: "l" | "r") => {
    setDir(d);
    setTimeout(() => {
      setIdx((i) => i + 1);
      setDir(null);
    }, 220);
  };

  return (
    <>
      <TopBar title="Tonight" subtitle="Swipe to discover" />
      <div className="relative mx-5 h-[480px]">
        <div
          key={idx}
          className="absolute inset-0 overflow-hidden rounded-3xl shadow-glow transition-all duration-200"
          style={{
            transform:
              dir === "l"
                ? "translateX(-120%) rotate(-12deg)"
                : dir === "r"
                ? "translateX(120%) rotate(12deg)"
                : "none",
            opacity: dir ? 0 : 1,
          }}
        >
          <img src={v.img} alt={v.name} className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.85))",
            }}
          />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            {v.affiliated ? (
              <span className="rounded-full bg-tier-gold px-3 py-1 text-[11px] font-bold text-black">
                {v.cashback}% CASHBACK
              </span>
            ) : (
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                Discovery · Reserve only
              </span>
            )}
            <span className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              {v.rating}
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs uppercase tracking-widest opacity-80">{v.type}</p>
            <h3 className="font-display text-3xl font-semibold leading-tight">
              {v.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs opacity-90">
              <MapPin className="h-3 w-3" /> {v.distance} · {v.price}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-secondary">
              <Sparkles className="h-3 w-3" /> {v.vibe}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-6">
        <button
          onClick={() => swipe("l")}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-destructive transition hover:scale-105"
        >
          <X className="h-6 w-6" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-secondary">
          <Calendar className="h-5 w-5" />
        </button>
        <button
          onClick={() => swipe("r")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-peacock text-white shadow-glow transition hover:scale-105"
        >
          <Heart className="h-6 w-6 fill-current" />
        </button>
      </div>
    </>
  );
}

function MapView() {
  return (
    <>
      <TopBar title="Near you" subtitle="3 affiliated · 12 nearby" />
      <div
        className="relative mx-5 h-[520px] overflow-hidden rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, oklch(0.30 0.05 200), oklch(0.16 0.02 220))",
        }}
      >
        {/* grid lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1="0" y1={i * 52} x2="100%" y2={i * 52} stroke="oklch(0.55 0.1 195)" strokeWidth="0.5" />
              <line x1={i * 36} y1="0" x2={i * 36} y2="100%" stroke="oklch(0.55 0.1 195)" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
        {/* pins */}
        {[
          { x: "25%", y: "30%", tier: "gold", n: "Casa Luminar", cb: 18 },
          { x: "60%", y: "45%", tier: "silver", n: "Neón Bar", cb: 25 },
          { x: "40%", y: "65%", tier: "bronze", n: "Mar Verde", cb: 0 },
          { x: "75%", y: "75%", tier: "gold", n: "Loto Café", cb: 12 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: p.x, top: p.y }}
          >
            <div
              className={`relative flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold text-black shadow-glow ${
                p.tier === "gold"
                  ? "bg-tier-gold"
                  : p.tier === "silver"
                  ? "bg-tier-silver"
                  : "bg-tier-bronze"
              }`}
            >
              {p.cb > 0 ? `${p.cb}%` : "·"}
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-inherit" />
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-card/90 p-3 backdrop-blur">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Hottest right now
          </p>
          <p className="font-display text-lg font-semibold">Neón Bar</p>
          <p className="text-xs text-muted-foreground">
            5 Gold guests · 3 stories tagged in last hour
          </p>
        </div>
      </div>
    </>
  );
}

function WalletView() {
  const coupons = [
    { name: "Casa Luminar", cb: 18, exp: "Tonight · 11pm", color: "tier-gold" },
    { name: "Loto Café", cb: 12, exp: "Tomorrow", color: "tier-silver" },
    { name: "Neón Bar", cb: 25, exp: "+ Story bonus 10%", color: "tier-bronze" },
  ];
  return (
    <>
      <TopBar title="Wallet" subtitle="3 active coupons" />
      <div className="mx-5 mb-4 rounded-2xl bg-peacock p-4 text-primary-foreground shadow-glow">
        <p className="text-xs uppercase tracking-widest opacity-80">Total saved</p>
        <p className="font-display text-4xl font-semibold">$ 1,840</p>
        <p className="mt-1 text-xs opacity-80">12 visits · this month</p>
      </div>
      <div className="space-y-3 px-5 pb-24">
        {coupons.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card-soft p-3"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${c.color === "tier-gold" ? "bg-tier-gold" : c.color === "tier-silver" ? "bg-tier-silver" : "bg-tier-bronze"} text-sm font-bold text-black`}>
              {c.cb}%
            </div>
            <div className="flex-1">
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.exp}</p>
            </div>
            <button className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
              QR
            </button>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
          <Instagram className="mx-auto mb-1 h-4 w-4" />
          Post a story tagging the venue to unlock +10% extra cashback
        </div>
      </div>
    </>
  );
}

function ProfileView() {
  return (
    <>
      <TopBar title="Profile" />
      <div className="px-5">
        <div className="rounded-3xl bg-card-soft p-5 text-center">
          <div className="mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-secondary">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 font-display text-xl font-semibold">Valentina R.</p>
          <p className="text-xs text-muted-foreground">@valenrose · CDMX</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-tier-gold px-4 py-1.5 text-xs font-bold text-black">
            <Sparkles className="h-3 w-3" /> GOLD TIER
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { k: "Visits", v: "47" },
            { k: "Stories", v: "23" },
            { k: "Saved", v: "$1.8k" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-card p-3">
              <p className="font-display text-xl font-semibold">{s.v}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.k}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Streak
          </p>
          <p className="mt-1 font-display text-lg">5 weekends out · keep going 🔥</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${i <= 5 ? "bg-secondary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function GuestApp() {
  const [tab, setTab] = useState<Tab>("discover");
  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <StatusBar />
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {tab === "discover" && <Discover />}
        {tab === "map" && <MapView />}
        {tab === "wallet" && <WalletView />}
        {tab === "profile" && <ProfileView />}
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card/95 px-4 py-2 backdrop-blur">
        <div className="flex justify-around">
          {[
            { id: "discover", Icon: Compass, label: "Discover" },
            { id: "map", Icon: MapIcon, label: "Map" },
            { id: "wallet", Icon: Wallet, label: "Wallet" },
            { id: "profile", Icon: User, label: "Profile" },
          ].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as Tab)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] transition ${
                tab === id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-1 h-1 w-32 rounded-full bg-foreground/40" />
      </div>
    </div>
  );
}