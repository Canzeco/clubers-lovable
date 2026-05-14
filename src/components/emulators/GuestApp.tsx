import { useEffect, useRef, useState } from "react";
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
  Mail,
  QrCode,
  Navigation,
  Search,
  Locate,
  Wallet,
  Plus,
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
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Shield,
  ChevronDown,
  CalendarCheck,
  SlidersHorizontal,
  TrendingDown,
  Globe,
  Car,
  Accessibility,
  Wine,
  Beef,
  GlassWater,
  GraduationCap,
  Lock,
  ArrowLeft,
  FileText,
} from "lucide-react";

type Tab = "discover" | "rewards" | "qr" | "share" | "profile";
type DiscoverMode = "catalog" | "map" | "tinder" | "ai";

// Community catalog — shared across guest app & manager web. Joining a
// community requires email-domain verification (e.g. @tec.mx).
const COMMUNITIES: Record<
  string,
  { id: string; label: string; short: string; emailDomain: string; color: string; city: string }
> = {
  tec: { id: "tec", label: "Tec de Monterrey", short: "Tec", emailDomain: "@tec.mx", color: "bg-[#0033A0] text-white", city: "Monterrey · CDMX · Guadalajara" },
  udem: { id: "udem", label: "UDEM", short: "UDEM", emailDomain: "@udem.edu", color: "bg-[#003F2D] text-white", city: "Monterrey" },
  stanford: { id: "stanford", label: "Stanford", short: "Stanford", emailDomain: "@stanford.edu", color: "bg-[#8C1515] text-white", city: "Palo Alto, CA" },
  itam: { id: "itam", label: "ITAM", short: "ITAM", emailDomain: "@itam.mx", color: "bg-[#003366] text-white", city: "CDMX" },
  ibero: { id: "ibero", label: "Ibero", short: "Ibero", emailDomain: "@ibero.mx", color: "bg-[#0072CE] text-white", city: "CDMX" },
  unam: { id: "unam", label: "UNAM", short: "UNAM", emailDomain: "@unam.mx", color: "bg-[#0F3F2C] text-white", city: "CDMX" },
  anahuac: { id: "anahuac", label: "Anáhuac", short: "Anáhuac", emailDomain: "@anahuac.mx", color: "bg-[#1B3A6B] text-white", city: "CDMX · Querétaro" },
  lasalle: { id: "lasalle", label: "La Salle", short: "La Salle", emailDomain: "@lasalle.mx", color: "bg-[#7A0019] text-white", city: "CDMX" },
  panamericana: { id: "panamericana", label: "Universidad Panamericana", short: "UP", emailDomain: "@up.edu.mx", color: "bg-[#C8102E] text-white", city: "CDMX · Guadalajara" },
  iteso: { id: "iteso", label: "ITESO", short: "ITESO", emailDomain: "@iteso.mx", color: "bg-[#E25822] text-white", city: "Guadalajara" },
  harvard: { id: "harvard", label: "Harvard", short: "Harvard", emailDomain: "@harvard.edu", color: "bg-[#A41034] text-white", city: "Cambridge, MA" },
  mit: { id: "mit", label: "MIT", short: "MIT", emailDomain: "@mit.edu", color: "bg-[#8A8B8C] text-white", city: "Cambridge, MA" },
  nyu: { id: "nyu", label: "NYU", short: "NYU", emailDomain: "@nyu.edu", color: "bg-[#57068C] text-white", city: "New York, NY" },
  berkeley: { id: "berkeley", label: "UC Berkeley", short: "Berkeley", emailDomain: "@berkeley.edu", color: "bg-[#003262] text-white", city: "Berkeley, CA" },
};

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

function UberEatsLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#06C167"/>
      <text x="12" y="16" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="700" fill="#fff">U</text>
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
    firstVisit: true,
    fb: 4.7,
    fbCount: 312,
    fbFollowers: "48k",
    igFollowers: "126k",
    igMentions: "3.2k",
    google: 4.7,
    googleCount: 1284,
    uber: 4.8,
    uberCount: 2100,
    info: "Rooftop restaurant on 14th floor. Mediterranean tasting menu by chef Iván Solís. Open 7pm–1am · live DJ Thu–Sat · reservations recommended.",
    mesita: 4.9,
    mesitaCount: 84,
    ig: "3.2k mentions",
    quote: "“Best sunset terrace in the city.”",
    status: "Open · closes 1:00am",
    schedule: [
      { day: "Mon", hours: "Closed" },
      { day: "Tue", hours: "7:00pm – 1:00am" },
      { day: "Wed", hours: "7:00pm – 1:00am" },
      { day: "Thu", hours: "7:00pm – 2:00am" },
      { day: "Fri", hours: "7:00pm – 2:00am" },
      { day: "Sat", hours: "6:00pm – 2:00am" },
      { day: "Sun", hours: "12:00pm – 11:00pm" },
    ],
    visitors: [
      { name: "Valentina R.", handle: "@valenrose", tier: "gold", communities: ["tec"], score: 5.0, when: "Sat", comment: "Best sunset terrace in the city.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80" },
      { name: "Lucas M.", handle: "@lucasm", tier: "gold", communities: ["stanford"], score: 4.8, when: "Fri", comment: "The DJ set elevated everything.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80" },
      { name: "Sofía P.", handle: "@sofip", tier: "silver", communities: ["udem"], score: 5.0, when: "Last week", comment: "Service was flawless.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
      { name: "Diego A.", handle: "@diegoa", tier: "bronze", communities: ["itam"], score: 4.5, when: "2 weeks ago", comment: "Worth the price tag.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" },
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
    firstVisit: false,
    fb: 4.5,
    fbCount: 198,
    fbFollowers: "22k",
    igFollowers: "89k",
    igMentions: "1.8k",
    google: 4.4,
    googleCount: 642,
    uber: 4.6,
    uberCount: 540,
    info: "Speakeasy-style cocktail bar hidden behind a record store. Mezcal flights, vinyl DJ sets, 25 seats. Open 9pm–3am Wed–Sun.",
    about: {
      tagline: "A 25-seat mezcal speakeasy hidden behind a vintage vinyl store.",
      sections: [
        {
          title: "The story",
          body: "Neón opened in 2019, the side project of two friends — a sound engineer and a third-generation mezcalero from Santiago Matatlán. They wanted a room small enough to feel like a private living room and a bar program serious enough to honor the families behind every bottle. The unmarked door at the back of Disco Mar (a working record store since 1978) was a happy accident: the building's previous tenant left a sealed back room, and the team kept it that way.",
        },
        {
          title: "The space & architecture",
          body: "Designed by local studio Taller Mostro, the room is a 60 m² shell of hand-burnished tadelakt walls, exposed brick, and a single 4-meter slab of veined Tecali marble that forms the bar. Lighting is entirely amber and indirect — paper sconces by Oaxacan artisan Lucía Toledo, plus a single brass pendant above each leather banquette. The custom Klipschorn corner-loaded sound system is the centerpiece: built in 1972, restored by the owners over two years, and tuned specifically for the room's dimensions.",
        },
        {
          title: "The experience",
          body: "Every night begins with a complimentary copita of the house mezcal and a small bite from the kitchen — usually grasshopper salt, jicama, and a citrus from the morning market. The vibe shifts with the night: quiet conversation and rare jazz pressings before 10pm, then deeper grooves until close. The DJ booth is part of the bar; guests are encouraged to flip through the crate and request the next side.",
        },
        {
          title: "Behind the bar",
          body: "The mezcal list rotates weekly and currently holds 47 single-village agaves, including pieces from the family palenque in Matatlán. Cocktails lean smoky, herbaceous and low-sugar — the signature is the Neón Negroni (mezcal espadín, Campari, house vermouth aged in oak for 90 days). Every spirit on the back bar is sourced direct from producer; nothing here passes through a distributor.",
        },
        {
          title: "Recognition",
          body: "Featured in Condé Nast Traveler's '50 best bars in Latin America' (2024), World's 50 Best Bars Discovery list (2023, 2024), and Time Out's 'Best new bar' (2020).",
        },
      ],
    },
    mesita: 4.8,
    mesitaCount: 62,
    ig: "1.8k mentions",
    quote: "“The mezcal flight is unreal.”",
    status: "Open · closes 3:00am",
    schedule: [
      { day: "Mon", hours: "Closed" },
      { day: "Tue", hours: "Closed" },
      { day: "Wed", hours: "9:00pm – 3:00am" },
      { day: "Thu", hours: "9:00pm – 3:00am" },
      { day: "Fri", hours: "9:00pm – 3:00am" },
      { day: "Sat", hours: "9:00pm – 3:00am" },
      { day: "Sun", hours: "9:00pm – 1:00am" },
    ],
    visitors: [
      { name: "Camila V.", handle: "@camivb", tier: "gold", communities: ["tec", "stanford"], score: 5.0, when: "Wed", comment: "Mezcal flight is unreal.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80" },
      { name: "Mateo F.", handle: "@matef", tier: "gold", communities: ["udem"], score: 4.7, when: "Last Sat", comment: "Best vinyl set in town.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&q=80" },
      { name: "Renata K.", handle: "@renatak", tier: "silver", communities: ["itam"], score: 4.5, when: "Last week", comment: "Hidden gem, intimate vibe.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80" },
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
    firstVisit: false,
    fb: 4.3,
    fbCount: 540,
    fbFollowers: "61k",
    igFollowers: "210k",
    igMentions: "920",
    google: 4.5,
    googleCount: 980,
    uber: 4.5,
    uberCount: 760,
    info: "Oceanfront seafood & brunch. Sustainable sourcing, weekend brunch with live acoustic sets. Open 9am–5pm.",
    about: {
      tagline: "An oceanfront seafood house where the menu changes with the morning catch.",
      sections: [
        {
          title: "The story",
          body: "Mar Verde was founded in 2017 by chef Lucía Marín after a decade cooking on the Mediterranean coast. She came home with a single rule: only what the boats bring in that morning goes on the plate. The restaurant began as a 12-seat shack on the pier, expanded into the current beachfront house in 2021, and now works with a tight network of seven small-scale fishermen up and down the coast.",
        },
        {
          title: "The space & architecture",
          body: "The building is a restored 1940s fishermen's cooperative with original Talavera tile floors and bleached wood beams from a decommissioned trawler. Architect Mariana Rul kept the bones intact and added a 60-seat terrace under hand-sewn linen sails that shift with the wind. The open kitchen is built around a 3-meter wood-fired grill imported from Galicia. Every table has an uninterrupted view of the bay.",
        },
        {
          title: "The experience",
          body: "Service is unhurried and intentionally beach-pace. Brunch (9am–1pm) brings a rotating cast of acoustic guitarists and bossa nova trios. Lunch leans into long, multi-course tasting menus paired with low-intervention wines from Baja and Valle de Guadalupe. The raw bar is the social heart of the room — guests sit elbow-to-elbow on tall stools watching oysters get shucked to order.",
        },
        {
          title: "From the kitchen",
          body: "Crudos, ceviches, and whole fish over embers anchor the menu, but the team is best known for the daily 'lo que trajo el mar' — a chef-driven tasting of whatever was most beautiful at the dock that morning. The bread program is its own thing: house-milled sourdough served with cultured butter, smoked sea salt, and trout roe.",
        },
        {
          title: "Recognition",
          body: "One Michelin star (2024), Gault & Millau 'Chef to Watch' (2022), and a permanent listing on Mexico's Top 50 restaurants since 2020.",
        },
      ],
    },
    mesita: 4.6,
    mesitaCount: 41,
    ig: "920 mentions",
    quote: "“Brunch with ocean breeze.”",
    status: "Open · closes 5:00pm",
    schedule: [
      { day: "Mon", hours: "9:00am – 5:00pm" },
      { day: "Tue", hours: "9:00am – 5:00pm" },
      { day: "Wed", hours: "9:00am – 5:00pm" },
      { day: "Thu", hours: "9:00am – 5:00pm" },
      { day: "Fri", hours: "9:00am – 5:00pm" },
      { day: "Sat", hours: "8:00am – 6:00pm" },
      { day: "Sun", hours: "8:00am – 6:00pm" },
    ],
    visitors: [
      { name: "Ana T.", handle: "@anat", tier: "gold", communities: ["tec"], score: 4.8, when: "Yesterday", comment: "Brunch with ocean breeze, dreamy.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80" },
      { name: "Tomás L.", handle: "@tomasl", tier: "silver", communities: ["stanford"], score: 4.6, when: "Last Sun", comment: "Seafood was incredibly fresh.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" },
    ],
  },
];

function WhySaveFaq() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 rounded-xl border border-border bg-background/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[11px] font-semibold text-foreground"
      >
        <span className="flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5 text-secondary" />
          Why save the coupon?
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-2 border-t border-border px-3 py-2.5 text-[11px] leading-snug text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Lock the rate.</span> The
            cashback % can drop or disappear at any time as the venue's promo fills up.
          </p>
          <p>
            <span className="font-semibold text-foreground">Save it now</span> and the
            rate you see is the rate you get — even if the public offer changes.
          </p>
          <p>
            <span className="font-semibold text-foreground">Expires in 7 days</span> from
            today (or 7 days after your booking if you reserve a table).
          </p>
        </div>
      )}
    </div>
  );
}

function QrFaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-background/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[11px] font-semibold text-foreground"
      >
        <span className="flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5 text-secondary" />
          {q}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-2 border-t border-border px-3 py-2.5 text-[11px] leading-snug text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}

function QrFaqList() {
  return (
    <div className="mt-3 space-y-2">
      <QrFaqItem q="Why show my QR?">
        <p>
          The waiter scans it to{" "}
          <span className="font-semibold text-foreground">link your visit</span> to your
          account, even without a saved coupon.
        </p>
        <p>
          Cashback gets credited automatically after the bill is closed.
        </p>
      </QrFaqItem>
      <QrFaqItem q="How much cashback do I earn?">
        <p>
          If you saved a coupon, you get the{" "}
          <span className="font-semibold text-foreground">locked rate</span> (up to 20%).
        </p>
        <p>
          Without a coupon, every Mesita venue gives you a{" "}
          <span className="font-semibold text-foreground">base 5% back</span> just for
          showing your QR.
        </p>
      </QrFaqItem>
      <QrFaqItem q="When do I get my cashback?">
        <p>
          Cashback is credited to your wallet within{" "}
          <span className="font-semibold text-foreground">24 hours</span> after the venue
          confirms the ticket.
        </p>
        <p>
          You'll get a push notification the moment it lands.
        </p>
      </QrFaqItem>
    </div>
  );
}
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
  void subtitle;
  return (
    <div className="border-b border-border/60 px-5 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peacock text-base shadow-glow">
            🦚
          </div>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold leading-none">Mesita</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground truncate">
              {title}
            </p>
          </div>
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
    { id: "catalog", label: "Catalog", Icon: LayoutGrid },
    { id: "map", label: "Map", Icon: MapIcon },
    { id: "ai", label: "AI", Icon: Sparkles },
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

const VENUE_QUICKNAV = [
  { id: "vsec-photos", label: "Media" },
  { id: "vsec-scores", label: "External" },
  { id: "vsec-reviews", label: "Mesita Reviews" },
  { id: "vsec-visitors", label: "Visitors" },
  { id: "vsec-offers", label: "Cashback" },
  { id: "vsec-menu", label: "Menu" },
  { id: "vsec-location", label: "Location" },
  { id: "vsec-hours", label: "Hours" },
  { id: "vsec-details", label: "Details" },
];

function VenueQuickNav() {
  const [active, setActive] = useState(VENUE_QUICKNAV[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const first = document.getElementById(VENUE_QUICKNAV[0].id);
    let scroller: HTMLElement | null = first?.parentElement ?? null;
    while (scroller && getComputedStyle(scroller).overflowY !== "auto" && getComputedStyle(scroller).overflowY !== "scroll") {
      scroller = scroller.parentElement;
    }
    if (!scroller) return;
    const onScroll = () => {
      const top = scroller!.getBoundingClientRect().top + 80;
      let current = VENUE_QUICKNAV[0].id;
      for (const s of VENUE_QUICKNAV) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= top) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller!.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-qid="${active}"]`);
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-0 z-20 -mx-px border-b border-border/60 bg-card/90 backdrop-blur-xl">
      <div ref={navRef} className="scrollbar-hide flex gap-1 overflow-x-auto px-4 py-2">
        {VENUE_QUICKNAV.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              data-qid={s.id}
              onClick={() => go(s.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                isActive
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-card-soft text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
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
  const [confirm, setConfirm] = useState<null | "save" | "reserve" | "both">(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState(false);
  const isPartner = venue.affiliated;
  const showBlocked = () => {
    setBlockedMsg(true);
    setTimeout(() => setBlockedMsg(false), 2200);
  };

  const handleSave = () => {
    setConfirm("save");
    setTimeout(() => onClose(), 1400);
  };
  const handleReserve = () => {
    setConfirm("reserve");
    setTimeout(() => onClose(), 1800);
  };
  const handleSaveReserve = () => {
    setConfirm("both");
    setTimeout(() => onClose(), 1800);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      <div className="relative flex h-full w-full flex-col bg-card">
        <div className="relative flex-1 overflow-y-auto scrollbar-hide pb-24">
        <div className="relative px-5 pt-5">
          <button
            onClick={onClose}
            aria-label="Back"
            className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-card-soft text-foreground transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            <button
              aria-label="Share venue"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-card-soft text-foreground transition hover:bg-muted"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{venue.type}</p>
            {venue.affiliated && (
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  venue.firstVisit
                    ? "bg-gradient-to-r from-fuchsia-400 to-amber-300 text-black"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {venue.cashback}% CASHBACK
              </span>
            )}
          </div>
          <p className="mt-1 font-display text-2xl font-semibold leading-tight">{venue.name}</p>
          <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {venue.distance} · {venue.price}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2 py-1 text-[10px] font-medium text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <Clock className="h-3 w-3" /> {venue.status}
          </p>
        </div>

        <div className="space-y-4 px-5 pt-5">
          {/* Media Carousel — Instagram-style 4:3 with dots */}
          <section id="vsec-photos" className="scroll-mt-16"><PhotoCarousel /></section>

          {/* External Reviews — scores across platforms */}
          <section id="vsec-scores" className="scroll-mt-16">
            <SectionLabel>External reviews</SectionLabel>
            <div className="grid grid-cols-5 gap-1">
            <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-2">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-secondary">
                <Sparkles className="h-2.5 w-2.5" /> Mesita
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none text-secondary">
                {venue.mesita}
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.mesitaCount} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <GoogleLogo className="h-3 w-3" /> Google
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.google}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.googleCount.toLocaleString()} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <UberEatsLogo className="h-3 w-3" /> Uber
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.uber}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.uberCount.toLocaleString()} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <FacebookLogo className="h-3 w-3" /> Facebook
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.fb}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.fbCount} reviews</p>
            </div>
            <div className="rounded-xl bg-card-soft p-2">
              <p className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground">
                <InstagramLogo className="h-3 w-3" /> Instagram
              </p>
              <p className="mt-1 font-display text-base font-semibold leading-none">{venue.igFollowers}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{venue.igMentions} mentions</p>
            </div>
            </div>
          </section>

          {/* Mesita Reviews */}
          <section id="vsec-reviews" className="scroll-mt-16"><ReviewsSection /></section>

          {/* Mesita Visitors Carousel — sorted by relevance (recency × tier × influence) */}
          <section id="vsec-visitors" className="scroll-mt-16"><MesitaVisitors venue={venue} /></section>

          {/* Cashback — why save */}
          <section id="vsec-offers" className="scroll-mt-16">
            <OffersSection cashback={venue.cashback} />
          </section>

          {/* Menu */}
          <section id="vsec-menu" className="scroll-mt-16">
            <SectionLabel>Menu</SectionLabel>
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-card-soft p-3 text-left transition hover:border-foreground/30"
            >
              <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md bg-foreground text-background shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">View menu</p>
                <p className="text-[10px] text-muted-foreground">PDF · 4 pages · updated this week</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
            </button>
          </section>

          {/* Location mini-map */}
          <section id="vsec-location" className="scroll-mt-16">
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
          </section>

          {/* Hours & popular times */}
          <section id="vsec-hours" className="scroll-mt-16 space-y-4">
            <div>
              <p className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Hours
              </span>
              <span className="text-secondary">{venue.status}</span>
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-card-soft">
              {venue.schedule.map((s, i) => {
                const todayIdx = (new Date().getDay() + 6) % 7;
                const isToday = i === todayIdx;
                const isClosed = s.hours === "Closed";
                return (
                  <div
                    key={s.day}
                    className={`flex items-center justify-between px-4 py-2 text-[12px] ${
                      isToday ? "bg-secondary/10" : ""
                    } ${i !== venue.schedule.length - 1 ? "border-b border-border/60" : ""}`}
                  >
                    <span className={`${isToday ? "font-semibold text-secondary" : "text-foreground/80"}`}>
                      {s.day}{isToday && " · Today"}
                    </span>
                    <span className={`${isClosed ? "text-muted-foreground/70" : isToday ? "font-semibold text-foreground" : "text-foreground/80"}`}>
                      {s.hours}
                    </span>
                  </div>
                );
              })}
            </div>
            </div>

            {/* Popular times */}
            <PopularTimes />
          </section>

          {/* Details */}
          <section id="vsec-details" className="scroll-mt-16">
            <DetailsSection />
          </section>

          {/* About — long-form copy, sits below details, above the action bar */}
          <section className="pb-2">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">About</p>
            {venue.about ? (
              <div className="space-y-4">
                <p className="font-display text-base leading-snug text-foreground">
                  {venue.about.tagline}
                </p>
                {venue.about.sections.map((s) => (
                  <div key={s.title}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                      {s.title}
                    </p>
                    <p className="text-[13px] leading-relaxed text-foreground/85">{s.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-foreground/85">{venue.info}</p>
            )}
          </section>

        </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4">
          <div className="pointer-events-auto flex w-full items-stretch gap-1.5 rounded-3xl border border-border/60 bg-card/85 p-2 shadow-2xl backdrop-blur-xl">
            <button
              onClick={isPartner ? handleSave : showBlocked}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border px-2 py-2 text-[11px] font-semibold leading-tight shadow-sm transition active:scale-[0.98] ${
                isPartner
                  ? "border-foreground/15 bg-background text-foreground hover:border-foreground/30"
                  : "border-dashed border-foreground/15 bg-muted/40 text-muted-foreground/60"
              }`}
            >
              <Ticket className={`h-4 w-4 ${isPartner ? "text-secondary" : "text-muted-foreground/50"}`} />
              <span>Save Coupon</span>
            </button>
            <button
              onClick={isPartner ? handleSaveReserve : showBlocked}
              className={`flex flex-[1.4] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-[11px] font-semibold leading-tight shadow-sm transition active:scale-[0.98] ${
                isPartner
                  ? "bg-secondary text-secondary-foreground"
                  : "border border-dashed border-foreground/15 bg-muted/40 text-muted-foreground/60"
              }`}
            >
              <span className="flex items-center gap-1">
                <Ticket className="h-3.5 w-3.5" />
                <span className="text-[10px]">+</span>
                <Calendar className="h-3.5 w-3.5" />
              </span>
              <span>Save + Reserve</span>
            </button>
            <button
              onClick={handleReserve}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border border-foreground/15 bg-background px-2 py-2 text-[11px] font-semibold leading-tight text-foreground shadow-sm transition hover:border-foreground/30 active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4 text-peacock" />
              <span>Reserve</span>
            </button>
          </div>
        </div>
        {blockedMsg && (
          <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center px-6 animate-fade-in">
            <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-border bg-foreground px-3.5 py-2.5 text-[12px] font-medium text-background shadow-2xl">
              <BadgeCheck className="h-4 w-4 text-secondary" />
              <span>Only Partner venues offer cashbacks — always.</span>
            </div>
          </div>
        )}
        {confirm && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="pointer-events-auto mx-6 w-full max-w-xs rounded-3xl border border-border bg-card p-5 text-center shadow-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-peacock to-secondary text-white shadow-glow">
                <Check className="h-6 w-6" />
              </div>
              <p className="mt-3 font-display text-lg font-semibold leading-tight">
                {confirm === "save"
                  ? "Coupon saved"
                  : confirm === "reserve"
                  ? "Booking a table"
                  : "Saved · booking a table"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {confirm === "save"
                  ? `${venue.cashback}% cashback at ${venue.name} · 7 days to redeem`
                  : confirm === "reserve"
                  ? `Our AI agent is calling ${venue.name} to confirm your table.`
                  : `${venue.cashback}% cashback locked · AI agent is calling ${venue.name}.`}
              </p>
              {confirm === "save" && (
                <div className="mt-3 text-left">
                  <WhySaveFaq />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {menuOpen && (
        <div
          className="absolute inset-0 z-30 flex flex-col bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-background">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-widest">{venue.name} · Menu.pdf</p>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto aspect-[3/4] w-full max-w-sm rounded-md bg-[#f5f1e8] p-6 text-[11px] text-neutral-900 shadow-2xl">
              <p className="text-center font-display text-lg font-semibold tracking-wide">{venue.name}</p>
              <p className="mt-0.5 text-center text-[9px] uppercase tracking-[0.3em] text-neutral-500">Menú · {venue.type}</p>
              <div className="mt-4 h-px bg-neutral-900/20" />
              <p className="mt-3 text-[9px] font-bold uppercase tracking-widest text-neutral-500">Para empezar</p>
              {[
                { name: "Burrata & heirloom tomato", price: "$280" },
                { name: "Octopus, smoked paprika", price: "$420" },
              ].map((d) => (
                <div key={d.name} className="mt-2 flex items-baseline justify-between gap-3">
                  <span>{d.name}</span>
                  <span className="flex-1 border-b border-dotted border-neutral-400/60" />
                  <span className="font-semibold">{d.price}</span>
                </div>
              ))}
              <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-neutral-500">Principales</p>
              {[
                { name: "Wagyu tagliata, truffle", price: "$680" },
                { name: "Saffron risotto", price: "$340" },
                { name: "Catch of the day", price: "$520" },
              ].map((d) => (
                <div key={d.name} className="mt-2 flex items-baseline justify-between gap-3">
                  <span>{d.name}</span>
                  <span className="flex-1 border-b border-dotted border-neutral-400/60" />
                  <span className="font-semibold">{d.price}</span>
                </div>
              ))}
              <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-neutral-500">Postres</p>
              {[
                { name: "Tiramisú", price: "$180" },
                { name: "Chocolate fondant", price: "$210" },
              ].map((d) => (
                <div key={d.name} className="mt-2 flex items-baseline justify-between gap-3">
                  <span>{d.name}</span>
                  <span className="flex-1 border-b border-dotted border-neutral-400/60" />
                  <span className="font-semibold">{d.price}</span>
                </div>
              ))}
              <p className="mt-6 text-center text-[8px] uppercase tracking-[0.3em] text-neutral-400">Página 1 · {venue.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <p className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
      <span>{children}</span>
      {action ? <span className="normal-case tracking-normal text-secondary">{action}</span> : null}
    </p>
  );
}

function PopularTimes() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIdx = (new Date().getDay() + 6) % 7;
  const [day, setDay] = useState(todayIdx);
  // 16 bars: 7a → 10p
  const startHour = 7;
  const patterns: number[][] = [
    [10, 25, 45, 60, 70, 55, 35, 20, 15, 25, 50, 75, 85, 70, 45, 20], // Mon
    [12, 28, 40, 50, 55, 45, 30, 20, 18, 30, 55, 78, 82, 65, 40, 18], // Tue
    [10, 25, 42, 55, 65, 50, 32, 20, 18, 32, 58, 80, 88, 72, 48, 22], // Wed
    [15, 30, 48, 60, 72, 58, 38, 25, 22, 40, 65, 88, 95, 80, 55, 28], // Thu
    [18, 35, 52, 68, 82, 70, 50, 35, 35, 55, 80, 95, 100, 92, 70, 40], // Fri
    [22, 38, 55, 72, 85, 75, 60, 50, 55, 70, 88, 98, 100, 95, 78, 50], // Sat
    [25, 42, 58, 70, 65, 50, 38, 30, 28, 35, 55, 70, 75, 60, 38, 20], // Sun
  ];
  const bars = patterns[day];
  const nowHour = new Date().getHours();
  const nowIdx = day === todayIdx ? Math.max(0, Math.min(15, nowHour - startHour)) : -1;
  const highlight = nowIdx >= 0 ? nowIdx : bars.indexOf(Math.max(...bars));
  const label = (() => {
    const v = bars[highlight];
    if (v >= 80) return "As busy as it gets";
    if (v >= 60) return "Usually busy";
    if (v >= 35) return "Usually a little busy";
    return "Usually not busy";
  })();
  const hourLabel = (i: number) => {
    const h = startHour + i;
    return h === 12 ? "12p" : h > 12 ? `${h - 12}p` : `${h}a`;
  };
  return (
    <div>
      <SectionLabel
        action={<span className="text-muted-foreground">1–3 hrs typical visit</span>}
      >
        Popular times
      </SectionLabel>
      <div className="rounded-2xl border border-border bg-card-soft p-3">
        <div className="-mx-1 mb-3 flex gap-0.5 overflow-x-auto px-1 scrollbar-hide">
          {days.map((d, i) => (
            <button
              key={d}
              onClick={() => setDay(i)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition ${
                day === i
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-foreground">
          <Users className="h-3 w-3 text-secondary" />
          <span className="font-semibold text-secondary">{hourLabel(highlight)}:</span>
          <span className="text-foreground/85">{label}</span>
        </p>
        <div className="mt-2 flex h-20 items-end gap-1">
          {bars.map((v, i) => {
            const isNow = i === highlight;
            return (
              <div key={i} className="flex flex-1 flex-col items-center justify-end">
                <div
                  className={`w-full rounded-t-sm transition ${
                    isNow ? "bg-secondary" : "bg-secondary/30"
                  }`}
                  style={{ height: `${Math.max(4, v)}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
          {[0, 4, 8, 12].map((i) => (
            <span key={i}>{hourLabel(i)}</span>
          ))}
          <span>10p</span>
        </div>
      </div>
    </div>
  );
}

function CurrentActivitySection() {
  const bars = [20, 20, 20, 20, 20, 20, 20, 20, 20, 45, 60, 75, 90, 85, 70, 40, 30, 20];
  const nowIdx = 11;
  return (
    <div>
      <SectionLabel
        action={
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-medium text-secondary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            Live
          </span>
        }
      >
        Current activity
      </SectionLabel>
      <div className="flex items-center gap-3 rounded-2xl bg-secondary/10 px-3 py-2.5">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-secondary" />
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-secondary">
            12 people inside right now
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            Mesita check-ins · updated 3 min ago
          </p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[
          { label: "Visitors this month", val: "50", sub: "Mesita guests", trend: "+18%", up: true },
          { label: "Reservations this week", val: "24", sub: "via Mesita", trend: "+7%", up: true },
          { label: "Coupons redeemed", val: "38", sub: "this month", trend: "−3%", up: false },
          { label: "Avg. spend", val: "$480", sub: "per Mesita guest", trend: "+5%", up: true },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card-soft p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] leading-snug text-muted-foreground">{s.label}</p>
              <span
                className={`flex shrink-0 items-center gap-0.5 text-[10px] font-semibold ${
                  s.up ? "text-emerald-500" : "text-secondary"
                }`}
              >
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {s.trend}
              </span>
            </div>
            <p className="mt-1 font-display text-xl font-semibold leading-none">{s.val}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <p className="mb-1 text-[10px] text-muted-foreground">Busy times today</p>
        <div className="flex h-9 items-end gap-[3px]">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm ${
                i === nowIdx
                  ? "bg-secondary"
                  : h >= 60
                  ? "bg-secondary/50"
                  : h >= 35
                  ? "bg-card-soft"
                  : "bg-muted"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
          <span>7pm</span>
          <span>9pm</span>
          <span className="font-semibold text-secondary">Now</span>
          <span>12am</span>
          <span>1am</span>
        </div>
      </div>
    </div>
  );
}

function OffersSection({ cashback }: { cashback: number }) {
  return (
    <div>
      <SectionLabel action="Active">Offer</SectionLabel>
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-card-soft p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-tight">{cashback}% cashback on your bill</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Every day, all the time · Save the coupon to lock the rate
          </p>
          <span className="mt-1.5 inline-block rounded-md bg-secondary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-secondary-foreground">
            {cashback}% cashback
          </span>
        </div>
      </div>
    </div>
  );
}

function MenuTabs() {
  const [tab, setTab] = useState<"tasting" | "alacarte">("tasting");
  const items = tab === "tasting"
    ? [
        { name: "Burrata & heirloom tomato", price: "$280" },
        { name: "Octopus, smoked paprika", price: "$420" },
        { name: "Wagyu tagliata, truffle", price: "$680" },
        { name: "Saffron risotto", price: "$340" },
      ]
    : [
        { name: "Catch of the day", price: "$520" },
        { name: "Mediterranean lamb", price: "$640" },
        { name: "Charred octopus salad", price: "$380" },
        { name: "Tiramisu", price: "$180" },
      ];
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Menu</span>
        <div className="flex gap-1">
          {([
            { id: "tasting" as const, label: "Tasting" },
            { id: "alacarte" as const, label: "À la carte" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition ${
                tab === t.id
                  ? "bg-secondary text-secondary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card-soft">
        {items.map((d, i, arr) => (
          <div
            key={d.name}
            className={`flex items-center justify-between px-4 py-2.5 text-[12px] ${
              i !== arr.length - 1 ? "border-b border-border/60" : ""
            }`}
          >
            <span className="text-foreground/85">{d.name}</span>
            <span className="font-semibold text-foreground">{d.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ReviewsSection() {
  return (
    <ReviewsSectionInner />
  );
}

function MesitaVisitors({ venue }: { venue: any }) {
  const allCommunities = Array.from(
    new Set<string>(venue.visitors.flatMap((v: any) => v.communities ?? [])),
  );
  const [filter, setFilter] = useState<string>("all");
  const filtered =
    filter === "all"
      ? venue.visitors
      : venue.visitors.filter((v: any) => (v.communities ?? []).includes(filter));
  const list = filtered.length ? filtered : venue.visitors;
  return (
    <div>
      <p className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Mesita Visitors</span>
        <span className="flex items-center gap-1 text-secondary">
          <Flame className="h-3 w-3" /> Top 10
        </span>
      </p>
      {allCommunities.length > 0 && (
        <div className="mb-2 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-hide">
          <button
            onClick={() => setFilter("all")}
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition ${
              filter === "all"
                ? "border-secondary bg-secondary text-secondary-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            All
          </button>
          {allCommunities.map((cid) => {
            const c = COMMUNITIES[cid];
            if (!c) return null;
            return (
              <button
                key={cid}
                onClick={() => setFilter(cid)}
                className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition ${
                  filter === cid
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <GraduationCap className="h-3 w-3" /> {c.short}
              </button>
            );
          })}
        </div>
      )}
      <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
        {Array.from({ length: 10 }).map((_, i) => {
          const u = list[i % list.length];
          const ig = `${(126 - i * 9).toString()}.${(i * 3) % 10}k`;
          return (
            <div key={"mv" + i} className="w-[78%] shrink-0 snap-start rounded-2xl border border-border bg-card-soft p-3">
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
                  {(u.communities ?? []).length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(u.communities as string[]).map((cid) => {
                        const c = COMMUNITIES[cid];
                        if (!c) return null;
                        return (
                          <span
                            key={cid}
                            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-px text-[9px] font-semibold ${c.color}`}
                          >
                            <GraduationCap className="h-2.5 w-2.5" /> {c.short}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1">
                  <Star className="h-3 w-3 fill-secondary text-secondary" />
                  <span className="font-display text-sm font-semibold text-secondary">
                    {u.score.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="mt-2 line-clamp-3 text-[12px] italic leading-snug text-foreground/85">
                "{u.comment}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewsSectionInner() {
  return <ReviewsSectionBody />;
}

function CommunitiesBlock() {
  const [joined, setJoined] = useState<string[]>(["tec"]);
  const [showJoin, setShowJoin] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState<"colleges" | "companies" | "sports" | "alumni">("colleges");
  const [query, setQuery] = useState("");

  const remaining = Object.values(COMMUNITIES).filter((c) => !joined.includes(c.id));
  const filtered = remaining.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.label.toLowerCase().includes(q) ||
      c.short.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.emailDomain.toLowerCase().includes(q)
    );
  });

  const startJoin = (id: string) => {
    setPendingId(id);
    setEmail("");
    setSent(false);
  };
  const sendVerification = () => {
    setSent(true);
    setTimeout(() => {
      if (pendingId) setJoined((j) => [...j, pendingId]);
      setPendingId(null);
      setShowJoin(false);
    }, 1400);
  };

  return (
    <>
      <div className="mt-4 rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <GraduationCap className="h-3 w-3 text-secondary" /> Communities
          </p>
          <span className="text-[10px] text-muted-foreground">Email-verified</span>
        </div>
        <div className="space-y-2">
          {joined.map((cid) => {
            const c = COMMUNITIES[cid];
            if (!c) return null;
            return (
              <div
                key={cid}
                className="flex items-center gap-3 rounded-xl bg-card-soft p-2.5 ring-1 ring-secondary/20"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold ${c.color}`}
                >
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-none">{c.label}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground truncate">
                    Verified via {c.emailDomain}
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1 text-[9px] font-semibold text-secondary">
                  <BadgeCheck className="h-3 w-3" /> Member
                </span>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setShowJoin(true)}
          className="mt-3 flex w-full items-center gap-3 rounded-xl border border-dashed border-secondary/40 bg-secondary/5 p-3 text-left transition hover:bg-secondary/10"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
            <Plus className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold leading-none">Join a community</p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Verify your school or org email — unlock filtered venues.
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
        <p className="mt-2 text-[10px] text-muted-foreground">
          You can be in many communities — but only one Class.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Some venues boost cashback for verified members of certain communities.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          E.g. Tec students fill rooftops in San Pedro on Thursdays · Stanford alumni gather at wine bars in Polanco · ITAM crowds the brunch spots in Condesa on Sundays.
        </p>
      </div>

      {showJoin && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setShowJoin(false);
            setPendingId(null);
            setQuery("");
          }}
        >
          <div
            className="relative flex max-h-[88%] w-full flex-col rounded-t-3xl border-t border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2.5">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="relative px-5 pt-3">
              <button
                onClick={() => {
                  setShowJoin(false);
                  setPendingId(null);
                  setQuery("");
                }}
                className="absolute right-4 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card-soft text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {pendingId ? "Verify membership" : "Join a community"}
              </p>
              <p className="mt-1 font-display text-xl font-semibold leading-tight">
                {pendingId ? COMMUNITIES[pendingId].label : "Find your tribe"}
              </p>
              {!pendingId && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Verify once with your school email — unlock community-only filters and the occasional cashback boost.
                </p>
              )}
            </div>

            {!pendingId ? (
              <>
                {/* Category chips */}
                <div className="mt-3 flex gap-1.5 overflow-x-auto px-5 pb-2 scrollbar-hide">
                  {[
                    { id: "colleges", label: "🎓 Colleges", active: true },
                    { id: "companies", label: "🏢 Companies", active: false },
                    { id: "sports", label: "⚽ Sports clubs", active: false },
                    { id: "alumni", label: "🍷 Alumni groups", active: false },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => cat.active && setCategory(cat.id as typeof category)}
                      disabled={!cat.active}
                      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${
                        category === cat.id && cat.active
                          ? "bg-foreground text-background"
                          : cat.active
                          ? "bg-card-soft text-foreground hover:bg-card-soft/70"
                          : "bg-card-soft text-muted-foreground/50"
                      }`}
                    >
                      {cat.label}
                      {!cat.active && <span className="ml-1 text-[9px] opacity-70">soon</span>}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="px-5 pb-3">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card-soft px-3 py-2.5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search college, city, domain…"
                      className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="text-muted-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto px-5 pb-6 scrollbar-hide">
                  <p className="mb-2 text-[9px] uppercase tracking-widest text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? "school" : "schools"}
                  </p>
                  <div className="space-y-2">
                    {filtered.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => startJoin(c.id)}
                        className="flex w-full items-center gap-3 rounded-xl border border-border bg-card-soft p-3 text-left transition hover:border-secondary/40"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.color}`}
                        >
                          <GraduationCap className="h-4 w-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-semibold leading-tight">{c.label}</p>
                          <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-muted-foreground">
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            <span className="truncate">{c.city}</span>
                            <span className="opacity-40">·</span>
                            <span className="truncate">{c.emailDomain}</span>
                          </p>
                        </div>
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    ))}
                    {filtered.length === 0 && (
                      <p className="rounded-xl bg-card-soft p-4 text-center text-xs text-muted-foreground">
                        No school matches "{query}". Don't see yours?{" "}
                        <span className="font-semibold text-foreground">Request it</span>.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3 px-5 pb-6 pt-4">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card-soft p-3">
                  <Mail className="h-4 w-4 text-secondary" />
                  <p className="text-[11px] text-muted-foreground">
                    Enter your <span className="font-semibold text-foreground">{COMMUNITIES[pendingId].emailDomain}</span> email — we'll send a verification link.
                  </p>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`yourname${COMMUNITIES[pendingId].emailDomain}`}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
                />
                <button
                  disabled={!email.includes(COMMUNITIES[pendingId].emailDomain) || sent}
                  onClick={sendVerification}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
                >
                  {sent ? (
                    <>
                      <Check className="h-4 w-4" /> Verification sent
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send verification email
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-muted-foreground">
                  We never share your email. Membership grants access to community-only filters.
                </p>
                <button
                  onClick={() => setPendingId(null)}
                  className="w-full text-center text-[11px] font-medium text-muted-foreground"
                >
                  ← Pick a different community
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ReviewsSectionBody() {
  return (
    <div>
      <SectionLabel action="129 total">Reviews</SectionLabel>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { l: "Food", v: "4.4" },
          { l: "Service", v: "4.4" },
          { l: "Atmosphere", v: "4.6" },
          { l: "Value", v: "4.3" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl bg-card-soft p-2 text-center">
            <p className="text-[9px] text-muted-foreground">{s.l}</p>
            <p className="font-display text-base font-semibold leading-none">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-border bg-card-soft p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[11px] font-semibold">
            JC
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold leading-tight">Juan Carlos</p>
            <p className="text-[10px] text-muted-foreground">4 days ago</p>
          </div>
          <span className="flex items-center gap-0.5 text-[12px] font-semibold text-secondary">
            <Star className="h-3 w-3 fill-secondary" /> 5.0
          </span>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-foreground/85">
          "Excellent venue with music and very delicious food."
        </p>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {[
            { l: "Food", v: 5 },
            { l: "Service", v: 5 },
            { l: "Atm.", v: 5 },
            { l: "Value", v: 5 },
          ].map((s) => (
            <div key={s.l} className="rounded-md bg-background py-1 text-center">
              <p className="text-[9px] text-muted-foreground">{s.l}</p>
              <p className="text-[11px] font-semibold">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-2 w-full rounded-full border border-border bg-card px-4 py-2 text-[11px] font-medium text-foreground/80">
        View all 129 reviews
      </button>
    </div>
  );
}

function ConciergeSection({ venueName }: { venueName: string }) {
  void venueName;
  return (
    <div>
      <SectionLabel
        action={
          <span className="rounded-md bg-secondary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-secondary">
            Beta
          </span>
        }
      >
        Concierge AI
      </SectionLabel>
      <div className="rounded-2xl border border-border bg-card-soft p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold leading-tight">Ask about this venue</p>
            <p className="text-[10px] text-muted-foreground">Powered by Mesita AI</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            "Is this good for large groups?",
            "What's the best dish on the menu?",
            "What's the best way to get there?",
          ].map((q) => (
            <button
              key={q}
              className="block w-full rounded-full border border-border bg-background px-3 py-1.5 text-left text-[11px] text-foreground/80"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <input
            placeholder="Ask anything about this place…"
            className="flex-1 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailsSection() {
  const rows: { Icon: any; label: string; val: React.ReactNode }[] = [
    { Icon: Phone, label: "Contact", val: <a className="text-secondary" href="#">444 714 0346</a> },
    { Icon: Globe, label: "Website", val: <a className="text-secondary" href="#">@casaluminar</a> },
    { Icon: Banknote, label: "Price range", val: "MXN 310 – 500" },
    { Icon: Sparkles, label: "Dress code", val: "Smart casual" },
    {
      Icon: CreditCard,
      label: "Payment",
      val: (
        <div className="flex flex-wrap gap-1">
          {["Visa", "Mastercard", "AMEX"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
      ),
    },
    { Icon: Car, label: "Parking", val: "Public parking available" },
    {
      Icon: Accessibility,
      label: "Access",
      val: (
        <div className="flex flex-wrap gap-1">
          {["Wheelchair access", "Non-smoking", "Full bar"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
      ),
    },
  ];
  return (
    <div>
      <SectionLabel>Details</SectionLabel>
      <div className="rounded-2xl border border-border bg-card-soft px-3">
        {rows.map(({ Icon, label, val }, i) => (
          <div
            key={label}
            className={`flex items-start gap-3 py-2.5 text-[12px] ${
              i !== rows.length - 1 ? "border-b border-border/60" : ""
            }`}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="w-16 shrink-0 text-muted-foreground">{label}</span>
            <div className="min-w-0 flex-1 text-foreground">{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogMode({ onSelect }: { onSelect: (v: typeof venues[number]) => void }) {
  const dollars = (price: string) => price; // already "$$$"
  const [quick, setQuick] = useState<typeof venues[number] | null>(null);
  const [quickDone, setQuickDone] = useState<string | null>(null);
  const [quickBlocked, setQuickBlocked] = useState(false);
  const closeQuick = () => {
    setQuick(null);
    setQuickDone(null);
    setQuickBlocked(false);
  };
  const doQuick = (label: string) => {
    setQuickDone(label);
    setTimeout(closeQuick, 1400);
  };
  const showQuickBlocked = () => {
    setQuickBlocked(true);
    setTimeout(() => setQuickBlocked(false), 2000);
  };
  const rows: { title: string; subtitle?: string; items: typeof venues }[] = [
    {
      title: "Available now",
      subtitle: "Tables open in the next hour",
      items: venues,
    },
    {
      title: "Best cashback",
      subtitle: "Up to 20% back on first visit",
      items: [...venues].sort((a, b) => b.cashback - a.cashback),
    },
    {
      title: "Rooftops & views",
      items: venues.filter((v) => /rooftop|view/i.test(v.type)).concat(venues).slice(0, 4),
    },
    {
      title: "Late night",
      items: venues.filter((v) => /late|cocktail|bar/i.test(v.type)).concat(venues).slice(0, 4),
    },
    {
      title: "Brunch spots",
      items: venues.filter((v) => /brunch|café|cafe|seafood/i.test(v.type)).concat(venues).slice(0, 4),
    },
    {
      title: "Recently viewed",
      items: venues,
    },
  ];

  return (
    <div className="space-y-5 pb-6">
      {rows.map((row) => (
        <CatalogRow
          key={row.title}
          title={row.title}
          subtitle={row.subtitle}
          items={row.items}
          onSelect={onSelect}
          onQuickSave={setQuick}
        />
      ))}
      {quick && (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={closeQuick}>
          <div
            className="w-full rounded-t-3xl border-t border-border bg-card p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <div className="mb-3 flex items-center gap-3">
              <img src={quick.img} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[15px] font-semibold leading-tight">{quick.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{quick.type}</p>
              </div>
              {quick.affiliated ? (
                <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                  <BadgeCheck className="h-3 w-3" /> Partner
                </span>
              ) : (
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">Web listing</span>
              )}
            </div>
            {quickDone ? (
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-secondary/15 py-4 text-[13px] font-semibold text-secondary">
                <Sparkles className="h-4 w-4" /> {quickDone}
              </div>
            ) : (
              <div className="flex items-stretch gap-1.5">
                <button
                  onClick={quick.affiliated ? () => doQuick("Coupon saved") : showQuickBlocked}
                  className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border px-2 py-2.5 text-[11px] font-semibold leading-tight shadow-sm transition active:scale-[0.98] ${
                    quick.affiliated
                      ? "border-foreground/15 bg-background text-foreground"
                      : "border-dashed border-foreground/15 bg-muted/40 text-muted-foreground/60"
                  }`}
                >
                  <Ticket className={`h-4 w-4 ${quick.affiliated ? "text-secondary" : "text-muted-foreground/50"}`} />
                  <span>Save Coupon</span>
                </button>
                <button
                  onClick={quick.affiliated ? () => doQuick("Saved + reserve started") : showQuickBlocked}
                  className={`flex flex-[1.4] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2.5 text-[11px] font-semibold leading-tight shadow-sm transition active:scale-[0.98] ${
                    quick.affiliated
                      ? "bg-secondary text-secondary-foreground"
                      : "border border-dashed border-foreground/15 bg-muted/40 text-muted-foreground/60"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Ticket className="h-3.5 w-3.5" />
                    <span className="text-[10px]">+</span>
                    <Calendar className="h-3.5 w-3.5" />
                  </span>
                  <span>Save + Reserve</span>
                </button>
                <button
                  onClick={() => doQuick("Reservation started")}
                  className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border border-foreground/15 bg-background px-2 py-2.5 text-[11px] font-semibold leading-tight text-foreground shadow-sm transition active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Reserve</span>
                </button>
              </div>
            )}
            {quickBlocked && (
              <p className="mt-2.5 text-center text-[11px] font-medium text-muted-foreground">
                Only Partner venues offer cashbacks — always.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CatalogRow({
  title,
  subtitle,
  items,
  onSelect,
  onQuickSave,
}: {
  title: string;
  subtitle?: string;
  items: typeof venues;
  onSelect: (v: typeof venues[number]) => void;
  onQuickSave: (v: typeof venues[number]) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between px-5">
        <div>
          <p className="font-display text-base font-semibold leading-tight">{title}</p>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <button className="text-[11px] font-semibold text-secondary">View all</button>
      </div>
      <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
        {items.map((v, idx) => (
          <CatalogCard
            key={v.name + idx}
            venue={v}
            onClick={() => onSelect(v)}
            onQuickSave={() => onQuickSave(v)}
          />
        ))}
      </div>
    </div>
  );
}

function CatalogCard({ venue: v, onClick, onQuickSave }: { venue: typeof venues[number]; onClick: () => void; onQuickSave: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-[68%] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition active:scale-[0.99]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={v.img} alt={v.name} className="h-full w-full object-cover" />
        <span
          role="button"
          aria-label="Save"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onQuickSave();
          }}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </span>
        <div className="absolute left-2 top-2 flex items-center gap-1">
          {v.affiliated ? (
            <>
              <span className="flex items-center gap-1 rounded-full bg-background/90 px-1.5 py-0.5 text-[9px] font-bold text-foreground backdrop-blur">
                <BadgeCheck className="h-3 w-3 text-primary" />
                Partner
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  v.firstVisit
                    ? "bg-gradient-to-r from-fuchsia-400 to-amber-300 text-black"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {v.cashback}% cashback
              </span>
            </>
          ) : (
            <span className="rounded-full bg-background/90 px-2 py-0.5 text-[9px] font-semibold text-muted-foreground backdrop-blur">
              Web listing
            </span>
          )}
        </div>
      </div>
      <div className="space-y-1 px-3 py-2.5">
        <p className="truncate font-display text-[15px] font-semibold leading-tight">{v.name}</p>
        <p className="flex items-center gap-1.5 truncate text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground">{v.price}</span>
          <span>·</span>
          <span className="truncate">{v.type}</span>
        </p>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-secondary text-secondary" />
            <span className="font-semibold text-foreground">{v.mesita}</span>
            <span className="text-border">·</span>
            <span className="font-semibold text-foreground">{v.google}</span>
            <span>G</span>
          </span>
          <span className="flex items-center gap-1">
            <Navigation className="h-3 w-3" /> {v.distance}
          </span>
        </div>
      </div>
    </button>
  );
}

function TinderMode() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const [saved, setSaved] = useState<typeof venues[number] | null>(null);
  const [celebrate, setCelebrate] = useState<{ v: typeof venues[number]; reserve: boolean } | null>(null);
  const [askReserve, setAskReserve] = useState<typeof venues[number] | null>(null);
  const [streak, setStreak] = useState(0);
  const [savedTotal, setSavedTotal] = useState(0);
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
      if (d === "r") {
        setStreak((s) => s + 1);
        setSavedTotal((s) => s + 1);
        setCelebrate({ v: current, reserve: false });
        setTimeout(() => {
          setCelebrate(null);
          setAskReserve(current);
        }, 1100);
      }
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
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                  v.firstVisit
                    ? "bg-gradient-to-r from-fuchsia-400 to-amber-300 text-black"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
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
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-semibold text-muted-foreground transition hover:scale-[1.02]"
        >
          <X className="h-4 w-4" /> Skip
        </button>
        <button
          onClick={() => fly("r")}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-peacock text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
        >
          <Ticket className="h-4 w-4" /> Save coupon
        </button>
      </div>

      {/* streak chip — always visible once you've saved at least one */}
      {savedTotal > 0 && !celebrate && (
        <div className="pointer-events-none absolute right-5 top-3 z-30 animate-fade-in">
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-elev backdrop-blur">
            <Ticket className="h-3 w-3 text-secondary" />
            {savedTotal} saved
            {streak >= 2 && (
              <span className="ml-1 rounded-full bg-gradient-to-r from-fuchsia-400 to-amber-300 px-1.5 py-0.5 text-[9px] text-black">
                🔥 {streak}
              </span>
            )}
          </div>
        </div>
      )}

      {/* celebration overlay — addictive feedback */}
      {celebrate && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* radial flash */}
          <div
            className="absolute inset-0 animate-fade-in"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, oklch(0.75 0.18 200 / 0.35), transparent 55%)",
            }}
          />

          {/* confetti dots */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const dist = 90 + (i % 3) * 30;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const colors = [
              "bg-secondary",
              "bg-tier-gold",
              "bg-fuchsia-400",
              "bg-amber-300",
              "bg-peacock",
            ];
            return (
              <span
                key={i}
                className={`absolute h-2 w-2 rounded-sm ${colors[i % colors.length]}`}
                style={{
                  left: "50%",
                  top: "45%",
                  animation: `confetti-${i % 3} 900ms cubic-bezier(.2,.7,.3,1) forwards`,
                  // @ts-expect-error custom vars
                  "--tx": `${x}px`,
                  "--ty": `${y}px`,
                }}
              />
            );
          })}

          {/* gift-card burst */}
          <div
            className="relative animate-scale-in"
            style={{ animationDuration: "260ms" }}
          >
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-fuchsia-400/40 via-rose-300/30 to-amber-300/40 blur-2xl" />
            <div className="relative flex w-56 items-center gap-3 rounded-2xl border border-white/40 bg-gradient-to-br from-fuchsia-400 via-rose-300 to-amber-300 p-3 text-black shadow-2xl">
              <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-black/15 backdrop-blur-sm">
                <p className="font-display text-xl font-extrabold leading-none">
                  {celebrate.v.cashback}%
                </p>
                <p className="text-[7px] font-bold uppercase tracking-widest opacity-80">
                  cashback
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest">
                  <Sparkles className="h-2.5 w-2.5" /> Coupon saved
                </p>
                <p className="truncate font-display text-sm font-bold leading-tight">
                  {celebrate.v.name}
                </p>
                <p className="text-[9px] font-semibold opacity-75">
                  Added to your wallet · 7 days
                </p>
              </div>
            </div>
            {streak >= 2 && (
              <div className="mx-auto mt-3 w-fit animate-fade-in rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-background">
                🔥 {streak} in a row
              </div>
            )}
          </div>
        </div>
      )}

      {askReserve && !saved && !celebrate && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 backdrop-blur-sm animate-fade-in"
          onClick={() => setAskReserve(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-6 w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-secondary">
              <Check className="h-4 w-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Coupon saved
              </p>
            </div>
            <p className="mt-2 font-display text-lg font-semibold leading-tight">
              Want to reserve a table at {askReserve.name}?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Our AI agent will call the venue for you. The coupon expires 7 days after your booking.
            </p>
            <WhySaveFaq />
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setAskReserve(null)}
                className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-muted-foreground"
              >
                No, just save
              </button>
              <button
                onClick={() => {
                  const v = askReserve;
                  setAskReserve(null);
                  setStep("pick");
                  setSaved(v);
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-peacock px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <Calendar className="h-4 w-4" /> Reserve
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-sm font-bold text-secondary-foreground">
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
                  Always covers up to <span className="font-semibold text-foreground">$1,000 MXN</span> per visit — anything over is paid in full.
                </p>
                <WhySaveFaq />
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
                      You'll hear back in ~3 min
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
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Tonight", "Cashback", "Rooftop", "Brunch", "Late night"];
  const useMyLocation = () => {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setLocated(true);
    }, 900);
  };
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
    <div
      className="relative flex-1 overflow-hidden"
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
        {/* grid lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1="0" y1={i * 52} x2="100%" y2={i * 52} stroke="oklch(0.55 0.1 195)" strokeWidth="0.5" />
              <line x1={i * 36} y1="0" x2={i * 36} y2="100%" stroke="oklch(0.55 0.1 195)" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
        {/* floating category filters */}
        <div className="absolute inset-x-0 top-3 z-10 flex justify-center px-3">
          <div className="flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-border bg-background/85 p-1 shadow-elev backdrop-blur scrollbar-hide">
            <button
              aria-label="Filters"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
            {filters.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                  filter === c
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {/* pins — emoji by category + cashback % */}
        {[
          { x: "22%", y: "28%", emoji: "🍸", n: "Casa Luminar", cb: 20, tags: ["Rooftop", "Late night", "Cashback", "Tonight"] },
          { x: "58%", y: "40%", emoji: "🎶", n: "Neón Bar", cb: 20, tags: ["Late night", "Cashback", "Tonight"] },
          { x: "38%", y: "60%", emoji: "🐟", n: "Mar Verde", cb: 0, tags: ["Brunch"] },
          { x: "72%", y: "70%", emoji: "☕", n: "Loto Café", cb: 10, tags: ["Brunch", "Cashback"] },
          { x: "30%", y: "78%", emoji: "🌮", n: "El Tope", cb: 15, tags: ["Late night", "Cashback", "Tonight"] },
          { x: "82%", y: "30%", emoji: "🍕", n: "Forno", cb: 5, tags: ["Cashback", "Tonight"] },
        ]
          .filter((p) => filter === "All" || p.tags.includes(filter))
          .map((p, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: p.x, top: p.y }}
          >
            <div className="relative flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-background text-base shadow-elev">
                <span className="leading-none">{p.emoji}</span>
              </div>
              {p.cb > 0 && (
                <span className="mt-1 rounded-full bg-tier-gold px-1.5 py-px text-[9px] font-bold text-black shadow-sm">
                  {p.cb}%
                </span>
              )}
            </div>
          </div>
        ))}
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
    "Rooftop con vista al atardecer",
    "Cena romántica en Polanco",
    "Brunch dominical familiar",
    "Mezcal y vinilo después de medianoche",
    "El antro más fresa de San Pedro",
    "Lugar famoso de Luis Miguel en Acapulco",
  ];
  const [msgs, setMsgs] = useState<Msg[]>([]);
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
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-4 pt-6">
        {msgs.length === 0 ? (
          <div className="flex min-h-full flex-col items-center justify-start pb-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peacock text-2xl shadow-glow">
              🦚
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">
              ¿Qué se te antoja?
            </h3>
            <p className="mt-1.5 max-w-[260px] text-[13px] text-muted-foreground">
              Cuéntame el plan — vibra, zona, presupuesto — y te encuentro el lugar.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-left text-[13px] text-foreground transition hover:border-tier-gold/60 hover:bg-card-soft"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {msgs.map((m, i) =>
              m.from === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-muted px-3.5 py-2 text-[13px] leading-relaxed text-foreground">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="space-y-3">
                  <p className="text-[13px] leading-relaxed text-foreground">{m.text}</p>
                  {m.sources && (
                    <div>
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Fuentes
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {m.picks && (
                    <div className="space-y-1.5">
                      {m.picks.map((p, idx) => (
                        <button
                          key={p.venue.name}
                          onClick={() => onSelect(p.venue)}
                          className="flex w-full items-start gap-2.5 rounded-xl border border-border bg-card p-3 text-left transition hover:border-tier-gold/60 hover:bg-card-soft"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tier-gold text-[10px] font-bold text-black">
                            {idx + 1}
                          </span>
                          <span className="flex-1">
                            <span className="block text-[13px] font-semibold text-foreground">
                              {p.venue.name}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                              {p.reason}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
            {thinking && (
              <p className="text-[13px] italic text-muted-foreground">Pensando…</p>
            )}
          </div>
        )}
      </div>
      <div className="border-t border-border bg-background px-3 py-2.5">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-sm focus-within:border-tier-gold/60">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(input)}
            placeholder="Pregunta lo que sea…"
            className="flex-1 bg-transparent py-1 text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => ask(input)}
            disabled={!input.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition disabled:opacity-30"
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
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <DiscoverHeader />
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

function DiscoverHeader() {
  const [open, setOpen] = useState<null | "city" | "when">(null);
  const [city, setCity] = useState("Monterrey");

  const cities = ["Monterrey", "CDMX", "Guadalajara", "Miami", "New York", "Madrid", "Barcelona", "Tokyo"];
  const dates = ["Tonight", "Tomorrow", "Thu May 14", "Fri May 15", "Sat May 16", "Sun May 17"];
  const times = ["6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM"];
  const [whenDate, setWhenDate] = useState("Tonight");
  const [whenTime, setWhenTime] = useState("8:00 PM");

  const setWhenCombo = (d: string, t: string) => {
    setWhenDate(d);
    setWhenTime(t);
  };

  return (
    <div className="border-b border-border/60 px-3 pb-2.5 pt-1">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peacock text-base shadow-glow">
          🦚
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1 rounded-full border border-border bg-card/70 p-1 shadow-sm backdrop-blur">
          <button
            onClick={() => setOpen(open === "city" ? null : "city")}
            className={`flex min-w-0 flex-1 items-center gap-1.5 rounded-full px-2.5 py-1 text-left transition ${
              open === "city" ? "bg-muted" : "hover:bg-muted/50"
            }`}
          >
            <MapPin className="h-3 w-3 shrink-0 text-secondary" />
            <div className="min-w-0 flex-1">
              <div className="text-[7.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80 leading-none">Where</div>
              <div className="mt-0.5 truncate font-display text-[12px] font-semibold leading-none text-foreground">{city}</div>
            </div>
          </button>
          <div className="h-6 w-px bg-border/70" />
          <button
            onClick={() => setOpen(open === "when" ? null : "when")}
            className={`flex min-w-0 flex-1 items-center gap-1.5 rounded-full px-2.5 py-1 text-left transition ${
              open === "when" ? "bg-muted" : "hover:bg-muted/50"
            }`}
          >
            <Calendar className="h-3 w-3 shrink-0 text-secondary" />
            <div className="min-w-0 flex-1">
              <div className="text-[7.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80 leading-none">When</div>
              <div className="mt-0.5 truncate font-display text-[12px] font-semibold leading-none text-foreground">{whenDate} · {whenTime}</div>
            </div>
          </button>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-tier-gold text-[9px] font-bold text-black shadow-sm">
          GOLD
        </div>
      </div>

      {open === "city" && (
        <div className="mt-2 max-h-44 overflow-y-auto rounded-2xl border border-border bg-card p-1 shadow-md scrollbar-hide">
          {cities.map((opt) => (
            <button
              key={opt}
              onClick={() => { setCity(opt); setOpen(null); }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-[12px] transition hover:bg-muted/60 ${
                opt === city ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              <span>{opt}</span>
              {opt === city && <Check className="h-3 w-3" />}
            </button>
          ))}
        </div>
      )}

      {open === "when" && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-2xl border border-border bg-card p-2 shadow-md">
          <div>
            <div className="px-1 pb-1 text-[8.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Date</div>
            <div className="max-h-40 space-y-0.5 overflow-y-auto pr-0.5 scrollbar-hide">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => setWhenCombo(d, whenTime)}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-[11.5px] transition hover:bg-muted/60 ${
                    d === whenDate ? "bg-muted/80 font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="truncate">{d}</span>
                  {d === whenDate && <Check className="h-3 w-3" />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="px-1 pb-1 text-[8.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Time</div>
            <div className="max-h-40 space-y-0.5 overflow-y-auto pr-0.5 scrollbar-hide">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setWhenCombo(whenDate, t)}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-[11.5px] transition hover:bg-muted/60 ${
                    t === whenTime ? "bg-muted/80 font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{t}</span>
                  {t === whenTime && <Check className="h-3 w-3" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WalletView({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [seg, setSeg] = useState<"active" | "expired" | "used">("active");
  const [openCoupon, setOpenCoupon] = useState<any | null>(null);
  const active = [
    { name: "Mar Verde", cb: 10, color: "tier-gold", category: "Seafood", distance: "3.0 km", cost: 4, mesita: 4.9, google: 4.7, isReservation: true, resStatus: "confirmed" as const, resWhen: "Wed May 14 · 8:00 PM", resParty: 2, expiresIn: "6d 12h", code: "MV-7702", firstVisit: false, step: 1 },
    { name: "Neón Bar", cb: 20, color: "tier-bronze", category: "Cocktails", distance: "2.1 km", cost: 3, mesita: 4.7, google: 4.5, isReservation: true, resStatus: "pending" as const, resRequested: "Fri May 16 · 9:30 PM", resParty: 4, expiresIn: "—", code: "NB-9914", firstVisit: false, step: 0 },
    { name: "Casa Luminar", cb: 20, color: "tier-gold", category: "Rooftop", distance: "0.4 km", cost: 3, mesita: 4.8, google: 4.6, expiresIn: "5d 18h", isReservation: false, code: "CL-8821", firstVisit: true, step: 3 },
    { name: "Loto Café", cb: 10, color: "tier-silver", category: "Café", distance: "1.2 km", cost: 2, mesita: 4.6, google: 4.4, expiresIn: "2d 09h", isReservation: false, code: "LC-4417", firstVisit: false, step: 2 },
  ];
  const expired = [
    { name: "Neón Bar", cb: 20, color: "tier-bronze", category: "Cocktails", distance: "2.1 km", cost: 3, mesita: 4.7, google: 4.5, expiredOn: "Yesterday", code: "NB-3310" },
    { name: "Loto Café", cb: 10, color: "tier-silver", category: "Café", distance: "1.2 km", cost: 2, mesita: 4.6, google: 4.4, expiredOn: "May 6", code: "LC-2284" },
  ];
  const used = [
    { name: "Mar Verde", cb: 10, color: "tier-gold", category: "Seafood", distance: "3.0 km", cost: 4, mesita: 4.9, google: 4.7, when: "Sat · May 3", saved: "$ 320" },
    { name: "Loto Café", cb: 10, color: "tier-silver", category: "Café", distance: "1.2 km", cost: 2, mesita: 4.6, google: 4.4, when: "Apr 27", saved: "$ 180" },
    { name: "Casa Luminar", cb: 20, color: "tier-gold", category: "Rooftop", distance: "0.4 km", cost: 3, mesita: 4.8, google: 4.6, when: "Apr 19", saved: "$ 540" },
    { name: "Neón Bar", cb: 20, color: "tier-bronze", category: "Cocktails", distance: "2.1 km", cost: 3, mesita: 4.7, google: 4.5, when: "Apr 12", saved: "$ 260" },
  ];
  const list = seg === "active" ? active : seg === "expired" ? expired : used;
  return (
    <>
      {!hideHeader && (
        <TopBar title="Coupon Wallet" subtitle={`${active.length} active · ${used.length} used · ${expired.length} expired`} />
      )}
      {/* segmented control */}
      <div className="mx-5 mb-3 flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
        {([
          { id: "active", label: "Active", count: active.length },
          { id: "used", label: "Used", count: used.length },
          { id: "expired", label: "Expired", count: expired.length },
        ] as const).map((s) => (
          <button
            key={s.id}
            onClick={() => setSeg(s.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition ${
              seg === s.id ? "bg-foreground text-background" : "text-muted-foreground"
            }`}
          >
            {s.label}
            <span className={`rounded-full px-1.5 text-[10px] ${seg === s.id ? "bg-background/20" : "bg-muted"}`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4 px-5 pb-24">
        {list.map((c: any, idx: number) => (
          <CouponTicket
            key={(c.name || "") + (c.code || c.when || idx)}
            c={c}
            state={seg}
            onClick={() => setOpenCoupon({ ...c, used: seg === "used" })}
          />
        ))}
        {list.length === 0 && (
          <p className="py-10 text-center text-xs text-muted-foreground">No coupons here yet.</p>
        )}
      </div>

      {openCoupon && (
        <CouponDetailSheet coupon={openCoupon} onClose={() => setOpenCoupon(null)} />
      )}
    </>
  );
}

function ReservationsView({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [openCoupon, setOpenCoupon] = useState<any | null>(null);
  const upcoming = [
    { name: "Mar Verde", cb: 10, color: "tier-gold", category: "Seafood", distance: "3.0 km", cost: 4, mesita: 4.9, google: 4.7, isReservation: true, resStatus: "confirmed" as const, resWhen: "Wed May 14 · 8:00 PM", resParty: 2, expiresIn: "6d 12h", code: "MV-7702", firstVisit: false, step: 1 },
    { name: "Neón Bar", cb: 20, color: "tier-bronze", category: "Cocktails", distance: "2.1 km", cost: 3, mesita: 4.7, google: 4.5, isReservation: true, resStatus: "pending" as const, resRequested: "Fri May 16 · 9:30 PM", resParty: 4, expiresIn: "—", code: "NB-9914", firstVisit: false, step: 0 },
    { name: "Casa Luminar", cb: 20, color: "tier-gold", category: "Rooftop", distance: "0.4 km", cost: 3, mesita: 4.8, google: 4.6, isReservation: true, resStatus: "confirmed" as const, resWhen: "Sat May 17 · 9:00 PM", resParty: 6, expiresIn: "8d 04h", code: "CL-3320", firstVisit: false, step: 1 },
    { name: "Atelier Nueve", cb: 0, color: "tier-silver", category: "Tasting menu", distance: "1.8 km", cost: 4, mesita: 4.9, google: 4.8, isReservation: true, reserveOnly: true, resStatus: "confirmed" as const, resWhen: "Thu May 22 · 8:30 PM", resParty: 2, expiresIn: "—", code: "AN-5510", firstVisit: false, step: 0 },
  ];
  const past = [
    { name: "Loto Café", cb: 10, color: "tier-silver", category: "Café", distance: "1.2 km", cost: 2, mesita: 4.6, google: 4.4, isReservation: true, resStatus: "confirmed" as const, resWhen: "Sun May 4 · 11:00 AM", resParty: 3, code: "LC-1101" },
    { name: "Mar Verde", cb: 10, color: "tier-gold", category: "Seafood", distance: "3.0 km", cost: 4, mesita: 4.9, google: 4.7, isReservation: true, resStatus: "confirmed" as const, resWhen: "Sat May 3 · 8:30 PM", resParty: 2, code: "MV-2204" },
  ];
  const [seg, setSeg] = useState<"upcoming" | "past">("upcoming");
  const list = seg === "upcoming" ? upcoming : past;
  return (
    <>
      {!hideHeader && (
        <TopBar title="Reservations" subtitle={`${upcoming.length} upcoming · ${past.length} past`} />
      )}
      <div className="mx-5 mb-3 flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
        {([
          { id: "upcoming", label: "Upcoming", count: upcoming.length },
          { id: "past", label: "Past", count: past.length },
        ] as const).map((s) => (
          <button
            key={s.id}
            onClick={() => setSeg(s.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition ${
              seg === s.id ? "bg-foreground text-background" : "text-muted-foreground"
            }`}
          >
            {s.label}
            <span className={`rounded-full px-1.5 text-[10px] ${seg === s.id ? "bg-background/20" : "bg-muted"}`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-4 px-5 pb-24">
        {list.map((c: any, idx: number) => (
          <CouponTicket
            key={(c.name || "") + (c.code || idx)}
            c={c}
            state="active"
            onClick={() => setOpenCoupon({ ...c })}
          />
        ))}
        {list.length === 0 && (
          <p className="py-10 text-center text-xs text-muted-foreground">No reservations here yet.</p>
        )}
      </div>
      {openCoupon && (
        <CouponDetailSheet coupon={openCoupon} onClose={() => setOpenCoupon(null)} />
      )}
    </>
  );
}

function CouponTicket({
  c,
  state,
  onClick,
}: {
  c: any;
  state: "active" | "expired" | "used";
  onClick: () => void;
}) {
  const isExpired = state === "expired";
  const isUsed = state === "used";
  const isInactive = isExpired || isUsed;
  const isReservation = !!c.isReservation && state === "active";
  const isPending = isReservation && c.resStatus === "pending";
  const hasCashback = (c.cb ?? 0) > 0;
  const venueImg = VENUE_IMAGES[c.name as keyof typeof VENUE_IMAGES] ?? VENUE_IMAGES._default;

  // status pill content
  const pill = isExpired
    ? { label: "Expired", cls: "bg-muted text-muted-foreground" }
    : isUsed
    ? { label: "Used", cls: "bg-muted text-muted-foreground" }
    : isPending
    ? { label: "Pending", cls: "bg-amber-500/10 text-amber-600 border border-amber-500/20" }
    : isReservation
    ? { label: "Reservation", cls: "bg-secondary/10 text-secondary border border-secondary/20" }
    : { label: "Coupon", cls: "bg-foreground/5 text-foreground/70 border border-foreground/10" };

  const tierBar =
    c.color === "tier-gold"
      ? "bg-tier-gold"
      : c.color === "tier-silver"
      ? "bg-tier-silver"
      : c.color === "tier-bronze"
      ? "bg-tier-bronze"
      : "bg-secondary";

  return (
    <button
      onClick={onClick}
      className={`relative mx-auto block w-full max-w-[360px] text-left transition hover:-translate-y-0.5 active:scale-[0.99] ${
        isInactive ? "opacity-80" : ""
      }`}
    >
      <div
        className={`relative flex items-stretch overflow-hidden rounded-none bg-background shadow-[0_18px_40px_-20px_rgba(0,0,0,0.28),0_4px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-border/70 ${
          isExpired ? "ring-dashed grayscale" : ""
        } ${isUsed ? "ring-dashed" : ""} ${isReservation ? "ring-secondary/30" : ""}`}
      >
        {/* LEFT — restaurant image */}
        <div className="relative w-[84px] flex-shrink-0 overflow-hidden bg-muted">
          <img
            src={venueImg}
            alt={c.name}
            loading="lazy"
            className={`h-full w-full object-cover ${isInactive ? "grayscale" : ""}`}
          />
          {/* gradient veil for legibility */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          {/* brand pill */}
          <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full border border-white/40 bg-background/90 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-foreground/80 shadow-sm backdrop-blur">
            <span className="flex h-2 w-2 items-center justify-center rounded-full bg-secondary">
              <span className="h-[3px] w-[3px] rounded-full bg-white" />
            </span>
            Mesita
          </span>
          {/* state stamp */}
          {isUsed && (
            <span className="absolute bottom-2 left-2 -rotate-6 rounded border border-secondary/80 bg-background/90 px-1.5 py-0.5 font-display text-[9px] font-black uppercase tracking-widest text-secondary/90 backdrop-blur-sm">
              Used
            </span>
          )}
          {isExpired && (
            <span className="absolute bottom-2 left-2 -rotate-6 rounded border border-foreground/60 bg-background/90 px-1.5 py-0.5 font-display text-[9px] font-black uppercase tracking-widest text-foreground/70 backdrop-blur-sm">
              Expired
            </span>
          )}
        </div>

        {/* perforation between image and content */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero ring-1 ring-border/70"
          style={{ left: "84px" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 z-10 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-hero ring-1 ring-border/70"
          style={{ left: "84px" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 bottom-3 border-l border-dotted border-border"
          style={{ left: "84px" }}
        />

        {/* MIDDLE — content */}
        <div className="relative flex min-w-0 flex-1 flex-col justify-between gap-1.5 px-3 py-2.5">
          {/* top: pill + serial / tier accent */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] ${pill.cls}`}
            >
              {pill.label}
            </span>
            <span className="font-mono text-[8px] font-bold uppercase tracking-tight text-muted-foreground/60">
              {c.code || "MES-•••"}
            </span>
          </div>

          {/* hero */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span aria-hidden className={`h-3.5 w-1 flex-shrink-0 rounded-full opacity-90 ${tierBar}`} />
              <p className="truncate font-display text-[16px] font-bold leading-none tracking-tight text-foreground">
                {c.name}
              </p>
            </div>
            {isReservation ? (
              isPending ? (
                <p className="mt-1 flex items-center gap-1 truncate text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  <Loader2 className="h-3 w-3 animate-spin" /> AI calling venue
                </p>
              ) : (
                <p className="mt-1 truncate text-[11px] font-semibold tracking-tight text-foreground/70">
                  {c.resWhen}
                </p>
              )
            ) : (
              <>
                {state === "active" && (
                  <p className="mt-1 truncate text-[11px] font-semibold tracking-tight text-foreground/70">
                    Expires in <span className="text-foreground">{c.expiresIn}</span>
                  </p>
                )}
                {state === "expired" && (
                  <p className="mt-1 truncate text-[11px] font-semibold tracking-tight text-muted-foreground">
                    Expired {c.expiredOn}
                  </p>
                )}
                {state === "used" && (
                  <p className="mt-1 truncate text-[11px] font-semibold tracking-tight text-muted-foreground">
                    Used · {c.when}
                  </p>
                )}
              </>
            )}
          </div>

          {/* bottom: status footer */}
          <div className="flex min-w-0 items-center gap-1.5 border-t border-border/60 pt-1.5">
            {isReservation && !isPending && (
              <>
                <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-2 w-2" strokeWidth={4} />
                </span>
                <p className="truncate text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Confirmed · {c.resParty} guests
                </p>
              </>
            )}
            {isReservation && isPending && (
              <p className="truncate text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {c.resRequested} · {c.resParty} guests
              </p>
            )}
            {!isReservation && state === "active" && (
              <>
                <Clock className="h-2.5 w-2.5 flex-shrink-0 text-muted-foreground" />
                <p className="truncate text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {c.category} · {c.distance}
                </p>
              </>
            )}
            {!isReservation && state !== "active" && (
              <p className="truncate text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {c.category} · {c.distance}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — cashback + stepper */}
        <div className="relative flex flex-shrink-0 items-stretch">
          {/* cashback column */}
          <div
            className={`relative flex w-[58px] flex-col items-center justify-center overflow-hidden px-1 py-2 ${
              !hasCashback
                ? "bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 text-stone-700"
                : isInactive
                ? "bg-gradient-to-b from-muted to-card text-muted-foreground"
                : c.firstVisit
                ? "bg-gradient-to-b from-fuchsia-500 via-rose-400 to-amber-300 text-black"
                : "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground"
            }`}
          >
            {/* soft inner sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
              }}
            />
            {/* inner shadow on left edge */}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r ${
                hasCashback ? "from-black/15 to-transparent" : "from-black/5 to-transparent"
              }`}
            />
            {hasCashback ? (
              <>
                <p className="relative z-[1] font-display text-[36px] font-bold leading-none tracking-tight drop-shadow-sm">
                  {c.cb}<span className="text-lg font-light opacity-80">%</span>
                </p>
                <p className="relative z-[1] mt-1 text-[8px] font-black uppercase tracking-[0.22em] opacity-90">
                  {c.firstVisit && !isInactive ? "welcome" : "cashback"}
                </p>
              </>
            ) : (
              <>
                {/* engraved monogram */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, currentColor 0.6px, transparent 0)",
                    backgroundSize: "6px 6px",
                  }}
                />
                <p className="relative z-[1] font-display text-[26px] font-bold italic leading-none tracking-tight">
                  M
                </p>
                <span
                  aria-hidden
                  className="relative z-[1] my-1 block h-px w-5 bg-gradient-to-r from-transparent via-stone-400/60 to-transparent"
                />
                <p className="relative z-[1] text-[8px] font-black uppercase tracking-[0.22em] opacity-80">
                  Table held
                </p>
              </>
            )}
          </div>

          {/* vertical pipeline stepper */}
          {state === "active" && (
            <div className="flex w-[24px] flex-shrink-0 items-center justify-center border-l border-dotted border-border/70 bg-card-soft">
              <PipelineStepper step={c.step ?? 0} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

const VENUE_IMAGES = {
  "Mar Verde":
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=240&h=320&fit=crop&q=70",
  "Neón Bar":
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=240&h=320&fit=crop&q=70",
  "Casa Luminar":
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=240&h=320&fit=crop&q=70",
  "Loto Café":
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=240&h=320&fit=crop&q=70",
  "Atelier Nueve":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=240&h=320&fit=crop&q=70",
  _default:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=240&h=320&fit=crop&q=70",
} as const;

const PIPELINE_STEPS: { label: string; Icon: any }[] = [
  { label: "Saved", Icon: Ticket },
  { label: "Visited", Icon: MapPin },
  { label: "Bill", Icon: Banknote },
  { label: "Paid", Icon: CreditCard },
  { label: "Story", Icon: Camera },
];

function PipelineStepper({ step }: { step: number }) {
  // step = number of completed stages (0..5). Current = step (next to complete).
  return (
    <div className="pointer-events-none flex flex-col items-center gap-0.5 py-2">
      {PIPELINE_STEPS.map((s, i) => {
        const done = i < step;
        const current = i === step;
        const Icon = s.Icon;
        return (
          <div key={s.label} className="flex flex-col items-center">
            <div
              title={s.label}
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition ${
                done
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : current
                  ? "border-foreground bg-background text-foreground animate-pulse"
                  : "border-border bg-background text-muted-foreground/50"
              }`}
            >
              {done ? (
                <Check className="h-2 w-2" strokeWidth={3} />
              ) : (
                <Icon className="h-1.5 w-1.5" />
              )}
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <span
                className={`h-1.5 w-px ${
                  done ? "bg-secondary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CouponDetailSheet({ coupon, onClose }: { coupon: any; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-black/50" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88%] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-background p-5 shadow-elev scrollbar-hide"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-base font-bold text-secondary-foreground">
            {coupon.cb}%
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-secondary">
              {coupon.used ? "Used coupon" : "Cashback coupon"}
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
          <CouponDetails coupon={coupon} onClose={onClose} />
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

function CouponDetails({ coupon, onClose }: { coupon: any; onClose: () => void }) {
  const isReservation = !!coupon.isReservation || coupon.res === "pending" || coupon.res === "confirmed";
  const isPending = coupon.res === "pending";
  const [payOpen, setPayOpen] = useState(false);
  const showPay = !coupon.used && !coupon.reserveOnly && (coupon.cb ?? 0) > 0;

  return (
    <div className="mt-5 space-y-4">
      {/* What this coupon gets you */}
      <div className="rounded-3xl bg-card-soft p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Coupon details</p>
        <div className="mt-2 space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Venue</span><span className="font-medium">{coupon.name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Cashback</span><span className="font-semibold text-secondary">{coupon.cb}%</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Cap per visit</span><span>$1,000 MXN</span></div>
          {isReservation ? (
            <>
              <div className="flex justify-between"><span className="text-muted-foreground">When</span><span>{coupon.resWhen || coupon.resRequested || "—"}</span></div>
              {coupon.resParty && (
                <div className="flex justify-between"><span className="text-muted-foreground">Party</span><span>{coupon.resParty} guests</span></div>
              )}
            </>
          ) : (
            coupon.expiresIn && (
              <div className="flex justify-between"><span className="text-muted-foreground">Expires in</span><span>{coupon.expiresIn}</span></div>
            )
          )}
        </div>
        <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
          Cashback covers up to $1,000 MXN per visit. Anything above that is paid in full. Your balance can only be spent at affiliated venues — it pulls you back for the next visit.
        </p>
      </div>

      {/* How it works — full Mesita flow */}
      <div className="rounded-3xl bg-card-soft p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">How it works</p>

        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary">During the meal</p>
          <ol className="mt-1.5 space-y-1.5 text-[12px] leading-snug text-foreground/80">
            <li><span className="text-muted-foreground">1.</span> Order and dine normally — Mesita doesn't touch the experience.</li>
            <li><span className="text-muted-foreground">2.</span> Optional: post an Instagram story tagging the venue to unlock a bonus later.</li>
          </ol>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Checkout (card only)</p>
          <ol className="mt-1.5 space-y-1.5 text-[12px] leading-snug text-foreground/80">
            <li><span className="text-muted-foreground">3.</span> Ask for the bill and tap <span className="font-semibold">Pay with this coupon</span> — your personal QR opens.</li>
            <li><span className="text-muted-foreground">4.</span> The waiter scans your QR with their phone; it opens a chat with the Mesita bot on WhatsApp.</li>
            <li><span className="text-muted-foreground">5.</span> Waiter enters the bill total and tip, and submits.</li>
            <li><span className="text-muted-foreground">6.</span> You instantly get a Stripe checkout link (in-app + WhatsApp) and pay from your phone.</li>
            <li><span className="text-muted-foreground">7.</span> Payment clears → waiter gets a WhatsApp confirmation. Done.</li>
          </ol>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Rewards</p>
          <ol className="mt-1.5 space-y-1.5 text-[12px] leading-snug text-foreground/80">
            <li><span className="text-muted-foreground">8.</span> Cashback is auto-credited to your Mesita balance at the venue's rate.</li>
            <li><span className="text-muted-foreground">9.</span> Story bonus: an AI bot detects the @venue tag and auto-approves; the waiter is the fallback.</li>
            <li><span className="text-muted-foreground">10.</span> Next visit: Stripe checkout applies your accumulated balance as a discount.</li>
          </ol>
        </div>

        <p className="mt-3 text-[10px] leading-snug text-muted-foreground">
          Mesita is card-only — built for full-service restaurants, not quick-service.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {showPay && (
          <button
            onClick={() => setPayOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-glow"
          >
            <QrCode className="h-4 w-4" /> Pay with this coupon
          </button>
        )}
        {isReservation ? (
          <>
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-white shadow-glow">
              <Calendar className="h-4 w-4" />
              {isPending ? "Edit request" : "Change reservation"}
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-destructive/30 bg-background px-4 py-3 text-sm font-semibold text-destructive">
              <X className="h-4 w-4" /> Cancel reservation
            </button>
          </>
        ) : (
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-peacock px-4 py-3 text-sm font-semibold text-white shadow-glow">
            <Calendar className="h-4 w-4" /> Make a reservation
          </button>
        )}
      </div>
      {payOpen && <PayWithCouponSheet coupon={coupon} onClose={() => setPayOpen(false)} />}
    </div>
  );
}

function PayWithCouponSheet({ coupon, onClose }: { coupon: any; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl border border-border bg-background p-5 shadow-elev"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary">Pay at venue</p>
            <p className="font-display text-lg font-semibold leading-tight">{coupon.name}</p>
            <p className="text-[11px] text-muted-foreground">
              Coupon {coupon.code} · {coupon.cb}% cashback
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-card">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="relative rounded-2xl bg-card p-4 shadow-elev">
            <div className="grid h-48 w-48 grid-cols-12 grid-rows-12 gap-[2px] rounded-lg bg-background p-2">
              {Array.from({ length: 144 }).map((_, i) => {
                const on = (i * 71 + ((i * i) % 19)) % 3 !== 0;
                return (
                  <div key={i} className={on ? "bg-foreground" : "bg-transparent"} />
                );
              })}
            </div>
            <div className="pointer-events-none absolute left-2 top-2 h-9 w-9 rounded-md border-[5px] border-foreground" />
            <div className="pointer-events-none absolute right-2 top-2 h-9 w-9 rounded-md border-[5px] border-foreground" />
            <div className="pointer-events-none absolute bottom-2 left-2 h-9 w-9 rounded-md border-[5px] border-foreground" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-peacock text-sm shadow-glow">
                🦚
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Show this QR to the waiter to apply your <span className="font-semibold text-foreground">{coupon.cb}% cashback</span>.
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-full border border-border py-2.5 text-sm text-muted-foreground"
        >
          Done
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
            ? `Cashback always capped at $1,000 MXN. You cover the remaining $${(total - cashback).toLocaleString()} of the bill.`
            : "Cashback always covers up to $1,000 MXN per visit. Anything above is paid in full."}
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
  const [subTab, setSubTab] = useState<"general" | "stats" | "wallet" | "settings">("general");
  return (
    <>
      <TopBar title="Profile" />
      <div className="px-5 pb-24">
        {/* Identity — single clean row, no boxed card */}
        <div className="flex items-center gap-4 pt-1">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-tier-gold">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-display text-xl font-semibold leading-tight truncate">Valentina R.</p>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-tier-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tier-gold">
                <Crown className="h-3 w-3" /> Gold
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground truncate">@valenrose · CDMX · 27</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="mt-5 grid grid-cols-4 gap-1 rounded-full border border-border bg-card-soft p-1">
          {([
            { id: "general", label: "Class" },
            { id: "wallet", label: "Balance" },
            { id: "stats", label: "Game" },
            { id: "settings", label: "Settings" },
          ] as const).map((s) => (
            <button
              key={s.id}
              onClick={() => setSubTab(s.id)}
              className={`rounded-full px-2 py-1.5 text-[11px] font-semibold transition-colors ${
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
        {/* Instagram connect — primary CTA when not connected */}
        {!igConnected ? (
          <button
            onClick={() => setShowConnect(true)}
            className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500/10 to-yellow-400/10 border border-pink-500/30 p-4 text-left transition hover:border-pink-500/60"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-yellow-400 text-white">
              <Instagram className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-none">Connect Instagram</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Unlock Silver / Gold tier instantly</p>
            </div>
            <span className="rounded-full bg-peacock px-3 py-1.5 text-[11px] font-semibold text-white shadow-glow">Connect</span>
          </button>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card-soft p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-yellow-400 text-white">
              <Instagram className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-none">@valenrose</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">126k followers · verified</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1 text-[10px] font-semibold text-secondary">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          </div>
        )}

        {/* Class ladder */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Crown className="h-3 w-3 text-tier-gold" /> Class ladder
            </p>
            <span className="text-[10px] text-muted-foreground">Auto from Instagram</span>
          </div>
          <div className="space-y-2">
            {[
              { t: "Bronze", min: "Everyone", color: "tier-bronze", done: true, perk: "Base cashback", tagline: "Welcome to the club" },
              { t: "Silver", min: "1k+ followers", color: "tier-silver", done: true, perk: "More cashback", tagline: "Insider perks" },
              { t: "Gold", min: "5k+ followers", color: "tier-gold", done: true, perk: "Even more cashback", tagline: "Priority access", active: true },
              { t: "Diamond", min: "20k+ followers · invite-only", color: "tier-diamond", done: false, perk: "Most cashback", tagline: "Full VIP treatment" },
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
                    {r.t}
                    {r.active && <span className="ml-1.5 text-[9px] uppercase tracking-widest text-tier-gold">Current</span>}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{r.min}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold leading-none text-foreground">{r.perk}</p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">{r.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Appeal upgrade — sits right below Diamond row */}
          <button
            onClick={() => setShowAppeal(true)}
            className="mt-3 flex w-full items-center gap-3 rounded-xl border border-dashed border-tier-diamond/50 bg-tier-diamond/5 p-3 text-left transition hover:bg-tier-diamond/10"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tier-diamond/15 text-tier-diamond">
              <Crown className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold leading-none">Appeal for upgrade</p>
              <p className="mt-1 text-[10px] text-muted-foreground">Model, chef, press, founder? Request manual review.</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <CommunitiesBlock />
          </>
        )}

        {subTab === "stats" && (
          <>
        {/* Level section */}
        <p className="mt-4 mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Level</p>
        {/* Gamified rank + XP */}
        <div className="relative overflow-hidden rounded-2xl bg-peacock p-4 text-primary-foreground shadow-glow">
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

        {/* Stats section */}
        <p className="mt-4 mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Stats</p>
        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-2">
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

        {/* Achievements section */}
        <div className="mt-4 mb-2 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Achievements</p>
          <span className="text-[10px] text-secondary">5 / 12 unlocked</span>
        </div>
        <div className="rounded-2xl border border-border bg-card-soft p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { e: "🇪🇺", n: "European Explorer", d: "5 Mesitas in 5 EU countries", on: true },
              { e: "🌍", n: "African Explorer", d: "3 Mesitas in 3 African countries", on: false, prog: "1/3" },
              { e: "🌏", n: "Asian Explorer", d: "5 Mesitas in 5 Asian countries", on: false, prog: "2/5" },
              { e: "🌎", n: "LATAM Legend", d: "10 Mesitas across LATAM", on: true },
              { e: "🗽", n: "NYC Local", d: "8 Mesitas in New York", on: false, prog: "5/8" },
              { e: "🍷", n: "Sommelier", d: "Try 20 wine bars", on: true },
              { e: "🌃", n: "Night Owl", d: "10 dinners after 11pm", on: true },
              { e: "🥂", n: "Brunch Club", d: "12 brunches on weekends", on: true },
              { e: "📸", n: "Storyteller", d: "Share 15 venues", on: false, prog: "11/15" },
              { e: "🔥", n: "Streak Master", d: "10 weeks in a row", on: false, prog: "5/10" },
              { e: "👑", n: "Big Spender", d: "Spend $1k in cashback", on: false, prog: "$840 left" },
              { e: "🏝️", n: "Beach Tour", d: "5 coastal Mesitas", on: false, prog: "2/5" },
            ].map((b) => (
              <div
                key={b.n}
                className={`flex flex-col items-center gap-1 rounded-xl p-2 text-center ${
                  b.on ? "bg-tier-gold/15 ring-1 ring-tier-gold/40" : "bg-card opacity-70"
                }`}
              >
                <span className={`text-2xl ${b.on ? "" : "grayscale"}`}>{b.e}</span>
                <p className="text-[9px] font-semibold leading-tight">{b.n}</p>
                <p className="text-[8px] leading-tight text-muted-foreground">{b.d}</p>
                {!b.on && b.prog && (
                  <p className="text-[8px] font-semibold text-secondary">{b.prog}</p>
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

        {/* Settings tab */}
        {subTab === "settings" && (
          <>
            <p className="mt-6 mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Account</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {[
                { Icon: User, label: "Personal details", sub: "Name, email, phone" },
                { Icon: CreditCard, label: "Payment methods", sub: "Apple Pay · Visa ·· 4242" },
                { Icon: Bell, label: "Notifications", sub: "Push, email" },
                { Icon: Shield, label: "Privacy & data", sub: "Permissions, export" },
                { Icon: HelpCircle, label: "Help & support", sub: "FAQ · contact us" },
              ].map((row, i, arr) => (
                <button
                  key={row.label}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-card-soft ${
                    i < arr.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card-soft text-muted-foreground">
                    <row.Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">{row.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground truncate">{row.sub}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card-soft px-4 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">Mesita · v2.4.1</p>
          </>
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
                "Local influence · featured in city magazines",
                "Exceptionally handsome / pretty",
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
  const txs = [
    { name: "Casa Luminar", emoji: "🦚", amt: 140, ago: "2 days ago", expiresIn: 88 },
    { name: "Neón Bar", emoji: "🌃", amt: -380, ago: "5 days ago", expiresIn: 85 },
    { name: "Loto Café", emoji: "☕", amt: 180, ago: "1 week ago", expiresIn: 83 },
    { name: "Mar Verde", emoji: "🌊", amt: -260, ago: "2 weeks ago", expiresIn: 76 },
    { name: "Casa Luminar", emoji: "🦚", amt: 90, ago: "3 weeks ago", expiresIn: 69 },
  ];
  return (
    <div className="px-5 pb-24 pt-2">
      {/* Balance */}
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Balance
      </p>
      <p
        className="mt-2 font-display font-semibold leading-none tracking-tight text-foreground"
        style={{ fontSize: "68px" }}
      >
        ${balance.toLocaleString()}
      </p>
      <p className="mt-3 text-[13px] text-muted-foreground">
        Expires 90 days after your last usage · Auto-applies on your next visit
      </p>

      <button
        onClick={() => setTopUp(true)}
        className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-[12px] font-semibold text-foreground transition hover:border-tier-gold/60 hover:bg-card-soft"
      >
        <Plus className="h-3.5 w-3.5" /> Add credits
      </button>

      {/* Activity */}
      <div className="mt-10 flex items-end justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Activity
        </p>
        <button className="text-[12px] text-secondary hover:underline">See all</button>
      </div>
      <div className="mt-2 divide-y divide-border/60">
        {txs.map((t, i) => (
          <div key={i} className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-base leading-none">{t.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {t.ago}
                  {t.amt > 0 ? ` · expires in ${t.expiresIn}d` : ""}
                </p>
              </div>
            </div>
            <p
              className={`font-display text-base font-semibold tabular-nums ${
                t.amt > 0 ? "text-secondary" : "text-foreground"
              }`}
            >
              {t.amt > 0 ? "+" : "−"}${Math.abs(t.amt).toLocaleString()}
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
    </div>
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
  const [audience, setAudience] = useState<"guests" | "creators" | "venues">("guests");
  const [venueCopied, setVenueCopied] = useState(false);
  const venueLink = "www.mesita.ai";
  const venueMessage = `¿Conoces a alguien con un restaurante o bar? Mándale Mesita — pueden abrir su venue en la web sin costo, sin contrato, en 10 minutos: ${venueLink}`;

  const remaining = totalCards - claimed.length;
  const gifted = claimed.length;
  const code = "8F2K-9XQ7";
  const message = `Te regalo $100 MXN para Mesita 🦚 — la app con la que descubro los mejores lugares de CDMX. Es mío para vos, reclámalo acá: mesita.app/g/${code}`;

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
        <TopBar title="Share with friends" />

        <div className="flex flex-1 flex-col overflow-y-auto scrollbar-hide px-5 pb-3 pt-4">
          {/* Audience tabs */}
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-full border border-border bg-card-soft p-1">
            {([
              { id: "guests", label: "Guests" },
              { id: "creators", label: "Creators" },
              { id: "venues", label: "Venues" },
            ] as const).map((a) => (
              <button
                key={a.id}
                onClick={() => setAudience(a.id)}
                className={`rounded-full px-2 py-1.5 text-[11px] font-semibold transition ${
                  audience === a.id
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          {audience === "guests" && (
          <>
          <p className="text-[11px] leading-snug text-muted-foreground">
            You've got {totalCards} gift cards to hand out. Send your code and the first friends who use it each get $100 MXN — courtesy of you.
          </p>

          {/* Hero gift card — ribbon on the left, big amount on the right */}
          <div className="relative mx-auto mt-6 aspect-[1.6/1] w-full max-w-[320px]">
            <div className="absolute inset-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              {/* Vertical ribbon on the left */}
              <div className="pointer-events-none absolute inset-y-0 left-[22%] w-6 -translate-x-1/2 bg-peacock/95" />
              {/* Subtle ribbon edges */}
              <div className="pointer-events-none absolute inset-y-0 left-[22%] w-px -translate-x-[12px] bg-white/15" />
              <div className="pointer-events-none absolute inset-y-0 left-[22%] w-px translate-x-[11px] bg-black/10" />

              {/* Bow on the ribbon (upper-left) */}
              <svg
                className="pointer-events-none absolute left-[22%] top-[34%] h-12 w-16 -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 64 48"
                fill="none"
                aria-hidden
              >
                {/* Left loop */}
                <path
                  d="M32 24 C 14 8, 4 14, 6 24 C 4 34, 18 38, 32 24 Z"
                  className="fill-[color:var(--color-secondary)]"
                />
                {/* Right loop */}
                <path
                  d="M32 24 C 50 8, 60 14, 58 24 C 60 34, 46 38, 32 24 Z"
                  className="fill-[color:var(--color-secondary)]"
                />
                {/* Tails */}
                <path
                  d="M28 26 L 22 44 L 30 40 L 32 26 Z"
                  className="fill-[color:var(--color-secondary)] opacity-90"
                />
                <path
                  d="M36 26 L 42 44 L 34 40 L 32 26 Z"
                  className="fill-[color:var(--color-secondary)] opacity-90"
                />
                {/* Center knot */}
                <ellipse cx="32" cy="24" rx="5" ry="6" className="fill-[color:var(--color-secondary)]" />
                <ellipse cx="32" cy="24" rx="5" ry="6" className="fill-black/15" />
              </svg>

              {/* Top-right — brand */}
              <div className="absolute right-4 top-3 text-right">
                <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-foreground/60">Mesita 🦚</p>
                <p className="mt-0.5 text-[7px] uppercase tracking-[0.25em] text-foreground/35">Gift Card</p>
              </div>

              {/* Center-right — BIG amount */}
              <div className="absolute left-[40%] right-3 top-1/2 -translate-y-1/2 text-right">
                <p className="font-display text-[68px] font-semibold leading-none tracking-tight text-foreground">
                  $100
                </p>
                <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.35em] text-foreground/45">MXN</p>
              </div>

              {/* Bottom-left — to/from (under ribbon column) */}
              <div className="absolute bottom-3 left-3 max-w-[18%] text-[7px] uppercase tracking-[0.25em]">
                <p className="text-foreground/35">To <span className="text-foreground/70">a friend</span></p>
                <p className="mt-0.5 text-foreground/35">From <span className="text-foreground/70">you</span></p>
              </div>

              {/* Bottom-right — code */}
              <div className="absolute bottom-3 right-4 text-right">
                <p className="text-[7px] uppercase tracking-[0.25em] text-foreground/35">Code</p>
                <div className="mt-0.5 flex items-center justify-end gap-1.5">
                  <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-foreground">{code}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText(code).catch(() => {});
                      }
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded text-foreground/40 transition hover:text-foreground"
                  >
                    {copied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Friends you've treated */}
          <div className="mt-5">
            <div className="mb-2 flex items-end justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Friends you've treated
              </p>
              <p className="text-[10px] font-medium text-secondary">
                {gifted > 0 ? `${gifted} gifted · ${remaining} to go` : `${totalCards} gifts ready`}
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
                        <span className="block uppercase tracking-wider opacity-50">Waiting</span>
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
            Send a gift to a friend <ChevronRight className="h-4 w-4" />
          </button>
          </>
          )}

          {audience === "creators" && (
          <div className="flex flex-1 flex-col">
            <p className="text-[11px] leading-snug text-muted-foreground">
              Love Mesita and create content about food, nightlife, travel, lifestyle, hotels, coffee, wine or city guides? We partner with creators worldwide who genuinely live the experience — collabs, custom codes, revenue share, private venue events, and equity for long-term partners.
            </p>
            <p className="mt-2 font-display text-lg font-semibold leading-tight">
              Let's collaborate
            </p>

            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[
                { t: "Custom code", d: "Bigger welcome gift for your followers." },
                { t: "Revenue share", d: "Cut of cashback from your signups." },
                { t: "Private events", d: "Tastings & openings before they go public." },
                { t: "Equity path", d: "For partners who help shape Mesita." },
              ].map((b) => (
                <div key={b.t} className="rounded-xl border border-border bg-card-soft p-2">
                  <p className="text-[11px] font-semibold leading-tight">{b.t}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-1.5">
              <a
                href="mailto:creators@mesita.app?subject=Creator%20partnership"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card-soft px-2 py-2 text-[11px] font-semibold text-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-secondary" /> Email
              </a>
              <a
                href="https://wa.me/525512345678?text=Hola%20Mesita%2C%20soy%20creador%20y%20quiero%20colaborar"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card-soft px-2 py-2 text-[11px] font-semibold text-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5 text-secondary" /> WhatsApp
              </a>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              We reply personally within a few days.
            </p>
          </div>
          )}

          {audience === "venues" && (
          <div className="flex flex-1 flex-col">
            <p className="font-display text-2xl font-semibold leading-tight text-foreground">
              Know someone who runs a restaurant or bar?
            </p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              Invite them to set up on Mesita — free, ~10 min.
            </p>

            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[
                { t: "More customers", d: "Featured in Mesita discovery." },
                { t: "Better customers", d: "Socially-magnetic, higher-spend, loyal guests." },
                { t: "Auto IG stories", d: "Each visit becomes organic reach." },
                { t: "Live insights", d: "Repeat guests, AI visit summaries." },
                { t: "Setup in 10 min", d: "All from a browser, no app." },
                { t: "Free to start", d: "Costs nothing until it pays off." },
              ].map((b) => (
                <div key={b.t} className="rounded-xl border border-border bg-card-soft p-2">
                  <p className="text-[11px] font-semibold leading-tight">{b.t}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-dashed border-border bg-card-soft px-3 py-2">
              <span className="truncate font-mono text-[11px] text-foreground">{venueLink}</span>
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(venueLink).catch(() => {});
                  }
                  setVenueCopied(true);
                  setTimeout(() => setVenueCopied(false), 1500);
                }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-foreground/50 transition hover:text-foreground"
              >
                {venueCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>

            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share) {
                  (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
                    title: "Mesita for venues",
                    text: venueMessage,
                    url: `https://${venueLink}`,
                  }).catch(() => {});
                }
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-lg active:scale-[0.98]"
            >
              Send invitation <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          )}
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
            <p className="font-display text-lg font-semibold leading-tight">Make their week</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Every friend who joins with your code gets $100 MXN — from you. They'll know it was you.
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
    <GuestAppShell tab={tab} setTab={setTab} />
  );
}

function RewardsView() {
  const [sub, setSub] = useState<"reservations" | "coupons">("reservations");
  return (
    <div>
      <TopBar title="Reservations & Coupons" />
      <div className="px-5 pb-3 pt-3">
        <div className="flex gap-1 rounded-full bg-muted p-1">
          {[
            { id: "reservations" as const, label: "Reservations" },
            { id: "coupons" as const, label: "Coupons" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSub(s.id)}
              className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                sub === s.id
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {sub === "reservations" ? <ReservationsView hideHeader /> : <WalletView hideHeader />}
    </div>
  );
}

function MyQrView() {
  return (
    <div className="flex h-full flex-col overflow-y-auto scrollbar-hide bg-background px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-peacock text-base shadow-glow">
          🦚
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-display text-base font-semibold leading-tight truncate">Patricio Canseco</p>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-tier-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tier-gold">
              <Crown className="h-3 w-3" /> Gold
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Member · No. 47847</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="font-display text-lg font-semibold">Show this QR to the waiter</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Earn cashback at any Mesita venue — even without a saved coupon.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <div className="relative rounded-3xl bg-card p-5 shadow-elev">
          <div className="grid h-56 w-56 grid-cols-12 grid-rows-12 gap-[2px] rounded-xl bg-background p-2">
            {Array.from({ length: 144 }).map((_, i) => {
              const on = (i * 73 + ((i * i) % 17)) % 3 !== 0;
              return (
                <div
                  key={i}
                  className={on ? "bg-foreground" : "bg-transparent"}
                />
              );
            })}
          </div>
          {/* corners */}
          <div className="pointer-events-none absolute left-3 top-3 h-10 w-10 rounded-md border-[6px] border-foreground" />
          <div className="pointer-events-none absolute right-3 top-3 h-10 w-10 rounded-md border-[6px] border-foreground" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 rounded-md border-[6px] border-foreground" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-peacock text-base shadow-glow">
              🦚
            </div>
          </div>
        </div>
      </div>

      <QrFaqList />
    </div>
  );
}

function GuestAppShell({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <StatusBar />
      <div className="relative flex flex-1 flex-col overflow-hidden pb-20">
        {tab === "discover" && <Discover />}
        {tab === "rewards" && (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <RewardsView />
          </div>
        )}
        {tab === "qr" && (
          <div className="flex-1 overflow-hidden">
            <MyQrView />
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
            { id: "rewards", Icon: Bookmark, label: "Saved" },
            { id: "qr", Icon: QrCode, label: "My QR" },
            { id: "share", Icon: Share2, label: "Share" },
            { id: "profile", Icon: User, label: "Profile" },
          ].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as Tab)}
              className={`flex flex-col items-center gap-0.5 px-1.5 py-1 text-[9.5px] transition ${
                tab === id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
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
