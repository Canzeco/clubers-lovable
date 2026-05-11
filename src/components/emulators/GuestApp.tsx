import { useRef, useState } from "react";
import {
  Compass,
  Map as MapIcon,
  LayoutGrid,
  Flame,
  Ticket,
  User,
  X,
  Star,
  Sparkles,
  Instagram,
  MapPin,
  Calendar,
  Check,
  Clock,
  Bookmark,
} from "lucide-react";

type Tab = "discover" | "wallet" | "profile";
type DiscoverMode = "catalog" | "map" | "tinder";

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
    fb: 4.7,
    fbCount: 312,
    fbFollowers: "48k",
    igFollowers: "126k",
    igMentions: "3.2k",
    mesita: 4.9,
    mesitaCount: 84,
    ig: "3.2k mentions",
    quote: "“Best sunset terrace in the city.”",
    visitors: [
      { name: "Valentina R.", handle: "@valenrose", tier: "gold", note: "visited Sat", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80" },
      { name: "Lucas M.", handle: "@lucasm", tier: "gold", note: "posted a story", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80" },
      { name: "Sofía P.", handle: "@sofip", tier: "silver", note: "rated 5★", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
      { name: "Diego A.", handle: "@diegoa", tier: "bronze", note: "tagged 2 friends", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" },
    ],
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
    fb: 4.5,
    fbCount: 198,
    fbFollowers: "22k",
    igFollowers: "89k",
    igMentions: "1.8k",
    mesita: 4.8,
    mesitaCount: 62,
    ig: "1.8k mentions",
    quote: "“The mezcal flight is unreal.”",
    visitors: [
      { name: "Camila V.", handle: "@camivb", tier: "gold", note: "5 Gold guests tonight", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80" },
      { name: "Mateo F.", handle: "@matef", tier: "gold", note: "DJ set tagged", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&q=80" },
      { name: "Renata K.", handle: "@renatak", tier: "silver", note: "ordered the flight", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80" },
    ],
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
    fb: 4.3,
    fbCount: 540,
    fbFollowers: "61k",
    igFollowers: "210k",
    igMentions: "920",
    mesita: 4.6,
    mesitaCount: 41,
    ig: "920 mentions",
    quote: "“Brunch with ocean breeze.”",
    visitors: [
      { name: "Ana T.", handle: "@anat", tier: "gold", note: "brunch yesterday", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80" },
      { name: "Tomás L.", handle: "@tomasl", tier: "silver", note: "tagged ocean view", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" },
    ],
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

function ModeSwitcher({
  mode,
  setMode,
}: {
  mode: DiscoverMode;
  setMode: (m: DiscoverMode) => void;
}) {
  const modes: { id: DiscoverMode; label: string; Icon: any }[] = [
    { id: "catalog", label: "Catalog", Icon: LayoutGrid },
    { id: "map", label: "Map", Icon: MapIcon },
    { id: "tinder", label: "Swipe", Icon: Flame },
  ];
  return (
    <div className="mx-5 mb-3 flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition ${
            mode === m.id
              ? "bg-foreground text-background"
              : "text-muted-foreground"
          }`}
        >
          <m.Icon className="h-3.5 w-3.5" />
          {m.label}
        </button>
      ))}
    </div>
  );
}

function VenueDetailSheet({
  venue,
  onClose,
}: {
  venue: typeof venues[number];
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[88%] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-card pb-8 shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
          <img src={venue.img} alt={venue.name} className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85))" }}
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
          >
            <X className="h-4 w-4" />
          </button>
          {venue.affiliated && (
            <span className="absolute left-3 top-3 rounded-full bg-tier-gold px-2.5 py-1 text-[11px] font-bold text-black">
              {venue.cashback}% CASHBACK
            </span>
          )}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="text-[10px] uppercase tracking-widest opacity-80">{venue.type}</p>
            <p className="font-display text-2xl font-semibold leading-tight">{venue.name}</p>
            <p className="mt-0.5 flex items-center gap-2 text-[11px] opacity-90">
              <MapPin className="h-3 w-3" /> {venue.distance} · {venue.price}
            </p>
          </div>
        </div>

        <div className="space-y-4 px-5 pt-5">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-card-soft p-3 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Mesita</p>
              <p className="mt-1 flex items-center justify-center gap-1 font-display text-lg font-semibold">
                <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                {venue.mesita}
              </p>
              <p className="text-[10px] text-muted-foreground">{venue.mesitaCount} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-3 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Facebook</p>
              <p className="mt-1 flex items-center justify-center gap-1 font-display text-lg font-semibold">
                <Star className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
                {venue.fb}
              </p>
              <p className="text-[10px] text-muted-foreground">{venue.fbCount} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-3 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Instagram</p>
              <p className="mt-1 flex items-center justify-center gap-1 font-display text-sm font-semibold">
                <Instagram className="h-3.5 w-3.5 text-pink-400" />
              </p>
              <p className="text-[10px] text-muted-foreground">{venue.ig}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card-soft p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Mesita verified review
            </p>
            <p className="mt-1 text-sm italic text-foreground/90">{venue.quote}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">— @valenrose · Gold guest</p>
          </div>

          <div className="rounded-2xl border border-border bg-card-soft p-3">
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3 w-3 text-secondary" /> Tonight
            </p>
            <p className="mt-1 text-sm text-secondary">{venue.vibe}</p>
          </div>

          <div className="flex gap-2 pt-1">
            <button className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground">
              Save coupon
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
              <Calendar className="h-4 w-4" /> Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogMode({ onSelect }: { onSelect: (v: typeof venues[number]) => void }) {
  return (
    <div className="pb-6">
      {/* filter chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-3">
        {["All", "Tonight", "Cashback", "Rooftop", "Brunch", "Late night"].map(
          (c, i) => (
            <button
              key={c}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium ${
                i === 0
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ),
        )}
      </div>

      {/* venue cards — minimal, click for details */}
      <div className="flex flex-col gap-3 px-3">
        {[...venues, ...venues].map((v, idx) => (
          <button
            key={v.name + idx}
            onClick={() => onSelect(v)}
            className="flex w-full overflow-hidden rounded-2xl border border-border bg-card-soft text-left transition active:scale-[0.99]"
            style={{ aspectRatio: "5 / 2" }}
          >
            {/* image 3:2 */}
            <div className="relative h-full flex-shrink-0" style={{ aspectRatio: "3 / 2" }}>
              <img src={v.img} alt={v.name} className="h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.75))" }}
              />
              {v.affiliated && (
                <span className="absolute left-2 top-2 rounded-full bg-tier-gold px-2 py-0.5 text-[10px] font-bold text-black">
                  {v.cashback}%
                </span>
              )}
              <div className="absolute bottom-1.5 left-2 right-2 text-white">
                <p className="truncate font-display text-base font-semibold leading-tight">
                  {v.name}
                </p>
                <p className="truncate text-[10px] opacity-80">
                  {v.distance} · {v.price}
                </p>
              </div>
            </div>

            {/* essential info only */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-3 py-2">
              <p className="truncate text-[9px] uppercase tracking-widest text-muted-foreground">
                {v.type}
              </p>
              <div className="flex items-center gap-1.5">
                <Star className="h-3 w-3 fill-secondary text-secondary" />
                <span className="text-sm font-semibold">{v.mesita}</span>
                <span className="text-[10px] text-muted-foreground">Mesita</span>
              </div>
              <p className="flex items-center gap-1 truncate text-[10px] text-secondary">
                <Sparkles className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="truncate">{v.vibe.split("·")[0].trim()}</span>
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TinderMode() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const [saved, setSaved] = useState<typeof venues[number] | null>(null);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const startRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const v = venues[idx % venues.length];
  const next = venues[(idx + 1) % venues.length];

  const fly = (d: "l" | "r") => {
    const current = v;
    setDir(d);
    setDrag(null);
    startRef.current = null;
    setTimeout(() => {
      setIdx((i) => i + 1);
      setDir(null);
      if (d === "r") setSaved(current);
    }, 260);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (dir) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    setDrag({ x: 0, y: 0 });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    setDrag({
      x: e.clientX - startRef.current.x,
      y: e.clientY - startRef.current.y,
    });
  };
  const onPointerUp = () => {
    if (!startRef.current || !drag) {
      startRef.current = null;
      setDrag(null);
      return;
    }
    const threshold = 90;
    if (drag.x > threshold) fly("r");
    else if (drag.x < -threshold) fly("l");
    else {
      setDrag(null);
      startRef.current = null;
    }
  };

  const dx = drag?.x ?? 0;
  const dy = drag?.y ?? 0;
  const rot = dx / 14;
  const likeOp = Math.min(1, Math.max(0, dx / 100));
  const nopeOp = Math.min(1, Math.max(0, -dx / 100));

  const flying =
    dir === "l"
      ? "translate(-120%, 0) rotate(-18deg)"
      : dir === "r"
      ? "translate(120%, 0) rotate(18deg)"
      : null;

  return (
    <div className="relative flex-1">
      <div className="relative mx-5 h-[480px] select-none">
        {/* next card peek */}
        <div className="absolute inset-0 scale-[0.96] overflow-hidden rounded-3xl opacity-70">
          <img src={next.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div
          key={idx}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`absolute inset-0 overflow-hidden rounded-3xl shadow-glow touch-none ${
            drag ? "" : "transition-transform duration-300"
          }`}
          style={{
            transform:
              flying ?? `translate(${dx}px, ${dy * 0.3}px) rotate(${rot}deg)`,
            opacity: dir ? 0 : 1,
            cursor: drag ? "grabbing" : "grab",
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
          {/* swipe indicators */}
          <div
            className="pointer-events-none absolute left-5 top-5 rotate-[-12deg] rounded-md border-2 border-secondary px-3 py-1 text-sm font-bold uppercase tracking-widest text-secondary"
            style={{ opacity: likeOp }}
          >
            Save
          </div>
          <div
            className="pointer-events-none absolute right-5 top-5 rotate-[12deg] rounded-md border-2 border-destructive px-3 py-1 text-sm font-bold uppercase tracking-widest text-destructive"
            style={{ opacity: nopeOp }}
          >
            Nope
          </div>
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
      <div className="mt-5 flex items-center justify-center gap-4 px-5">
        <button
          onClick={() => fly("l")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:scale-[1.02]"
        >
          <X className="h-4 w-4" /> Nope
        </button>
        <button
          onClick={() => fly("r")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
        >
          <Bookmark className="h-4 w-4 fill-current" /> Save coupon
        </button>
      </div>

      {saved && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSaved(null)}
        >
          <div
            className="w-full rounded-t-3xl border-t border-border bg-card p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tier-gold text-sm font-bold text-black">
                {saved.cashback}%
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-secondary">
                  Coupon saved
                </p>
                <p className="font-display text-lg font-semibold leading-tight">
                  {saved.name}
                </p>
              </div>
              <Check className="h-5 w-5 text-secondary" />
            </div>
            <p className="mt-4 text-sm text-foreground">
              Want to make a reservation now?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Lock a table tonight and your cashback activates automatically.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSaved(null)}
                className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground"
              >
                Not now
              </button>
              <button
                onClick={() => setSaved(null)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <Calendar className="h-4 w-4" /> Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MapMode() {
  return (
    <div
      className="relative mx-5 h-[560px] overflow-hidden rounded-3xl"
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
  );
}

function Discover() {
  const [mode, setMode] = useState<DiscoverMode>("catalog");
  const [selected, setSelected] = useState<typeof venues[number] | null>(null);
  const sub =
    mode === "catalog"
      ? "Curated for tonight"
      : mode === "map"
      ? "3 affiliated · 12 nearby"
      : "Swipe to decide";
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <TopBar title="Discover" subtitle={sub} />
      <ModeSwitcher mode={mode} setMode={setMode} />
      {mode === "catalog" && (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <CatalogMode onSelect={setSelected} />
        </div>
      )}
      {mode === "map" && <MapMode />}
      {mode === "tinder" && <TinderMode />}
      {selected && (
        <VenueDetailSheet venue={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function WalletView() {
  const [seg, setSeg] = useState<"unused" | "used">("unused");
  const unused = [
    { name: "Casa Luminar", cb: 18, exp: "Tonight · 11pm", color: "tier-gold", note: "Rooftop · 0.4 km" },
    { name: "Loto Café", cb: 12, exp: "Expires tomorrow", color: "tier-silver", note: "Brunch · weekends" },
    { name: "Neón Bar", cb: 25, exp: "+ Story bonus 10%", color: "tier-bronze", note: "Late night cocktails" },
  ];
  const used = [
    { name: "Mar Verde", cb: 15, when: "Sat · May 3", saved: "$ 320", color: "tier-gold" },
    { name: "Loto Café", cb: 12, when: "Apr 27", saved: "$ 180", color: "tier-silver" },
    { name: "Casa Luminar", cb: 18, when: "Apr 19", saved: "$ 540", color: "tier-gold" },
    { name: "Neón Bar", cb: 20, when: "Apr 12", saved: "$ 260", color: "tier-bronze" },
  ];
  return (
    <>
      <TopBar title="Coupon Wallet" subtitle={`${unused.length} unused · ${used.length} used`} />
      <div className="mx-5 mb-4 rounded-2xl bg-peacock p-4 text-primary-foreground shadow-glow">
        <p className="text-xs uppercase tracking-widest opacity-80">Total saved</p>
        <p className="font-display text-4xl font-semibold">$ 1,840</p>
        <p className="mt-1 text-xs opacity-80">12 visits · this month</p>
      </div>

      {/* segmented control */}
      <div className="mx-5 mb-3 flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
        {([
          { id: "unused", label: "Unused", count: unused.length, Icon: Clock },
          { id: "used", label: "Used", count: used.length, Icon: Check },
        ] as const).map((s) => (
          <button
            key={s.id}
            onClick={() => setSeg(s.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition ${
              seg === s.id ? "bg-foreground text-background" : "text-muted-foreground"
            }`}
          >
            <s.Icon className="h-3.5 w-3.5" />
            {s.label}
            <span className={`rounded-full px-1.5 text-[10px] ${seg === s.id ? "bg-background/20" : "bg-muted"}`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>

      {seg === "unused" ? (
        <div className="space-y-3 px-5 pb-24">
          {unused.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card-soft p-3"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${c.color === "tier-gold" ? "bg-tier-gold" : c.color === "tier-silver" ? "bg-tier-silver" : "bg-tier-bronze"} text-sm font-bold text-black`}>
                {c.cb}%
              </div>
              <div className="flex-1">
                <p className="font-medium">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.note}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-secondary">
                  <Clock className="h-3 w-3" /> {c.exp}
                </p>
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
      ) : (
        <div className="space-y-3 px-5 pb-24">
          {used.map((c) => (
            <div
              key={c.name + c.when}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 opacity-80"
            >
              <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl ${c.color === "tier-gold" ? "bg-tier-gold" : c.color === "tier-silver" ? "bg-tier-silver" : "bg-tier-bronze"} text-sm font-bold text-black grayscale`}>
                {c.cb}%
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium line-through decoration-muted-foreground/50">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">Redeemed · {c.when}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Saved</p>
                <p className="font-display text-sm font-semibold text-secondary">{c.saved}</p>
              </div>
            </div>
          ))}
        </div>
      )}
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
      <div className="relative flex flex-1 flex-col overflow-hidden pb-20">
        {tab === "discover" && <Discover />}
        {tab === "wallet" && (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <WalletView />
          </div>
        )}
        {tab === "profile" && (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <ProfileView />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card/95 px-4 py-2 backdrop-blur">
        <div className="flex justify-around">
          {[
            { id: "discover", Icon: Compass, label: "Discover" },
          { id: "wallet", Icon: Ticket, label: "Coupons" },
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