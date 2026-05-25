// Clubers — domain types + seed data + mock service layer.
// Designed so the UI never talks to a backend directly. Swap the
// functions in `clubersApi` for Supabase Edge Function calls later.

export type Tier = "bronze" | "silver" | "gold" | "diamond";
export type Category = "place" | "event" | "community" | "person";
export type Participation = "listed" | "partner";
export type PerkKind = "cashback" | "discount";
export type FiscalType = "formal" | "informal";

export interface Perk {
  kind: PerkKind;
  pct: number; // 0-100
  label: string; // pre-formatted display string
}

export interface Listing {
  id: string;
  name: string;
  category: Category;
  subcategory: string; // "Restaurante", "Bar", "Rooftop", "Cata", "Concierto"…
  participation: Participation;
  zone: string; // "San Pedro", "Centro", "Cumbres"…
  priceLevel: 1 | 2 | 3 | 4; // $ – $$$$
  clubersRating: number; // 0-5
  googleRating: number; // 0-5
  vibes: string[]; // ["rooftop", "íntimo", "música en vivo"]
  cover: string;
  gallery: string[];
  openNow: boolean;
  hours: string;
  walkMin: number; // mock walking distance
  description: string;
  // Perk per tier — undefined tier means no perk (listed venues)
  perks?: Record<Tier, Perk>;
  welcomePerk?: Perk;
  // Forces the perk mechanic on transactional partners (place/event).
  // formal → cashback returned as Clubers credits (only valid if guest pays
  // through Clubers). informal → instant discount applied to the bill (Clubers
  // stays off the payment rail).
  fiscalType?: FiscalType;
  // For events
  whenLabel?: string; // "Vie 14 dic · 22:00"
  // For communities
  members?: number;          // 1820
  entryRule?: string;        // "Solo @tec.mx" · "Aprobación del admin" · "Abierto"
  monthlyFee?: number;       // 0 if free
  communityKind?: "college" | "members-club" | "open" | "professional";
  // For people
  handle?: string;           // "@anapaularz"
  igFollowers?: number;      // 12400
  role?: string;             // "DJ residente · Vértigo" · "Foodie · @koli"
  influenceTier?: "rising" | "creator" | "tastemaker" | "icon";
  // Perks gated to members of specific community groups. This is how the
  // spec's "20% off for all Tec students" rules get expressed on a venue.
  communityPerks?: CommunityPerk[];
}

export interface CommunityPerk {
  communityId: string;        // matches a Listing.id where category === "community"
  communityName: string;      // denormalized for display
  kind: PerkKind;
  pct: number;
  label: string;
}

export const TIERS: Tier[] = ["bronze", "silver", "gold", "diamond"];

export const INFLUENCE_META: Record<NonNullable<Listing["influenceTier"]>, { label: string; min: string }> = {
  rising:     { label: "Rising",     min: "<1K" },
  creator:    { label: "Creator",    min: "1K+" },
  tastemaker: { label: "Tastemaker", min: "10K+" },
  icon:       { label: "Icon",       min: "100K+" },
};

export const TIER_META: Record<Tier, { label: string; price: number; followers: string; ring: string; chip: string; bg: string }> = {
  bronze:  { label: "Bronze",  price: 0,    followers: "Default",           ring: "ring-amber-700/60",   chip: "bg-amber-700/20 text-amber-300 border-amber-700/40",   bg: "bg-tier-bronze" },
  silver:  { label: "Silver",  price: 200,  followers: "1K+ on Instagram",  ring: "ring-slate-300/70",   chip: "bg-slate-300/15 text-slate-200 border-slate-300/30",   bg: "bg-tier-silver" },
  gold:    { label: "Gold",    price: 500,  followers: "5K+ on Instagram",  ring: "ring-yellow-300/80",  chip: "bg-yellow-300/15 text-yellow-200 border-yellow-300/30", bg: "bg-tier-gold" },
  diamond: { label: "Diamond", price: 1000, followers: "20K+ on Instagram", ring: "ring-fuchsia-300/80", chip: "bg-fuchsia-300/15 text-fuchsia-200 border-fuchsia-300/30", bg: "bg-tier-diamond" },
};

const photo = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?w=1200&q=80&auto=format&fit=crop&sig=${seed}`;

// Helper to build the four-tier perk map for a partner venue.
function cashbackPerks(b: number, s: number, g: number, d: number): Record<Tier, Perk> {
  return {
    bronze:  { kind: "cashback", pct: b, label: `${b}% cashback` },
    silver:  { kind: "cashback", pct: s, label: `${s}% cashback` },
    gold:    { kind: "cashback", pct: g, label: `${g}% cashback` },
    diamond: { kind: "cashback", pct: d, label: `${d}% cashback` },
  };
}
function discountPerks(b: number, s: number, g: number, d: number): Record<Tier, Perk> {
  return {
    bronze:  { kind: "discount", pct: b, label: `${b}% off` },
    silver:  { kind: "discount", pct: s, label: `${s}% off` },
    gold:    { kind: "discount", pct: g, label: `${g}% off` },
    diamond: { kind: "discount", pct: d, label: `${d}% off` },
  };
}

// ───────────────────────────────────────────────────────────────
// Seed: Places (Restaurantes & Bares en Monterrey)
// ───────────────────────────────────────────────────────────────
export const SEED_LISTINGS: Listing[] = [
  {
    id: "koli",
    name: "Koli Cocina de Origen",
    category: "place", subcategory: "Restaurant",
    participation: "partner",
    zone: "San Pedro", priceLevel: 4,
    clubersRating: 4.8, googleRating: 4.7,
    vibes: ["fine dining", "regional", "íntimo"],
    cover: photo("1517248135467-4c7edcad34c4", 1),
    gallery: [photo("1414235077428-338989a2e8c0", 11), photo("1559339352-11d035aa65de", 12), photo("1555396273-367ea4eb4db5", 13)],
    openNow: true, hours: "18:00 – 23:30",
    walkMin: 8,
    description: "Northeast Mexican cuisine by Rodrigo Rivera-Río. Tasting menu with local produce.",
    perks: cashbackPerks(3, 8, 12, 18),
    welcomePerk: { kind: "cashback", pct: 15, label: "15% on your first visit" },
    fiscalType: "formal",
    communityPerks: [
      { communityId: "com-foodies", communityName: "MTY Foodies", kind: "cashback", pct: 14, label: "14% cashback for MTY Foodies" },
    ],
  },
  {
    id: "pangea",
    name: "Pangea",
    category: "place", subcategory: "Restaurant",
    participation: "partner",
    zone: "San Pedro", priceLevel: 4,
    clubersRating: 4.7, googleRating: 4.6,
    vibes: ["fine dining", "special occasion"],
    cover: photo("1466978913421-dad2ebd01d17", 2),
    gallery: [photo("1493770348161-369560ae357d", 21), photo("1559329007-40df8a9345d8", 22)],
    openNow: true, hours: "13:00 – 23:00",
    walkMin: 12,
    description: "Guillermo González Beristáin classic. Mediterranean cuisine with northern produce.",
    perks: cashbackPerks(3, 7, 10, 15),
    welcomePerk: { kind: "cashback", pct: 12, label: "12% on your first visit" },
    fiscalType: "formal",
  },
  {
    id: "lacatarina",
    name: "La Catarina Rooftop",
    category: "place", subcategory: "Rooftop Bar",
    participation: "partner",
    zone: "San Pedro", priceLevel: 3,
    clubersRating: 4.6, googleRating: 4.4,
    vibes: ["rooftop", "sunset", "live music"],
    cover: photo("1572116469696-31de0f17cc34", 3),
    gallery: [photo("1514933651103-005eec06c04b", 31), photo("1470337458703-46ad1756a187", 32)],
    openNow: true, hours: "17:00 – 02:00",
    walkMin: 5,
    description: "Rooftop with views of Cerro de la Silla. Signature cocktails, DJ sets Thu–Sat.",
    perks: discountPerks(5, 10, 15, 20),
    welcomePerk: { kind: "discount", pct: 20, label: "20% on your first drink" },
    fiscalType: "informal",
    communityPerks: [
      { communityId: "com-tec", communityName: "Borregos Tec", kind: "discount", pct: 25, label: "25% off for Tec students" },
      { communityId: "com-roof", communityName: "Rooftop Society MTY", kind: "discount", pct: 30, label: "30% off + skip the line" },
    ],
  },
  {
    id: "lacervecería",
    name: "La Nacional Cervecería",
    category: "place", subcategory: "Bar",
    participation: "partner",
    zone: "Barrio Antiguo", priceLevel: 2,
    clubersRating: 4.5, googleRating: 4.5,
    vibes: ["casual", "beers", "after work"],
    cover: photo("1538488881038-e252a119ace7", 4),
    gallery: [photo("1572116469696-31de0f17cc34", 41)],
    openNow: true, hours: "16:00 – 01:00",
    walkMin: 18,
    description: "Over 80 Mexican craft beer labels. Bar food and trivia on Tuesdays.",
    perks: discountPerks(5, 10, 15, 20),
    welcomePerk: { kind: "discount", pct: 25, label: "25% on your first tab" },
    fiscalType: "informal",
  },
  {
    id: "doloreschico",
    name: "Dolores Chico",
    category: "place", subcategory: "Cafe",
    participation: "listed",
    zone: "Centro", priceLevel: 2,
    clubersRating: 4.6, googleRating: 4.7,
    vibes: ["specialty coffee", "work-friendly", "quiet"],
    cover: photo("1554118811-1e0d58224f24", 5),
    gallery: [photo("1495474472287-4d71bcdd2085", 51)],
    openNow: true, hours: "08:00 – 21:00",
    walkMin: 22,
    description: "Specialty coffee roastery. Beans from Chiapas and Veracruz.",
  },
  {
    id: "fonda",
    name: "Fonda San Francisco",
    category: "place", subcategory: "Restaurant",
    participation: "listed",
    zone: "Centro", priceLevel: 2,
    clubersRating: 4.3, googleRating: 4.4,
    vibes: ["traditional", "family", "set lunch"],
    cover: photo("1555939594-58d7cb561ad1", 6),
    gallery: [photo("1504674900247-0877df9cc836", 61)],
    openNow: false, hours: "12:00 – 18:00",
    walkMin: 25,
    description: "Homestyle northern Mexican cooking since 1978. Cabrito al pastor on weekends.",
  },
  {
    id: "vertigo",
    name: "Vértigo Sky Lounge",
    category: "place", subcategory: "Club",
    participation: "partner",
    zone: "San Pedro", priceLevel: 4,
    clubersRating: 4.4, googleRating: 4.2,
    vibes: ["club", "house", "late night"],
    cover: photo("1571266028243-e1b97f9f6e2c", 7),
    gallery: [photo("1571266028243-e1b97f9f6e2c", 71), photo("1493676304819-0d7a8d026dcf", 72)],
    openNow: true, hours: "22:00 – 04:00",
    walkMin: 10,
    description: "30th-floor club with international line-up. Table reservations with bottle service.",
    perks: cashbackPerks(0, 5, 10, 15),
    welcomePerk: { kind: "cashback", pct: 10, label: "10% on your first table" },
    fiscalType: "informal",
  },
  {
    id: "biko",
    name: "Biko Cocina Vasca",
    category: "place", subcategory: "Restaurant",
    participation: "partner",
    zone: "Valle Oriente", priceLevel: 3,
    clubersRating: 4.5, googleRating: 4.5,
    vibes: ["spanish", "pintxos", "wines"],
    cover: photo("1559329007-40df8a9345d8", 8),
    gallery: [photo("1414235077428-338989a2e8c0", 81)],
    openNow: true, hours: "13:00 – 23:00",
    walkMin: 15,
    description: "Contemporary Basque cuisine, pintxos and a curated wine list.",
    perks: cashbackPerks(4, 8, 12, 16),
    welcomePerk: { kind: "cashback", pct: 12, label: "12% on your first visit" },
    fiscalType: "formal",
  },
  // Experiences — placeholders
  {
    id: "exp-cata",
    name: "Mezcal Tasting",
    category: "experience", subcategory: "Tasting",
    participation: "listed",
    zone: "San Pedro", priceLevel: 3,
    clubersRating: 4.7, googleRating: 4.6,
    vibes: ["guided", "mezcal", "intimate"],
    cover: photo("1551024709-8f23befc6f87", 91),
    gallery: [], openNow: true, hours: "Sat 19:00",
    walkMin: 14,
    description: "Guided tasting of 7 artisan mezcales from Oaxaca, Guerrero and Durango.",
    durationLabel: "2 hrs",
  },
  {
    id: "exp-cook",
    name: "Northern Mexican Cooking Class",
    category: "experience", subcategory: "Class",
    participation: "listed",
    zone: "Centro", priceLevel: 2,
    clubersRating: 4.5, googleRating: 4.4,
    vibes: ["hands-on", "small groups"],
    cover: photo("1556909114-f6e7ad7d3136", 92),
    gallery: [], openNow: true, hours: "Sun 12:00",
    walkMin: 20,
    description: "Learn to make machaca, gorditas and discada with a local chef.",
    durationLabel: "3 hrs",
  },
  // Events — placeholders
  {
    id: "ev-bcn",
    name: "Bad Bunny — World Tour",
    category: "event", subcategory: "Concert",
    participation: "listed",
    zone: "Estadio BBVA", priceLevel: 4,
    clubersRating: 4.9, googleRating: 4.8,
    vibes: ["estadio", "reggaeton"],
    cover: photo("1470229722913-7c0e2dbbafd3", 93),
    gallery: [], openNow: false, hours: "21:00",
    walkMin: 0,
    description: "2026 world tour, Monterrey stop. Tickets in pre-sale.",
    whenLabel: "Sat Mar 14 · 21:00",
  },
  {
    id: "ev-fest",
    name: "Pa'l Norte 2026",
    category: "event", subcategory: "Festival",
    participation: "listed",
    zone: "Parque Fundidora", priceLevel: 4,
    clubersRating: 4.8, googleRating: 4.7,
    vibes: ["festival", "3 days", "indie"],
    cover: photo("1459749411175-04bf5292ceea", 94),
    gallery: [], openNow: false, hours: "Three days",
    walkMin: 0,
    description: "The biggest festival in northern Mexico. Three stages, 100+ artists.",
    whenLabel: "Apr 3–5",
  },
  // ── Communities ───────────────────────────────────────────
  {
    id: "com-tec",
    name: "Borregos Tec",
    category: "community", subcategory: "University",
    participation: "listed",
    zone: "Tec de Monterrey", priceLevel: 1,
    clubersRating: 4.7, googleRating: 0,
    vibes: ["students", "college", "after class"],
    cover: photo("1523580494863-6f3031224c94", 110),
    gallery: [], openNow: true, hours: "Always",
    walkMin: 0,
    description: "Official community of active Tec students. Access to college parties and exclusive discounts near campus.",
    members: 8420,
    entryRule: "Only @tec.mx emails",
    monthlyFee: 0,
    communityKind: "college",
  },
  {
    id: "com-roof",
    name: "Rooftop Society MTY",
    category: "community", subcategory: "Members Club",
    participation: "partner",
    zone: "San Pedro", priceLevel: 3,
    clubersRating: 4.8, googleRating: 0,
    vibes: ["nightlife", "exclusive", "after work"],
    cover: photo("1551918120-9739cb430c6d", 111),
    gallery: [], openNow: true, hours: "Thu–Sat",
    walkMin: 0,
    description: "Private club for fans of the city's best rooftops. Monthly members-only events, VIP lists at partners.",
    members: 612,
    entryRule: "Admin approval",
    monthlyFee: 350,
    communityKind: "members-club",
  },
  {
    id: "com-foodies",
    name: "MTY Foodies",
    category: "community", subcategory: "Open",
    participation: "listed",
    zone: "Monterrey", priceLevel: 1,
    clubersRating: 4.5, googleRating: 0,
    vibes: ["food", "open", "reviews"],
    cover: photo("1414235077428-338989a2e8c0", 112),
    gallery: [], openNow: true, hours: "Always",
    walkMin: 0,
    description: "The largest foodie community in Monterrey. Share reviews, organize meetups and vote on the openings of the month.",
    members: 3140,
    entryRule: "Open to everyone",
    monthlyFee: 0,
    communityKind: "open",
  },
  // ── People ────────────────────────────────────────────────
  {
    id: "per-ana",
    name: "Ana Paula Ríos",
    category: "person", subcategory: "Tastemaker",
    participation: "partner",
    zone: "San Pedro", priceLevel: 1,
    clubersRating: 4.9, googleRating: 0,
    vibes: ["nightlife", "fashion", "foodie"],
    cover: photo("1494790108377-be9c29b29330", 120),
    gallery: [], openNow: true, hours: "—",
    walkMin: 0,
    description: "Wherever she shows up, the place fills. Weekly curation of the city's best rooftops and dinners.",
    handle: "@anapaularz",
    igFollowers: 24800,
    role: "Tastemaker · Nightlife MTY",
    influenceTier: "tastemaker",
  },
  {
    id: "per-diego",
    name: "Diego Salinas",
    category: "person", subcategory: "Creator",
    participation: "listed",
    zone: "Centro", priceLevel: 1,
    clubersRating: 4.6, googleRating: 0,
    vibes: ["coffee", "indie", "music"],
    cover: photo("1500648767791-00dcc994a43e", 121),
    gallery: [], openNow: true, hours: "—",
    walkMin: 0,
    description: "Honest reviews of specialty coffee shops and intimate bars in Centro and Barrio Antiguo.",
    handle: "@diegofromcentro",
    igFollowers: 4200,
    role: "Creator · Coffee & bars",
    influenceTier: "creator",
  },
  {
    id: "per-marina",
    name: "DJ Marina K",
    category: "person", subcategory: "Icon",
    participation: "partner",
    zone: "Valle Oriente", priceLevel: 1,
    clubersRating: 4.9, googleRating: 0,
    vibes: ["dj", "house", "techno"],
    cover: photo("1438761681033-6461ffad8d80", 122),
    gallery: [], openNow: true, hours: "—",
    walkMin: 0,
    description: "Resident at Vértigo. Her sets fill any room she plays. Follow her schedule so you don't miss the next night.",
    handle: "@marinak.dj",
    igFollowers: 142000,
    role: "Resident DJ · Vértigo",
    influenceTier: "icon",
  },
];

// ───────────────────────────────────────────────────────────────
// Strings — Spanish-first. Swap source later for i18n lib.
// ───────────────────────────────────────────────────────────────
export const t = {
  brand: "Clubers",
  tagline: "Your night, curated by AI.",
  nav: { discover: "Discover", saved: "Saved", pay: "Pay", share: "Share", profile: "Profile" },
  discover: {
    ai: "AI Planner", swipe: "Swipe", map: "Map", catalog: "Catalog",
    cats: { place: "Places", experience: "Experiences", event: "Events", community: "Communities", person: "People" },
    aiHero: "What are you in the mood for tonight?",
    aiPlaceholder: "Rooftop dinner and something live, under $800, walking distance in San Pedro…",
    aiBuilding: "Building your night…",
    yourNight: "Your night",
    why: "Why we recommend it",
    swipeHint: "Swipe ↑ to save · ↓ to skip",
    skip: "Skip", saveOrReserve: "Save or Reserve",
    openNow: "Open now", closed: "Closed",
    comingSoon: "Coming soon — restaurants and bars only for now.",
  },
  venue: {
    reserve: "Reserve", saved: "Saved", save: "Save",
    yourPerk: "Your perk today",
    welcome: "Welcome",
    partner: "Verified partner",
    listed: "Listed",
    clubers: "Clubers", google: "Google",
    menu: "Menu", instagram: "Instagram", website: "Website",
    upgradeHint: "Upgrade your class to unlock a better perk →",
    mechanicFormal: "Cashback in Clubers credits · pay by card via Clubers",
    mechanicInformal: "Instant discount on the bill · pay however you want",
    welcomeBanner: "First visit: this perk applies on top of your class.",
    communityPerksTitle: "Group perks unlocked",
    communityPerksLocked: "Perks for groups you don't belong to",
    joinToUnlock: "Join to unlock",
  },
  reserve: {
    title: "Book a table",
    when: "When", time: "Time", party: "Party",
    confirm: "Confirm reservation",
    contacting: "Contacting the venue…",
    contactingDesc: "Our AI agent is talking to the restaurant for you. We'll let you know as soon as they confirm.",
    done: "Reservation sent!",
    doneDesc: "We'll notify you when the venue confirms. In the meantime, it's already in your saved list.",
    close: "Done",
  },
  saved: { title: "Your saves", upcoming: "Upcoming reservations", empty: "Nothing saved yet. Head to Discover and start exploring." },
  qr: { title: "Your QR", desc: "Show this code to your server when paying.", howTitle: "How it works", how: ["Get to the venue and ask for the check.", "Your server scans your QR.", "Pay through the app — cashback credits instantly."] },
  pay: {
    title: "Pay",
    tabQr: "QR",
    tabWallet: "Wallet",
    walletBalance: "Your Clubers credits",
    walletDesc: "You earn credits when you pay by card at formal venues. Spend them at any partner.",
    tx: "Transactions",
    gifts: "Gift cards received",
    noTx: "No transactions yet.",
    noGifts: "You haven't received any gifts yet.",
    storyPending: "Verify your story",
    storyDesc: "Your perk unlocks when you post a story tagging the venue. We detect it automatically.",
  },
  share: { title: "Invite and earn", subtitle: "For every friend who joins with your code, you both get $100 in Clubers credits.", code: "Your code", invite: "Invite friends", giftTitle: "Gift a perk", giftDesc: "Gift a visit with a Gold perk at any partner.", giftCta: "Send gift" },
  giftSub: { title: "Gift a subscription", desc: "Gift a month of Silver, Gold or Diamond. Arrives with your name and activates instantly.", cta: "Choose plan" },
  creator: { title: "Creator program", desc: "If your Instagram has 5K+ followers, every friend who joins with your code earns you revenue share for 6 months.", cta: "Apply for access" },
  profile: {
    title: "Your profile",
    currentClass: "Your current class",
    activePath: "Active path",
    paths: "How you level up",
    pathFollowers: "By Instagram followers",
    pathFollowersDesc: "Connect your IG and we verify automatically.",
    pathFollowersStory: "Requires a story tag at the venue to unlock the perk.",
    pathSub: "By subscription",
    pathSubDesc: "Monthly payment, no story posting required.",
    pathManual: "By invitation",
    pathManualDesc: "Only for influencers verified by our team.",
    pathStateActive: "Active",
    pathStateLocked: "Locked",
    pathStateInactive: "Inactive",
    upgrade: "Upgrade class",
    current: "Current",
    choosePlan: "Choose your plan",
    perMonth: "/mo",
    select: "Select",
    perksTitle: "What's included",
    bronzePerks: ["Welcome coupons", "Catalog access"],
    silverPerks: ["5–10% cashback/discount", "Priority access at bars"],
    goldPerks: ["10–15% cashback/discount", "Priority on reservations", "Guaranteed table at partners"],
    diamondPerks: ["15–20% cashback/discount", "Monthly comps", "Access to private events"],
    stats: "Your numbers",
    visits: "Visits", saved: "Saved", credits: "Credits",
    ig: "Instagram connected",
    settings: "Settings",
    gamification: "Your progress",
    levelLabel: "Level",
    xpLabel: "XP",
    streakLabel: "Streak",
    badgesLabel: "Badges",
    myGroups: "Your groups",
    myGroupsDesc: "Everything you belong to. Each group unlocks its own perks at venues across the city.",
    classGroup: "Class",
    influenceGroup: "Influence",
    communityGroups: "Communities",
    joinMore: "Browse communities",
    leaveGroup: "Leave",
  },
  common: { back: "Back", close: "Close", continue: "Continue" },
};

// ───────────────────────────────────────────────────────────────
// Mock service layer — swap for Edge Function calls later.
// ───────────────────────────────────────────────────────────────
export const clubersApi = {
  listListings: async (cat?: Category): Promise<Listing[]> =>
    cat ? SEED_LISTINGS.filter(l => l.category === cat) : SEED_LISTINGS,
  getListing: async (id: string): Promise<Listing | undefined> =>
    SEED_LISTINGS.find(l => l.id === id),
  aiPlan: async (_query: string): Promise<Listing[]> => {
    // Deterministic "plan" for the demo — a curated 3-card night.
    const ids = ["lacatarina", "koli", "vertigo"];
    return SEED_LISTINGS.filter(l => ids.includes(l.id));
  },
  createReservation: async (_listingId: string, _payload: { date: string; time: string; party: number }) => {
    await new Promise(r => setTimeout(r, 1400));
    return { id: `res_${Math.random().toString(36).slice(2, 8)}`, status: "pending" as const };
  },
};

// ───────────────────────────────────────────────────────────────
// Class paths (Mesita primitive ported to Clubers)
// Active class = highest of the three paths.
// ───────────────────────────────────────────────────────────────
export type PathState = "active" | "inactive" | "locked";

export interface FollowersPath {
  state: PathState;
  handle: string;
  followers: number;
  tier: Tier; // tier this path qualifies for
  storyRequired: boolean;
}
export interface SubscriptionPath {
  state: PathState;
  tier: Tier | null;
  since?: string;
  renewsOn?: string;
}
export interface ManualPath {
  state: PathState;
  tier: Tier | null;
  reason?: string;
}
export interface ClassPaths {
  followers: FollowersPath;
  subscription: SubscriptionPath;
  manual: ManualPath;
}

// Community membership held by the user (Mesita's "groups" primitive,
// generalized). A user can hold many at once and each community can gate
// perks at venues across the platform.
export interface Membership {
  communityId: string;       // matches a Listing.id where category === "community"
  joinedOn: string;
  role?: "member" | "admin";
}

// Tier ladder helpers
const TIER_RANK: Record<Tier, number> = { bronze: 0, silver: 1, gold: 2, diamond: 3 };
export function tierFromFollowers(n: number): Tier {
  if (n >= 20000) return "diamond";
  if (n >= 5000) return "gold";
  if (n >= 1000) return "silver";
  return "bronze";
}
export function resolveActiveTier(p: ClassPaths): { tier: Tier; source: keyof ClassPaths } {
  const candidates: Array<{ tier: Tier; source: keyof ClassPaths }> = [
    { tier: p.followers.state === "active" ? p.followers.tier : "bronze", source: "followers" },
    { tier: p.subscription.state === "active" && p.subscription.tier ? p.subscription.tier : "bronze", source: "subscription" },
    { tier: p.manual.state === "active" && p.manual.tier ? p.manual.tier : "bronze", source: "manual" },
  ];
  return candidates.reduce((best, c) => TIER_RANK[c.tier] > TIER_RANK[best.tier] ? c : best, candidates[0]);
}

// ───────────────────────────────────────────────────────────────
// Wallet & gamification
// ───────────────────────────────────────────────────────────────
export interface WalletTx {
  id: string;
  kind: "earned" | "spent" | "gift" | "refund";
  amount: number; // MXN
  venue: string;
  when: string;  // "Hoy 21:14" etc
}
export interface GiftCard {
  id: string;
  from: string;
  amount: number;
  message?: string;
}
export interface WalletState {
  credits: number;
  transactions: WalletTx[];
  giftCards: GiftCard[];
}

export type LevelName = "Explorer" | "Regular" | "Tastemaker" | "Connoisseur" | "Icon";
export interface Gamification {
  xp: number;
  xpToNext: number;
  level: LevelName;
  streak: number;        // consecutive weeks with at least one visit
  badges: Array<{ id: string; label: string; emoji: string }>;
}

// ───────────────────────────────────────────────────────────────
// Seed user — used by the prototype as the current logged-in guest.
// ───────────────────────────────────────────────────────────────
export const SEED_USER = {
  name: "Daniel R.",
  handle: "@daniel",
  email: "daniel@tec.mx",
  paths: {
    followers: { state: "active" as PathState, handle: "@daniel", followers: 2300, tier: tierFromFollowers(2300), storyRequired: true },
    subscription: { state: "active" as PathState, tier: "silver" as Tier, since: "Oct 2025", renewsOn: "Dec 14" },
    manual: { state: "locked" as PathState, tier: null },
  } as ClassPaths,
  // The user belongs to many groups at once — class (paths) is one, influence
  // is auto-derived from followers, and these are the custom communities they
  // hold. Each unlocks venue-side perks targeted at that community.
  memberships: [
    { communityId: "com-tec",     joinedOn: "Aug 2024", role: "member" },
    { communityId: "com-foodies", joinedOn: "Mar 2025", role: "member" },
  ] as Membership[],
  // Auto-derived from IG followers (2.3K → "creator" influence tier).
  influenceTier: "creator" as NonNullable<Listing["influenceTier"]>,
  wallet: {
    credits: 240,
    transactions: [
      { id: "tx1", kind: "earned", amount: 96,  venue: "Koli",            when: "Today 21:14" },
      { id: "tx2", kind: "spent",  amount: 50,  venue: "Biko",            when: "Yesterday 14:32" },
      { id: "tx3", kind: "earned", amount: 38,  venue: "Pangea",          when: "Fri 19:08" },
      { id: "tx4", kind: "gift",   amount: 100, venue: "From: Sofía R.",  when: "Wed 11:00" },
      { id: "tx5", kind: "earned", amount: 56,  venue: "Koli",            when: "Tue 22:40" },
    ],
    giftCards: [
      { id: "g1", from: "Sofía R.", amount: 100, message: "Happy birthday!" },
    ],
  } as WalletState,
  gamification: {
    xp: 1280,
    xpToNext: 2000,
    level: "Tastemaker" as LevelName,
    streak: 4,
    badges: [
      { id: "b1", label: "Rooftop King",   emoji: "🌆" },
      { id: "b2", label: "First Sip",      emoji: "🥂" },
      { id: "b3", label: "Diamond Closer", emoji: "💎" },
      { id: "b4", label: "MTY Local",      emoji: "📍" },
    ],
  } as Gamification,
};