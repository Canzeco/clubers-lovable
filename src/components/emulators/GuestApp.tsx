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
  TrendingUp,
  Users,
  BadgeCheck,
  Crown,
  Eye,
  Phone,
  MessageCircle,
  QrCode,
  Navigation,
  Search,
  Locate,
  Wallet,
  CreditCard,
  Banknote,
  ChevronRight,
  Camera,
  Send,
  Loader2,
  Coins,
  Share2,
  Gift,
  Copy,
} from "lucide-react";

type Tab = "discover" | "coupons" | "share" | "profile";
type DiscoverMode = "catalog" | "map" | "tinder" | "ai";

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C40.5 36.4 44 30.7 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

function FacebookLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1877F2"/>
      <path fill="#fff" d="M15.3 12.5h-2.4V21h-3.4v-8.5H7.7V9.7h1.8V7.9c0-2 1-3.4 3.4-3.4h2v2.8h-1.3c-.8 0-.9.3-.9.9v1.5h2.2l-.6 2.8z"/>
    </svg>
  );
}

function InstagramLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="0.3" cy="1.1" r="1.3">
          <stop offset="0" stopColor="#FFD776"/>
          <stop offset="0.25" stopColor="#F58529"/>
          <stop offset="0.5" stopColor="#DD2A7B"/>
          <stop offset="0.75" stopColor="#8134AF"/>
          <stop offset="1" stopColor="#515BD4"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="#fff" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="#fff" strokeWidth="1.8"/>
      <circle cx="17" cy="7" r="1.1" fill="#fff"/>
    </svg>
  );
}


const venues = [
  {
    name: "Casa Luminar",
    type: "Rooftop · Mediterranean",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    cashback: 20,
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
    google: 4.7,
    googleCount: 1284,
    info: "Rooftop restaurant on 14th floor. Mediterranean tasting menu by chef Iván Solís. Open 7pm–1am · live DJ Thu–Sat · reservations recommended.",
    mesita: 4.9,
    mesitaCount: 84,
    ig: "3.2k mentions",
    quote: "“Best sunset terrace in the city.”",
    visitors: [
      { name: "Valentina R.", handle: "@valenrose", tier: "gold", score: 5.0, when: "Sat", comment: "Best sunset terrace in the city.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80" },
      { name: "Lucas M.", handle: "@lucasm", tier: "gold", score: 4.8, when: "Fri", comment: "The DJ set elevated everything.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80" },
      { name: "Sofía P.", handle: "@sofip", tier: "silver", score: 5.0, when: "Last week", comment: "Service was flawless.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
      { name: "Diego A.", handle: "@diegoa", tier: "bronze", score: 4.5, when: "2 weeks ago", comment: "Worth the price tag.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" },
    ],
  },
  {
    name: "Neón Bar",
    type: "Cocktails · Late night",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    cashback: 20,
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
    google: 4.4,
    googleCount: 642,
    info: "Speakeasy-style cocktail bar hidden behind a record store. Mezcal flights, vinyl DJ sets, 25 seats. Open 9pm–3am Wed–Sun.",
    mesita: 4.8,
    mesitaCount: 62,
    ig: "1.8k mentions",
    quote: "“The mezcal flight is unreal.”",
    visitors: [
      { name: "Camila V.", handle: "@camivb", tier: "gold", score: 5.0, when: "Wed", comment: "Mezcal flight is unreal.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80" },
      { name: "Mateo F.", handle: "@matef", tier: "gold", score: 4.7, when: "Last Sat", comment: "Best vinyl set in town.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&q=80" },
      { name: "Renata K.", handle: "@renatak", tier: "silver", score: 4.5, when: "Last week", comment: "Hidden gem, intimate vibe.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80" },
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
    google: 4.5,
    googleCount: 980,
    info: "Oceanfront seafood & brunch. Sustainable sourcing, weekend brunch with live acoustic sets. Open 9am–5pm.",
    mesita: 4.6,
    mesitaCount: 41,
    ig: "920 mentions",
    quote: "“Brunch with ocean breeze.”",
    visitors: [
      { name: "Ana T.", handle: "@anat", tier: "gold", score: 4.8, when: "Yesterday", comment: "Brunch with ocean breeze, dreamy.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80" },
      { name: "Tomás L.", handle: "@tomasl", tier: "silver", score: 4.6, when: "Last Sun", comment: "Seafood was incredibly fresh.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" },
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
    { id: "tinder", label: "Swipe", Icon: Flame },
    { id: "map", label: "Map", Icon: MapIcon },
    { id: "catalog", label: "Catalog", Icon: LayoutGrid },
    { id: "ai", label: "AI Search", Icon: Sparkles },
  ];
  return (
    <div className="mx-3 mb-3 grid grid-cols-4 items-center gap-1 rounded-full border border-border bg-card/60 p-1">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`flex w-full items-center justify-center gap-1 rounded-full py-1.5 text-[11px] font-medium transition ${
            mode === m.id
              ? "bg-foreground text-background"
              : "text-muted-foreground"
          }`}
        >
          <m.Icon className="h-3.5 w-3.5 shrink-0" />
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
        className="relative flex max-h-[88%] w-full flex-col rounded-t-3xl border-t border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 overflow-y-auto scrollbar-hide pb-24">
        <div className="relative px-5 pt-5">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card-soft text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{venue.type}</p>
            {venue.affiliated && (
              <span className="rounded-full bg-tier-gold px-2 py-0.5 text-[9px] font-bold text-black">
                {venue.cashback}% CASHBACK
              </span>
            )}
          </div>
          <p className="mt-1 font-display text-2xl font-semibold leading-tight">{venue.name}</p>
          <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {venue.distance} · {venue.price}
          </p>
        </div>

        <div className="space-y-4 px-5 pt-5">
          {/* Instagram-style 4:3 carousel with dots */}
          <PhotoCarousel />

          {/* Four scores */}
          <div className="grid grid-cols-4 gap-1.5">
            <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-2.5">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-secondary">
                <Sparkles className="h-2.5 w-2.5" /> Mesita
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none text-secondary">
                {venue.mesita}
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.mesitaCount} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2.5">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <GoogleLogo className="h-3 w-3" /> Google
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.google}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.googleCount.toLocaleString()} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2.5">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <FacebookLogo className="h-3 w-3" /> Facebook
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.fb}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.fbCount} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2.5">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <InstagramLogo className="h-3 w-3" /> Instagram
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.igFollowers}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.igMentions} mentions</p>
            </div>
          </div>

          {/* About the venue */}
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              About
            </p>
            <p className="text-sm leading-relaxed text-foreground/85">{venue.info}</p>
          </div>

          {/* Location mini-map */}
          <div>
            <p className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Location</span>
              <span className="flex items-center gap-1 text-secondary">
                <MapPin className="h-3 w-3" /> {venue.distance}
              </span>
            </p>
            <div className="relative h-36 overflow-hidden rounded-2xl border border-border bg-card-soft">
              <svg viewBox="0 0 320 144" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="mapgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M24 0H0V24" fill="none" stroke="oklch(0.55 0.18 280 / 0.18)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="320" height="144" fill="url(#mapgrid)" />
                <path d="M-10 40 Q90 30 180 70 T340 90" fill="none" stroke="oklch(0.78 0.16 85 / 0.45)" strokeWidth="6" strokeLinecap="round" />
                <path d="M40 -10 Q60 60 120 90 T220 160" fill="none" stroke="oklch(0.55 0.18 280 / 0.35)" strokeWidth="3" strokeLinecap="round" />
                <path d="M0 110 H320" stroke="oklch(0.55 0.18 280 / 0.25)" strokeWidth="2" />
                <circle cx="80" cy="50" r="14" fill="oklch(0.78 0.16 85 / 0.18)" />
                <circle cx="240" cy="100" r="20" fill="oklch(0.55 0.18 280 / 0.18)" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center gap-1 rounded-full bg-foreground px-2 py-1 text-[10px] font-semibold text-background shadow-lg">
                    <MapPin className="h-3 w-3 text-tier-gold" /> {venue.name}
                  </div>
                  <div className="h-2 w-2 -mt-0.5 rotate-45 bg-foreground" />
                  <div className="mt-1 h-3 w-3 rounded-full bg-tier-gold ring-4 ring-tier-gold/30" />
                </div>
              </div>
              <button className="absolute bottom-2 right-2 rounded-full bg-card/95 px-3 py-1 text-[10px] font-medium text-foreground shadow backdrop-blur">
                Open in Maps
              </button>
            </div>
          </div>

          {/* Mesita Visitors — sorted by relevance (recency × tier × influence) */}
          <div>
            <p className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Mesita Visitors</span>
              <span className="flex items-center gap-1 text-secondary">
                <Flame className="h-3 w-3" /> Top 10
              </span>
            </p>
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => {
                const u = venue.visitors[i % venue.visitors.length];
                const ig = `${(126 - i * 9).toString()}.${(i * 3) % 10}k`;
                return (
                  <div
                    key={"mv" + i}
                    className="rounded-2xl border border-border bg-card-soft p-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <img
                          src={u.img}
                          alt={u.name}
                          className={`h-10 w-10 rounded-full object-cover ring-2 ${
                            u.tier === "gold"
                              ? "ring-tier-gold"
                              : u.tier === "silver"
                              ? "ring-tier-silver"
                              : "ring-tier-bronze"
                          }`}
                        />
                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-px text-[8px] font-bold uppercase text-black ${
                            u.tier === "gold"
                              ? "bg-tier-gold"
                              : u.tier === "silver"
                              ? "bg-tier-silver"
                              : "bg-tier-bronze"
                          }`}
                        >
                          {u.tier}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-tight">{u.name}</p>
                        <p className="flex items-center gap-1.5 truncate text-[10px] text-muted-foreground">
                          <span>{u.handle}</span>
                          <span className="flex items-center gap-0.5 text-pink-400">
                            <Instagram className="h-2.5 w-2.5" />
                            {ig}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1">
                        <Star className="h-3 w-3 fill-secondary text-secondary" />
                        <span className="font-display text-sm font-semibold text-secondary">
                          {u.score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-[12px] italic leading-snug text-foreground/85">
                      “{u.comment}”
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4">
          <div className="pointer-events-auto flex w-full items-center gap-2 rounded-full border border-border/60 bg-card/85 p-1.5 shadow-2xl backdrop-blur-xl">
            <button className="flex-1 rounded-full px-4 py-2.5 text-sm font-medium text-foreground/80">
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
            className="relative flex w-full overflow-hidden rounded-2xl border border-border bg-card-soft text-left shadow-sm transition active:scale-[0.99]"
            style={{ aspectRatio: "2 / 1" }}
          >
            {/* info — left */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
              <p className="truncate font-display text-base font-semibold leading-tight">
                {v.name}
              </p>
              <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                {v.type}
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                {v.distance} · <span className="text-foreground">{v.price}</span>
              </p>
              <div className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-secondary text-secondary" />
                  <span className="font-semibold text-foreground">{v.mesita}</span> Mesita
                </span>
                <span className="text-border">·</span>
                <span>
                  <span className="font-semibold text-foreground">{v.google}</span> Google
                </span>
              </div>
              {v.affiliated && (
                <span className="mt-1 w-fit rounded-full bg-tier-gold px-1.5 py-0.5 text-[9px] font-bold text-black">
                  {v.cashback}% cashback
                </span>
              )}
            </div>

            {/* image — right, clean */}
            <div className="relative h-full flex-shrink-0" style={{ aspectRatio: "1 / 1" }}>
              <img src={v.img} alt={v.name} className="h-full w-full object-cover" />
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
  const [step, setStep] = useState<"ask" | "pick" | "done">("ask");
  const [pickedDay, setPickedDay] = useState<number>(0);
  const [pickedTime, setPickedTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState<number>(2);
  const [prefs, setPrefs] = useState<string[]>([]);
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
      <div className="relative mx-5 h-[420px] select-none">
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
            Yes
          </div>
          <div
            className="pointer-events-none absolute right-5 top-5 rotate-[12deg] rounded-md border-2 border-destructive px-3 py-1 text-sm font-bold uppercase tracking-widest text-destructive"
            style={{ opacity: nopeOp }}
          >
            No
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
          <X className="h-4 w-4" /> No
        </button>
        <button
          onClick={() => fly("r")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
        >
          <Check className="h-4 w-4" /> Yes
        </button>
      </div>

      {saved && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => { setSaved(null); setStep("ask"); setPickedTime(null); setPickedDay(0); setPartySize(2); setPrefs([]); }}
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
                  Nice pick · coupon saved
                </p>
                <p className="font-display text-lg font-semibold leading-tight">
                  {saved.name}
                </p>
              </div>
              <Check className="h-5 w-5 text-secondary" />
            </div>
            {step === "ask" && (
              <>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  Want to make a reservation?
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your cashback activates automatically when you sit down.
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Covers up to <span className="font-semibold text-foreground">$1,000 MXN</span> per visit — anything over is paid in full.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => { setSaved(null); setStep("ask"); }}
                    className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground"
                  >
                    No, just save
                  </button>
                  <button
                    onClick={() => setStep("pick")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
                  >
                    <Calendar className="h-4 w-4" /> Yes, reserve
                  </button>
                </div>
              </>
            )}

            {step === "pick" && (() => {
              const days = Array.from({ length: 7 }).map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i);
                return {
                  i,
                  label: i === 0 ? "Today" : i === 1 ? "Tmrw" : d.toLocaleDateString(undefined, { weekday: "short" }),
                  date: d.getDate(),
                };
              });
              const slots: string[] = [];
              for (let h = 12; h <= 23; h++) {
                for (const m of [0, 30]) {
                  slots.push(`${h % 12 === 0 ? 12 : h % 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`);
                }
              }
              return (
                <>
                  {/* Right-now CTA */}
                  <button
                    onClick={() => { setPickedTime("Right now"); setStep("done"); }}
                    className="mt-4 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-secondary/30 to-tier-gold/30 p-3 ring-1 ring-tier-gold/40"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-tier-gold" />
                      <div className="text-left">
                        <p className="text-sm font-semibold leading-none">Reserve right now</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">Walk in within 20 min</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-tier-gold px-2.5 py-1 text-[10px] font-bold text-black">GO</span>
                  </button>

                  <p className="mt-4 mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    or pick a day
                  </p>
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {days.map((d) => (
                      <button
                        key={d.i}
                        onClick={() => setPickedDay(d.i)}
                        className={`flex w-14 flex-shrink-0 flex-col items-center rounded-xl border py-2 ${
                          pickedDay === d.i
                            ? "border-secondary bg-secondary/15 text-secondary"
                            : "border-border bg-card-soft text-foreground"
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-widest opacity-80">{d.label}</span>
                        <span className="font-display text-lg font-semibold leading-none">{d.date}</span>
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Time · every 30 min
                  </p>
                  <div className="grid max-h-40 grid-cols-3 gap-1.5 overflow-y-auto scrollbar-hide pr-1">
                    {slots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setPickedTime(t)}
                        className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium ${
                          pickedTime === t
                            ? "border-secondary bg-secondary text-secondary-foreground"
                            : "border-border bg-card-soft text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Party size
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card-soft text-sm font-semibold"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-display text-base font-semibold">
                        {partySize}
                      </span>
                      <button
                        onClick={() => setPartySize(Math.min(12, partySize + 1))}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card-soft text-sm font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Preferences <span className="normal-case tracking-normal opacity-60">· optional</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Aire libre", "Interior", "Ventana", "Barra", "Tranquilo", "Cumpleaños", "Pet friendly"].map((p) => {
                      const on = prefs.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() =>
                            setPrefs(on ? prefs.filter((x) => x !== p) : [...prefs, p])
                          }
                          className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
                            on
                              ? "border-secondary bg-secondary/15 text-secondary"
                              : "border-border bg-card-soft text-muted-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={!pickedTime}
                    onClick={() => setStep("done")}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
                  >
                    <Calendar className="h-4 w-4" />
                    {pickedTime ? `Confirm · ${days[pickedDay].label} ${pickedTime}` : "Pick a time"}
                  </button>
                </>
              );
            })()}

            {step === "done" && (
              <>
                <div className="mt-5 flex flex-col items-center text-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Phone className="h-6 w-6" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                  </div>
                  <p className="mt-3 font-display text-lg font-semibold">Reservation pending</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Our AI agent is calling {saved.name} now.
                    <br />
                    {pickedTime === "Right now"
                      ? `Walk-in within 20 min · table for ${partySize}`
                      : `${pickedTime} · table for ${partySize}`}
                    {prefs.length > 0 && (
                      <>
                        <br />
                        <span className="text-secondary">{prefs.join(" · ")}</span>
                      </>
                    )}
                  </p>
                  <div className="mt-4 w-full space-y-2 rounded-2xl border border-border bg-card/60 p-3 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      You'll hear back in ~30s
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <MessageCircle className="h-3.5 w-3.5 text-[var(--wa-accent)]" />
                      <span>WhatsApp message with the result</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span>A quick call from Mesita to confirm</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setSaved(null); setStep("ask"); setPickedTime(null); setPickedDay(0); }}
                  className="mt-5 w-full rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MapMode() {
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);
  const useMyLocation = () => {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setLocated(true);
    }, 900);
  };
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
    <div
      className="relative mx-5 mb-4 flex-1 overflow-hidden rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, oklch(0.30 0.05 200), oklch(0.16 0.02 220))",
        }}
      >
        {/* Recenter / locate-me FAB (Google-Maps style) */}
        <button
          onClick={useMyLocation}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-elev backdrop-blur transition active:scale-95"
          aria-label="Use my current location"
        >
          <Locate className={`h-4 w-4 ${located ? "text-primary" : "text-foreground"} ${locating ? "animate-pulse" : ""}`} />
        </button>
        {located && (
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-primary/30" />
            <span className="relative block h-4 w-4 rounded-full border-2 border-background bg-primary shadow-glow" />
          </div>
        )}
        {!located && (
          <div className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] text-muted-foreground backdrop-blur">
            Drag to explore · tap <Locate className="inline h-2.5 w-2.5" /> to center
          </div>
        )}
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
          { x: "25%", y: "30%", tier: "gold", n: "Casa Luminar", cb: 20 },
          { x: "60%", y: "45%", tier: "silver", n: "Neón Bar", cb: 20 },
          { x: "40%", y: "65%", tier: "bronze", n: "Mar Verde", cb: 0 },
          { x: "75%", y: "75%", tier: "gold", n: "Loto Café", cb: 10 },
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
    </div>
  );
}

function AISearchMode({ onSelect }: { onSelect: (v: typeof venues[number]) => void }) {
  type Msg =
    | { from: "user"; text: string }
    | {
        from: "ai";
        text: string;
        sources?: string[];
        picks?: { venue: typeof venues[number]; reason: string }[];
      };
  const suggestions = [
    "Rooftop with sunset views",
    "Late night mezcal & vinyl",
    "Brunch by the ocean",
    "Quiet date spot under $$",
  ];
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "ai",
      text:
        "Hey 👋 I'm Mesita AI. Tell me the vibe — neighborhood, mood, budget, who you're with — and I'll find the best spots curated by Gold tastemakers.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const lower = q.toLowerCase();
      const picks = venues.filter((v) => {
        const hay = (v.type + " " + v.vibe + " " + v.info).toLowerCase();
        return lower.split(/\s+/).some((w) => w.length > 3 && hay.includes(w));
      });
      const finalVenues = (picks.length ? picks : venues).slice(0, 3);
      const reasons = [
        "best match for the vibe — Gold tastemakers rate it highest tonight.",
        "strong runner-up with active cashback and live energy right now.",
        "wildcard pick if the first two are full or you want something different.",
      ];
      const final = finalVenues.map((v, i) => ({ venue: v, reason: reasons[i] }));
      setMsgs((m) => [
        ...m,
        {
          from: "ai",
          text: `Found ${final.length} spots that match. Tap any name to see details:`,
          sources: ["Mesita Gold reviews", "Instagram mentions", "Tonight's live activity"],
          picks: final,
        },
      ]);
      setThinking(false);
    }, 900);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide px-5 pb-3">
        {msgs.map((m, i) =>
          m.from === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground px-3.5 py-2 text-[13px] text-background">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-peacock text-sm">
                🦚
              </div>
              <div className="flex-1 space-y-2">
                <div className="rounded-2xl rounded-tl-sm border border-border bg-card-soft px-3.5 py-2 text-[13px] text-foreground">
                  {m.text}
                </div>
                {m.sources && (
                  <div className="flex flex-wrap gap-1">
                    {m.sources.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-card/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {m.picks && (
                  <div className="rounded-2xl rounded-tl-sm border border-border bg-card-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
                    <ol className="space-y-2">
                      {m.picks.map((p, idx) => (
                        <li key={p.venue.name} className="flex gap-2">
                          <span className="text-[11px] font-semibold text-tier-gold">
                            {idx + 1}.
                          </span>
                          <span className="flex-1">
                            <button
                              onClick={() => onSelect(p.venue)}
                              className="font-bold text-foreground underline decoration-tier-gold decoration-2 underline-offset-2 transition hover:text-tier-gold"
                            >
                              {p.venue.name}
                            </button>
                            <span className="text-muted-foreground"> — {p.reason}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ),
        )}
        {thinking && (
          <div className="flex gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-peacock text-sm">
              🦚
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-card-soft px-3.5 py-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </div>
          </div>
        )}
        {msgs.length === 1 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-[11px] text-foreground transition hover:border-tier-gold/60"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-border bg-background px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card-soft px-3 py-2">
          <Sparkles className="h-4 w-4 text-tier-gold" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(input)}
            placeholder="Ask anything: 'rooftop date under $$'"
            className="flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => ask(input)}
            disabled={!input.trim()}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
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
      : mode === "ai"
      ? "Ask Mesita anything"
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
      {mode === "ai" && <AISearchMode onSelect={setSelected} />}
      {selected && (
        <VenueDetailSheet venue={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function WalletView() {
  const [seg, setSeg] = useState<"unused" | "used">("unused");
  const [openCoupon, setOpenCoupon] = useState<any | null>(null);
  const unused = [
    { name: "Casa Luminar", cb: 20, color: "tier-gold", category: "Rooftop", distance: "0.4 km", cost: 3, mesita: 4.8, google: 4.6, exp: "Fri · 9:30pm", note: "Rooftop · 0.4 km", res: "pending" as const },
    { name: "Loto Café", cb: 10, color: "tier-silver", category: "Café", distance: "1.2 km", cost: 2, mesita: 4.6, google: 4.4, exp: "Expires tomorrow", note: "Brunch · weekends", res: "confirmed" as const },
    { name: "Neón Bar", cb: 20, color: "tier-bronze", category: "Cocktails", distance: "2.1 km", cost: 3, mesita: 4.7, google: 4.5, exp: "+ Story bonus 10%", note: "Late night cocktails", res: null },
  ];
  const used = [
    { name: "Mar Verde", cb: 10, color: "tier-gold", category: "Seafood", distance: "3.0 km", cost: 4, mesita: 4.9, google: 4.7, when: "Sat · May 3", saved: "$ 320" },
    { name: "Loto Café", cb: 10, color: "tier-silver", category: "Café", distance: "1.2 km", cost: 2, mesita: 4.6, google: 4.4, when: "Apr 27", saved: "$ 180" },
    { name: "Casa Luminar", cb: 20, color: "tier-gold", category: "Rooftop", distance: "0.4 km", cost: 3, mesita: 4.8, google: 4.6, when: "Apr 19", saved: "$ 540" },
    { name: "Neón Bar", cb: 20, color: "tier-bronze", category: "Cocktails", distance: "2.1 km", cost: 3, mesita: 4.7, google: 4.5, when: "Apr 12", saved: "$ 260" },
  ];
  return (
    <>
      <TopBar title="Coupon Wallet" subtitle={`${unused.length} unused · ${used.length} used`} />
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
            <button
              key={c.name}
              onClick={() => setOpenCoupon({ ...c, used: false })}
              className="relative flex w-full items-stretch overflow-hidden rounded-2xl border border-border bg-card-soft text-left shadow-sm transition active:scale-[0.99]"
            >
              {/* left — cashback stub */}
              <div className={`relative flex w-20 flex-shrink-0 flex-col items-center justify-center ${c.color === "tier-gold" ? "bg-tier-gold" : c.color === "tier-silver" ? "bg-tier-silver" : "bg-tier-bronze"} text-black`}>
                <p className="font-display text-2xl font-bold leading-none">{c.cb}%</p>
                <p className="mt-1 text-[8px] font-semibold uppercase tracking-widest opacity-80">cashback</p>
              </div>

              {/* perforation */}
              <span aria-hidden className="pointer-events-none absolute top-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background" style={{ left: "5rem" }} />
              <span aria-hidden className="pointer-events-none absolute bottom-0 z-10 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border border-border bg-background" style={{ left: "5rem" }} />
              <span aria-hidden className="pointer-events-none absolute top-2 bottom-2 border-l border-dashed border-border" style={{ left: "5rem" }} />

              {/* right — info */}
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold leading-tight">{c.name}</p>
                  <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">{c.note}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {c.res === "pending" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                        <Phone className="h-2.5 w-2.5 animate-pulse" /> AI calling…
                      </span>
                    )}
                    {c.res === "confirmed" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-1.5 py-0.5 text-[9px] font-semibold text-secondary">
                        <Check className="h-2.5 w-2.5" /> Reserved
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[10px] text-secondary">
                      <Clock className="h-2.5 w-2.5" /> {c.exp}
                    </span>
                  </div>
                </div>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-[10px] font-bold text-secondary-foreground shadow-sm">
                  QR
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3 px-5 pb-24">
          {used.map((c) => (
            <button
              key={c.name + c.when}
              onClick={() => setOpenCoupon({ ...c, used: true })}
              className="relative flex w-full items-stretch overflow-hidden rounded-2xl border border-dashed border-border bg-card/60 text-left opacity-90"
            >
              <div className={`relative flex w-20 flex-shrink-0 flex-col items-center justify-center ${c.color === "tier-gold" ? "bg-tier-gold" : c.color === "tier-silver" ? "bg-tier-silver" : "bg-tier-bronze"} text-black grayscale`}>
                <p className="font-display text-2xl font-bold leading-none">{c.cb}%</p>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              <span aria-hidden className="pointer-events-none absolute top-2 bottom-2 border-l border-dashed border-border" style={{ left: "5rem" }} />
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold leading-tight line-through decoration-muted-foreground/50">{c.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Redeemed · {c.when}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Saved</p>
                  <p className="font-display text-sm font-semibold text-secondary">{c.saved}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {openCoupon && (
        <CouponDetailSheet coupon={openCoupon} onClose={() => setOpenCoupon(null)} />
      )}
    </>
  );
}

function CouponDetailSheet({ coupon, onClose }: { coupon: any; onClose: () => void }) {
  const tierBg =
    coupon.color === "tier-gold" ? "bg-tier-gold" :
    coupon.color === "tier-silver" ? "bg-tier-silver" :
    coupon.color === "tier-diamond" ? "bg-tier-diamond" : "bg-tier-bronze";
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-black/50" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88%] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-background p-5 shadow-elev scrollbar-hide"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tierBg} text-base font-bold text-black`}>
            {coupon.cb}%
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-secondary">
              {coupon.used ? "Redeemed coupon" : "Cashback coupon"}
            </p>
            <p className="font-display text-2xl font-semibold leading-tight">{coupon.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {coupon.note || (coupon.when ? `Used · ${coupon.when}` : "")}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-card">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status row */}
        <div className="mt-4 flex flex-wrap gap-2">
          {coupon.res === "pending" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary">
              <Phone className="h-3 w-3 animate-pulse" /> AI agent calling venue
            </span>
          )}
          {coupon.res === "confirmed" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-1 text-[11px] font-medium text-secondary">
              <Check className="h-3 w-3" /> Reservation confirmed
            </span>
          )}
          {coupon.exp && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[11px] text-secondary">
              <Clock className="h-3 w-3" /> {coupon.exp}
            </span>
          )}
          {coupon.used && coupon.saved && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-1 text-[11px] font-medium text-secondary">
              <Sparkles className="h-3 w-3" /> Saved {coupon.saved}
            </span>
          )}
        </div>

        {!coupon.used ? (
          <RedeemFlow coupon={coupon} />
        ) : (
          <>
            <div className="mt-5 rounded-3xl bg-card-soft p-5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Receipt</p>
              <div className="mt-2 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Venue</span><span>{coupon.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{coupon.when}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Cashback rate</span><span>{coupon.cb}%</span></div>
                <div className="flex justify-between border-t border-border pt-2 font-semibold"><span>You saved</span><span className="text-secondary">{coupon.saved}</span></div>
              </div>
            </div>
            <button className="mt-4 w-full rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
              Go again
            </button>
          </>
        )}

        <button onClick={onClose} className="mt-4 w-full rounded-full border border-border py-2.5 text-sm text-muted-foreground">
          Close
        </button>
      </div>
    </div>
  );
}

function RedeemFlow({ coupon }: { coupon: any }) {
  const requireStory = (coupon.cb ?? 0) >= 15;
  const [step, setStep] = useState<"form" | "sending" | "waiting" | "approved">("form");
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [waiter, setWaiter] = useState("");
  const [story, setStory] = useState(false);

  const billNum = parseFloat(bill) || 0;
  const tipNum = parseFloat(tip) || 0;
  const rawCashback = Math.round(billNum * (coupon.cb / 100));
  const cashback = Math.min(rawCashback, 1000);
  const capped = rawCashback > 1000;
  const total = billNum + tipNum;

  const canSend =
    billNum > 0 && waiter.trim().length > 1 && (!requireStory || story);

  const send = () => {
    setStep("sending");
    setTimeout(() => setStep("waiting"), 800);
    setTimeout(() => setStep("approved"), 2600);
  };

  if (step === "approved") {
    return (
      <div className="mt-5 space-y-4">
        <div className="rounded-3xl bg-peacock p-5 text-center text-primary-foreground shadow-glow">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Check className="h-6 w-6" strokeWidth={3} />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-widest opacity-80">
            Validated by waiter
          </p>
          <p className="mt-1 font-display text-2xl font-semibold">
            ${total.toLocaleString()} paid
          </p>
          <p className="text-[11px] opacity-80">in Balance · no card charge</p>
        </div>

        <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Coins className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Cashback earned
              </p>
              <p className="text-lg font-semibold text-secondary">
                +${cashback.toLocaleString()} Balance
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Use on your next visit at any Mesita venue.
          </p>
        </div>

        <div className="rounded-2xl bg-card-soft p-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Bill</span><span>${billNum.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tip for {waiter}</span><span>${tipNum.toLocaleString()}</span></div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold"><span>Total</span><span>${total.toLocaleString()}</span></div>
        </div>
      </div>
    );
  }

  if (step === "sending" || step === "waiting") {
    return (
      <div className="mt-5 space-y-3">
        <div className="rounded-3xl bg-card-soft p-6 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-secondary" />
          <p className="mt-3 text-sm font-medium">
            {step === "sending" ? "Sending to validator…" : "Waiting for waiter to confirm"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Validator received your ticket on WhatsApp · ${total.toLocaleString()}
          </p>
        </div>
        <ol className="space-y-2 text-[12px]">
          <li className="flex items-center gap-2 rounded-xl border border-border bg-card/40 p-2.5">
            <Check className="h-4 w-4 text-secondary" />
            <span>Bill & tip submitted</span>
          </li>
          <li className="flex items-center gap-2 rounded-xl border border-border bg-card/40 p-2.5">
            {step === "waiting" ? <Check className="h-4 w-4 text-secondary" /> : <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            <span>Delivered to {waiter} on WhatsApp</span>
          </li>
          <li className="flex items-center gap-2 rounded-xl border border-border bg-card/40 p-2.5">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span>Awaiting tap-to-confirm</span>
          </li>
        </ol>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4">
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-secondary">
          <Coins className="h-3.5 w-3.5" /> Pays from Balance — no card, no cash
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Earn {coupon.cb}% back as Balance for your next visit.
        </p>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Bill amount</p>
        <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-card-soft px-4 py-3">
          <span className="text-lg font-semibold text-muted-foreground">$</span>
          <input
            inputMode="decimal"
            value={bill}
            onChange={(e) => setBill(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0"
            className="flex-1 bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground/40"
          />
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Tip</p>
        <div className="mt-1 grid grid-cols-4 gap-1.5">
          {[10, 15, 20].map((pct) => {
            const v = Math.round(billNum * (pct / 100));
            const active = parseFloat(tip) === v && v > 0;
            return (
              <button
                key={pct}
                onClick={() => setTip(String(v))}
                className={`rounded-xl border py-2 text-xs font-medium transition ${
                  active
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card-soft text-foreground"
                }`}
              >
                {pct}%
              </button>
            );
          })}
          <input
            inputMode="decimal"
            value={tip}
            onChange={(e) => setTip(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="$"
            className="rounded-xl border border-border bg-card-soft py-2 text-center text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Waiter name (for the tip)</p>
        <input
          value={waiter}
          onChange={(e) => setWaiter(e.target.value)}
          placeholder="e.g. Carlos"
          className="mt-1 w-full rounded-2xl border border-border bg-card-soft px-4 py-3 text-sm outline-none"
        />
      </div>

      {requireStory && (
        <button
          onClick={() => setStory((s) => !s)}
          className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
            story ? "border-secondary bg-secondary/10" : "border-border bg-card-soft"
          }`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${story ? "bg-secondary text-secondary-foreground" : "bg-primary/15 text-primary"}`}>
            {story ? <Check className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              {story ? "Story attached" : "Attach Instagram story"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Required for {coupon.cb}% tier · unlocks bonus
            </p>
          </div>
        </button>
      )}

      {/* Summary */}
      <div className="rounded-2xl bg-card-soft p-4 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Bill</span><span>${billNum.toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Tip</span><span>${tipNum.toLocaleString()}</span></div>
        <div className="mt-1.5 flex justify-between border-t border-border pt-1.5 font-semibold"><span>Pay from Credits</span><span>${total.toLocaleString()}</span></div>
        <div className="flex justify-between text-secondary"><span>Cashback ({coupon.cb}%)</span><span>+${cashback.toLocaleString()}</span></div>
        <p className={`mt-2 text-[10px] leading-snug ${capped ? "text-tier-gold" : "text-muted-foreground"}`}>
          {capped
            ? `Cashback capped at $1,000 MXN. You cover the remaining $${(total - cashback).toLocaleString()} of the bill.`
            : "Cashback covers up to $1,000 MXN per visit. Anything above is paid in full."}
        </p>
      </div>

      <button
        disabled={!canSend}
        onClick={send}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
        Send to validator on WhatsApp
      </button>
      <p className="text-center text-[11px] text-muted-foreground">
        Waiter taps ✅ to confirm. No card needed.
      </p>
    </div>
  );
}

function ProfileView() {
  const [igConnected, setIgConnected] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showAppeal, setShowAppeal] = useState(false);
  const [subTab, setSubTab] = useState<"general" | "stats" | "wallet">("general");
  return (
    <>
      <TopBar title="Profile" />
      <div className="px-5 pb-24">
        {/* GENERAL — identity card */}
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
          <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <span>Female</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span>27 yrs</span>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="mt-4 grid grid-cols-3 gap-1 rounded-full border border-border bg-card-soft p-1">
          {([
            { id: "general", label: "Class" },
            { id: "wallet", label: "Wallet" },
            { id: "stats", label: "Level" },
          ] as const).map((s) => (
            <button
              key={s.id}
              onClick={() => setSubTab(s.id)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                subTab === s.id
                  ? "bg-peacock text-white shadow-glow"
                  : "text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {subTab === "general" && (
          <>
        {/* Tier banner */}
        <div className="mt-4 rounded-2xl bg-tier-gold/10 border border-tier-gold/40 p-4 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest text-tier-gold">
            <Sparkles className="h-3 w-3" /> Your class
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-tier-gold">Gold</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {igConnected ? "Verified · 126k IG followers" : "Instagram not connected · Bronze cap"}
          </p>
        </div>

        {/* Class ladder */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Crown className="h-3 w-3 text-tier-gold" /> Class ladder
            </p>
            <span className="text-[10px] text-secondary">Instagram = main signal</span>
          </div>
          <div className="space-y-2">
            {[
              { t: "Bronze", min: "Everyone — sign up & go", color: "tier-bronze", done: true, perk: "Discovery + base cashback" },
              { t: "Silver", min: "1k+ Instagram followers", color: "tier-silver", done: true, perk: "Boosted cashback · priority list" },
              { t: "Gold", min: "10k+ Instagram followers", color: "tier-gold", done: true, perk: "VIP perks · top venues", active: true },
              { t: "Diamond", min: "By invitation — celebrities & insiders", color: "tier-diamond", done: false, perk: "Comped tables · private rooms" },
            ].map((r) => (
              <div
                key={r.t}
                className={`flex items-center gap-3 rounded-xl p-2.5 ${
                  r.active ? "bg-tier-gold/10 ring-1 ring-tier-gold/40" : "bg-card-soft"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-black ${
                    r.color === "tier-gold" ? "bg-tier-gold" :
                    r.color === "tier-silver" ? "bg-tier-silver" :
                    r.color === "tier-diamond" ? "bg-tier-diamond" : "bg-tier-bronze"
                  }`}
                >
                  {r.done ? <Check className="h-3.5 w-3.5" /> : r.t[0]}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-none">
                    {r.t} {r.active && <span className="ml-1 text-[9px] uppercase tracking-widest text-tier-gold">· current</span>}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{r.min}</p>
                </div>
                <p className="text-right text-[10px] text-muted-foreground">{r.perk}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
            Silver and Gold are auto-assigned from your Instagram follower count.
            Diamond is a curated, invite-only list.
          </p>
        </div>

        {/* Instagram connect / verified */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-yellow-400 text-white">
              <Instagram className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-none">Instagram account</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {igConnected ? "@valenrose · 126k followers · verified" : "Connect to unlock Silver / Gold tier"}
              </p>
            </div>
            {igConnected ? (
              <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1 text-[10px] font-semibold text-secondary">
                <BadgeCheck className="h-3 w-3" /> Verified
              </span>
            ) : (
              <button
                onClick={() => setShowConnect(true)}
                className="rounded-full bg-peacock px-3 py-1.5 text-[11px] font-semibold text-white shadow-glow"
              >
                Connect
              </button>
            )}
          </div>
        </div>

        {/* Appeal upgrade */}
        <button
          onClick={() => setShowAppeal(true)}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-dashed border-border bg-card-soft p-4 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tier-gold/15 text-tier-gold">
            <Crown className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-none">Appeal for upgrade</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Model, chef, press or VIP? Request manual review.
            </p>
          </div>
          <span className="text-[11px] text-secondary">Apply →</span>
        </button>
          </>
        )}

        {subTab === "stats" && (
          <>
        {/* Gamified rank + XP */}
        <div className="mt-4 relative overflow-hidden rounded-2xl bg-peacock p-4 text-primary-foreground shadow-glow">
          <div className="flex items-start justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-80">
                <Crown className="h-3 w-3" /> Gold · Lv. 7
              </p>
              <p className="font-display text-3xl font-semibold leading-tight">Tastemaker</p>
              <p className="mt-0.5 text-[11px] opacity-80">Top 4% in CDMX this month</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest opacity-80">Saved</p>
              <p className="font-display text-2xl font-semibold leading-none">$1,840</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] opacity-90">
              <span>620 XP</span>
              <span>180 XP to Lv. 8 · Connoisseur</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/25">
              <div className="h-full rounded-full bg-tier-gold" style={{ width: "78%" }} />
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-border bg-card-soft p-2.5">
            <p className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-2.5 w-2.5" /> Visits
            </p>
            <p className="mt-1 font-display text-xl font-semibold leading-none">42</p>
            <p className="mt-0.5 text-[9px] text-secondary">+6 this month</p>
          </div>
          <div className="rounded-2xl border border-border bg-card-soft p-2.5">
            <p className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-2.5 w-2.5" /> New spots
            </p>
            <p className="mt-1 font-display text-xl font-semibold leading-none">18</p>
            <p className="mt-0.5 text-[9px] text-secondary">7 / 10 to badge</p>
          </div>
          <div className="rounded-2xl border border-border bg-card-soft p-2.5">
            <p className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-muted-foreground">
              <Flame className="h-2.5 w-2.5" /> Streak
            </p>
            <p className="mt-1 font-display text-xl font-semibold leading-none">5 wks</p>
            <p className="mt-0.5 text-[9px] text-tier-gold">Keep it alive 🔥</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-3 rounded-2xl border border-border bg-card-soft p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              <BadgeCheck className="h-3 w-3 text-tier-gold" /> Badges
            </p>
            <span className="text-[10px] text-secondary">6 / 12 unlocked</span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { e: "🌃", n: "Night Owl", on: true },
              { e: "🍷", n: "Sommelier", on: true },
              { e: "🥂", n: "Brunch Club", on: true },
              { e: "📸", n: "Storyteller", on: true },
              { e: "🗺️", n: "Explorer 10", on: false, prog: "7/10" },
              { e: "👑", n: "VIP 1k", on: false, prog: "$840 left" },
              { e: "🔥", n: "10-wk streak", on: false, prog: "5/10" },
            ].map((b) => (
              <div
                key={b.n}
                className={`flex w-20 flex-shrink-0 flex-col items-center gap-1 rounded-xl p-2 text-center ${
                  b.on ? "bg-tier-gold/15 ring-1 ring-tier-gold/40" : "bg-card opacity-60"
                }`}
              >
                <span className={`text-2xl ${b.on ? "" : "grayscale"}`}>{b.e}</span>
                <p className="text-[9px] font-semibold leading-tight">{b.n}</p>
                {!b.on && b.prog && (
                  <p className="text-[8px] text-muted-foreground">{b.prog}</p>
                )}
              </div>
            ))}
          </div>
        </div>
          </>
        )}

        {subTab === "wallet" && (
          <div className="-mx-5 mt-4">
            <CreditsView />
          </div>
        )}
      </div>

      {/* Connect Instagram sheet */}
      {showConnect && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConnect(false)}
        >
          <div
            className="w-full rounded-t-3xl border-t border-border bg-card p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-yellow-400 text-white">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-tight">Verify Instagram</p>
                <p className="text-[11px] text-muted-foreground">via @mesita.bot · 1-minute setup</p>
              </div>
            </div>

            <ol className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20 text-[10px] font-bold text-secondary">1</span>
                <p className="flex-1 text-foreground/85">Follow <span className="font-semibold text-secondary">@mesita.bot</span> on Instagram.</p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20 text-[10px] font-bold text-secondary">2</span>
                <p className="flex-1 text-foreground/85">DM <span className="font-semibold text-secondary">@mesita.bot</span> with the word <span className="font-mono text-secondary">VERIFY</span>.</p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20 text-[10px] font-bold text-secondary">3</span>
                <p className="flex-1 text-foreground/85">Mesita will reply with an 8-digit verification code. Paste it here.</p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20 text-[10px] font-bold text-secondary">4</span>
                <p className="flex-1 text-foreground/85">Your class is set instantly from your follower count.</p>
              </li>
            </ol>

            <input
              placeholder="Paste 8-digit code"
              maxLength={8}
              className="mt-4 w-full rounded-full border border-border bg-card-soft px-4 py-2.5 text-center font-mono text-base tracking-[0.4em] placeholder:font-sans placeholder:text-sm placeholder:tracking-normal placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
            />

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setShowConnect(false)}
                className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIgConnected(true);
                  setShowConnect(false);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <BadgeCheck className="h-4 w-4" /> Verify
              </button>
            </div>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">
              We never ask for your Instagram password.
            </p>
          </div>
        </div>
      )}

      {/* Appeal sheet */}
      {showAppeal && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAppeal(false)}
        >
          <div
            className="w-full rounded-t-3xl border-t border-border bg-card p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted" />
            <p className="font-display text-lg font-semibold leading-tight">Appeal for class upgrade</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Tier is mostly automatic from Instagram. We review manual cases: models, chefs, press, athletes, founders.
            </p>

            <div className="mt-4 space-y-2">
              {[
                "Model / talent agency",
                "Chef · sommelier · F&B press",
                "Founder / executive",
                "Other public figure",
              ].map((o) => (
                <button
                  key={o}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-card-soft px-3 py-2.5 text-left text-sm"
                >
                  <span>{o}</span>
                  <span className="text-[10px] text-muted-foreground">Select</span>
                </button>
              ))}
            </div>

            <textarea
              placeholder="Add a link (portfolio, agency, press)…"
              rows={3}
              className="mt-3 w-full resize-none rounded-2xl border border-border bg-card-soft px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
            />

            <button
              onClick={() => setShowAppeal(false)}
              className="mt-3 w-full rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              Submit for review
            </button>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Reviews take 24–48h. We'll notify you in-app.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function CreditsView() {
  const [balance, setBalance] = useState(1284);
  const [topUp, setTopUp] = useState(false);
  const pending = 220;
  const txs = [
    { kind: "earn" as const, name: "Casa Luminar", note: "20% cashback · May 3", amt: 540 },
    { kind: "spend" as const, name: "Neón Bar", note: "Paid with credits · Apr 28", amt: -380 },
    { kind: "earn" as const, name: "Loto Café", note: "10% cashback · Apr 27", amt: 180 },
    { kind: "earn" as const, name: "Story bonus", note: "Neón Bar · +10% boost", amt: 120 },
    { kind: "spend" as const, name: "Mar Verde", note: "Paid with credits · Apr 19", amt: -260 },
  ];
  return (
    <>
      <TopBar title="Mesita Wallet" subtitle="Credits earned from cashback" />

      {/* Balance hero */}
      <div className="mx-5 mb-4 rounded-3xl bg-peacock p-5 text-primary-foreground shadow-glow">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <p className="text-[10px] uppercase tracking-widest opacity-80">
            Balance
          </p>
        </div>
        <p className="mt-2 font-display text-4xl font-semibold leading-none">
          ${balance.toLocaleString()}
        </p>
        <p className="mt-2 text-[11px] opacity-80">
          +${pending.toLocaleString()} pending validation
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setTopUp(true)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary shadow-sm"
          >
            <CreditCard className="h-3.5 w-3.5" /> Add credits
          </button>
          <button className="flex-1 rounded-full bg-white/20 px-3 py-2 text-xs font-semibold backdrop-blur">
            Send to friend
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        <div className="rounded-2xl border border-border bg-card-soft p-3">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Earned · 90d</p>
          <p className="mt-1 font-display text-lg font-semibold text-secondary">$2.4k</p>
        </div>
        <div className="rounded-2xl border border-border bg-card-soft p-3">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Spent · 90d</p>
          <p className="mt-1 font-display text-lg font-semibold">$1.1k</p>
        </div>
        <div className="rounded-2xl border border-border bg-card-soft p-3">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Expires</p>
          <p className="mt-1 font-display text-lg font-semibold">Aug 12</p>
        </div>
      </div>

      {/* Activity */}
      <div className="mx-5 mb-2 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Activity</p>
        <span className="text-[10px] text-secondary">See all</span>
      </div>
      <div className="space-y-2 px-5 pb-24">
        {txs.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card-soft p-3"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                t.kind === "earn" ? "bg-secondary/15 text-secondary" : "bg-primary/15 text-primary"
              }`}
            >
              {t.kind === "earn" ? <Coins className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-[11px] text-muted-foreground">{t.note}</p>
            </div>
            <p
              className={`font-display text-sm font-semibold ${
                t.amt > 0 ? "text-secondary" : "text-foreground"
              }`}
            >
              {t.amt > 0 ? "+" : ""}${Math.abs(t.amt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {topUp && (
        <AddCreditsSheet
          onClose={() => setTopUp(false)}
          onConfirm={(amt) => {
            setBalance((b) => b + amt);
            setTopUp(false);
          }}
        />
      )}
    </>
  );
}

function ShareView() {
  const totalCards = 5;
  const claimed = [
    { to: "Camila V.", when: "May 2" },
    { to: "Mateo F.", when: "May 5" },
  ];
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const remaining = totalCards - claimed.length;
  const code = "8F2K-9XQ7";
  const message = `Hey! I'm sending you a $100 MXN gift card to try Mesita 🦚 — discover the best venues in CDMX. Claim it here: mesita.app/g/${code}`;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">
        <TopBar title="Gift Cards" subtitle={`${remaining} of ${totalCards} left · $100 MXN each`} />

        <div className="flex flex-1 flex-col overflow-hidden px-5 pb-3">
          <p className="text-[11px] leading-snug text-muted-foreground">
            Share one code with friends. First {totalCards} sign-ups each get $100 MXN.
          </p>

          {/* Hero gift card with stacked fan behind */}
          <div className="relative mx-auto mt-4 h-44 w-full max-w-[300px]">
            {/* Stacked ghost cards */}
            <div className="absolute inset-0 -rotate-6 translate-y-1 rounded-3xl bg-peacock/25" />
            <div className="absolute inset-0 -rotate-3 rounded-3xl bg-peacock/50" />

            {/* Main card */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl bg-peacock p-5 text-white shadow-2xl">
              {/* Pattern overlay */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full border border-white/10" />

              {/* Ticket perforations */}
              <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
              <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">Mesita</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70">Gift Card</p>
                  </div>
                  <p className="font-display text-xl font-semibold leading-none">$100 MXN</p>
                </div>

                <div className="mt-auto">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">Invite Code</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-mono text-lg font-semibold tracking-[0.2em]">{code}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (typeof navigator !== "undefined" && navigator.clipboard) {
                          navigator.clipboard.writeText(code).catch(() => {});
                        }
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition hover:bg-white/25"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability strip */}
          <div className="mt-5">
            <div className="mb-2 flex items-end justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Availability
              </p>
              <p className="text-[10px] font-medium text-secondary">
                {remaining} of {totalCards} left
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: totalCards }).map((_, i) => {
                const c = claimed[i];
                const openIndex = i - claimed.length;
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    {c ? (
                      <div className="relative flex aspect-square w-full items-center justify-center rounded-xl bg-peacock text-[11px] font-semibold text-white">
                        {initials(c.to)}
                        <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-tier-gold ring-2 ring-background">
                          <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-foreground/15"
                        style={{ opacity: 1 - openIndex * 0.18 }}
                      >
                        <span className="text-base font-light text-foreground/30">+</span>
                      </div>
                    )}
                    <p className="text-center text-[8.5px] leading-tight text-muted-foreground">
                      {c ? (
                        <>
                          <span className="block font-semibold text-foreground/80">{c.to.split(" ")[0]}</span>
                          <span className="block opacity-60">{c.when}</span>
                        </>
                      ) : (
                        <span className="block uppercase tracking-wider opacity-50">Open</span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setSharing(true)}
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3.5 text-sm font-semibold text-background shadow-lg active:scale-[0.98]"
          >
            Share Gift Code <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Share sheet */}
      {sharing && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm"
          onClick={() => setSharing(false)}
        >
          <div
            className="max-h-[88%] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-card p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted" />
            <p className="font-display text-lg font-semibold leading-tight">Share your gift code</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              First 5 friends to sign up each get $100 MXN.
            </p>

            {/* Message template preview */}
            <div className="mt-4 rounded-2xl border border-border bg-card-soft p-3">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Message</p>
              <p className="mt-1 text-[12px] leading-snug text-foreground/85">{message}</p>
            </div>

            {/* Share buttons */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setSharing(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-3 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
              <button
                onClick={() => setSharing(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-3 py-3 text-sm font-semibold text-white"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </button>
            </div>

            {/* 8-character code */}
            <p className="mt-5 mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              Or share the code
            </p>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card-soft px-3 py-2.5">
              <span className="flex-1 font-mono text-base tracking-[0.25em]">{code}</span>
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(code).catch(() => {});
                  }
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <button
              onClick={() => setSharing(false)}
              className="mt-4 w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function AddCreditsSheet({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (amount: number) => void;
}) {
  const products = [
    { id: "starter", price: 500, bonus: 0, label: "Starter", note: "One drink at any Mesita venue" },
    { id: "regular", price: 1000, bonus: 50, label: "Regular", note: "+$50 bonus credits" },
    { id: "popular", price: 2000, bonus: 150, label: "Popular", note: "+$150 bonus · best value", featured: true },
    { id: "vip", price: 5000, bonus: 500, label: "VIP", note: "+$500 bonus credits" },
  ];
  const [productId, setProductId] = useState("regular");
  const [method, setMethod] = useState<"card" | "apple" | "link">("card");
  const [step, setStep] = useState<"choose" | "processing" | "done">("choose");
  const product = products.find((p) => p.id === productId)!;
  const final = product.price;
  const bonus = product.bonus;

  const pay = () => {
    setStep("processing");
    setTimeout(() => setStep("done"), 1400);
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/40" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90%] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-background p-5 shadow-elev scrollbar-hide"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />

        {step === "choose" && (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary">
                  Top up
                </p>
                <p className="font-display text-2xl font-semibold leading-tight">
                  Add Balance
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Pay once, spend at any Mesita venue.
                </p>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stripe product packs */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {products.map((p) => {
                const active = productId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setProductId(p.id)}
                    className={`relative rounded-2xl border p-3 text-left transition ${
                      active
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card-soft"
                    }`}
                  >
                    {p.featured && (
                      <span className="absolute -top-2 right-3 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-secondary-foreground">
                        Best
                      </span>
                    )}
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.label}
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold leading-none">
                      ${p.price.toLocaleString()}
                      <span className="ml-1 text-[10px] font-medium text-muted-foreground">
                        MXN
                      </span>
                    </p>
                    <p
                      className={`mt-1 text-[10px] ${
                        p.bonus > 0 ? "text-secondary" : "text-muted-foreground"
                      }`}
                    >
                      {p.note}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Payment method */}
            <p className="mt-5 text-[10px] uppercase tracking-widest text-muted-foreground">
              Pay with
            </p>
            <div className="mt-2 space-y-2">
              {([
                { id: "card", label: "Card ending · 4242", sub: "Visa · default", Icon: CreditCard },
                { id: "apple", label: "Apple Pay", sub: "Face ID", Icon: Wallet },
                { id: "link", label: "Stripe Link", sub: "ana@mesita.app", Icon: Banknote },
              ] as const).map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card-soft"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <m.Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-[11px] text-muted-foreground">{m.sub}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>

            {/* Summary + CTA */}
            <div className="mt-5 rounded-2xl bg-card-soft p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Top-up</span>
                <span>${final.toLocaleString()}</span>
              </div>
              {bonus > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>Bonus</span>
                  <span>+${bonus.toLocaleString()}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
                <span>You receive</span>
                <span>${(final + bonus).toLocaleString()} credits</span>
              </div>
            </div>

            <button
              disabled={final <= 0}
              onClick={pay}
              className="mt-4 w-full rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-40"
            >
              Pay ${final.toLocaleString()} · Add credits
            </button>
            <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] text-muted-foreground">
              <Check className="h-3 w-3" /> Secured by Stripe · 256-bit encryption
            </p>
          </>
        )}

        {step === "processing" && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm font-medium">Confirming payment…</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Charging your {method === "card" ? "Visa · 4242" : method === "apple" ? "Apple Pay" : "Stripe Link"}
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-peacock text-primary-foreground shadow-glow">
              <Check className="h-7 w-7" strokeWidth={3} />
            </div>
            <p className="mt-4 font-display text-2xl font-semibold">
              +${(final + bonus).toLocaleString()} added
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Available instantly at any Mesita venue.
            </p>
            <button
              onClick={() => onConfirm(final + bonus)}
              className="mt-6 w-full rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function GuestApp() {
  const [tab, setTab] = useState<Tab>("discover");
  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <StatusBar />
      <div className="relative flex flex-1 flex-col overflow-hidden pb-20">
        {tab === "discover" && <Discover />}
        {tab === "coupons" && (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <WalletView />
          </div>
        )}
        {tab === "share" && (
          <div className="flex-1 overflow-hidden">
            <ShareView />
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
            { id: "coupons", Icon: Ticket, label: "Coupons" },
            { id: "share", Icon: Share2, label: "Share" },
            { id: "profile", Icon: User, label: "Profile" },
          ].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as Tab)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition ${
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
function PhotoCarousel() {
  const photos = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&q=80",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=80",
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  return (
    <div className="-mx-5">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / el.clientWidth);
          if (i !== idx) setIdx(i);
        }}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        {photos.map((src) => (
          <div key={src} className="aspect-[4/3] w-full flex-shrink-0 snap-center">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {photos.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-foreground" : "w-1.5 bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
