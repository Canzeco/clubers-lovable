// Clubers — domain types + seed data + mock service layer.
// Designed so the UI never talks to a backend directly. Swap the
// functions in `clubersApi` for Supabase Edge Function calls later.

export type Tier = "bronze" | "silver" | "gold" | "diamond";
export type Category = "place" | "experience" | "event";
export type Participation = "listed" | "partner";
export type PerkKind = "cashback" | "discount";

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
  // For events
  whenLabel?: string; // "Vie 14 dic · 22:00"
  // For experiences
  durationLabel?: string;
}

export const TIERS: Tier[] = ["bronze", "silver", "gold", "diamond"];

export const TIER_META: Record<Tier, { label: string; price: number; followers: string; ring: string; chip: string; bg: string }> = {
  bronze:  { label: "Bronze",  price: 0,    followers: "Por defecto",       ring: "ring-amber-700/60",   chip: "bg-amber-700/20 text-amber-300 border-amber-700/40",   bg: "bg-tier-bronze" },
  silver:  { label: "Silver",  price: 200,  followers: "1K+ en Instagram",  ring: "ring-slate-300/70",   chip: "bg-slate-300/15 text-slate-200 border-slate-300/30",   bg: "bg-tier-silver" },
  gold:    { label: "Gold",    price: 500,  followers: "5K+ en Instagram",  ring: "ring-yellow-300/80",  chip: "bg-yellow-300/15 text-yellow-200 border-yellow-300/30", bg: "bg-tier-gold" },
  diamond: { label: "Diamond", price: 1000, followers: "20K+ en Instagram", ring: "ring-fuchsia-300/80", chip: "bg-fuchsia-300/15 text-fuchsia-200 border-fuchsia-300/30", bg: "bg-tier-diamond" },
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
    bronze:  { kind: "discount", pct: b, label: `${b}% descuento` },
    silver:  { kind: "discount", pct: s, label: `${s}% descuento` },
    gold:    { kind: "discount", pct: g, label: `${g}% descuento` },
    diamond: { kind: "discount", pct: d, label: `${d}% descuento` },
  };
}

// ───────────────────────────────────────────────────────────────
// Seed: Places (Restaurantes & Bares en Monterrey)
// ───────────────────────────────────────────────────────────────
export const SEED_LISTINGS: Listing[] = [
  {
    id: "koli",
    name: "Koli Cocina de Origen",
    category: "place", subcategory: "Restaurante",
    participation: "partner",
    zone: "San Pedro", priceLevel: 4,
    clubersRating: 4.8, googleRating: 4.7,
    vibes: ["fine dining", "regional", "íntimo"],
    cover: photo("1517248135467-4c7edcad34c4", 1),
    gallery: [photo("1414235077428-338989a2e8c0", 11), photo("1559339352-11d035aa65de", 12), photo("1555396273-367ea4eb4db5", 13)],
    openNow: true, hours: "18:00 – 23:30",
    walkMin: 8,
    description: "Cocina del noreste mexicano por Rodrigo Rivera-Río. Menú degustación con producto local.",
    perks: cashbackPerks(3, 8, 12, 18),
    welcomePerk: { kind: "cashback", pct: 15, label: "15% en tu primera visita" },
  },
  {
    id: "pangea",
    name: "Pangea",
    category: "place", subcategory: "Restaurante",
    participation: "partner",
    zone: "San Pedro", priceLevel: 4,
    clubersRating: 4.7, googleRating: 4.6,
    vibes: ["alta cocina", "ocasión especial"],
    cover: photo("1466978913421-dad2ebd01d17", 2),
    gallery: [photo("1493770348161-369560ae357d", 21), photo("1559329007-40df8a9345d8", 22)],
    openNow: true, hours: "13:00 – 23:00",
    walkMin: 12,
    description: "Clásico de Guillermo González Beristáin. Cocina mediterránea con producto del norte.",
    perks: cashbackPerks(3, 7, 10, 15),
    welcomePerk: { kind: "cashback", pct: 12, label: "12% en tu primera visita" },
  },
  {
    id: "lacatarina",
    name: "La Catarina Rooftop",
    category: "place", subcategory: "Rooftop Bar",
    participation: "partner",
    zone: "San Pedro", priceLevel: 3,
    clubersRating: 4.6, googleRating: 4.4,
    vibes: ["rooftop", "atardecer", "música en vivo"],
    cover: photo("1572116469696-31de0f17cc34", 3),
    gallery: [photo("1514933651103-005eec06c04b", 31), photo("1470337458703-46ad1756a187", 32)],
    openNow: true, hours: "17:00 – 02:00",
    walkMin: 5,
    description: "Rooftop con vista al Cerro de la Silla. Coctelería de autor, dj sets jueves a sábado.",
    perks: discountPerks(5, 10, 15, 20),
    welcomePerk: { kind: "discount", pct: 20, label: "20% en tu primer trago" },
  },
  {
    id: "lacervecería",
    name: "La Nacional Cervecería",
    category: "place", subcategory: "Bar",
    participation: "partner",
    zone: "Barrio Antiguo", priceLevel: 2,
    clubersRating: 4.5, googleRating: 4.5,
    vibes: ["casual", "cervezas", "after work"],
    cover: photo("1538488881038-e252a119ace7", 4),
    gallery: [photo("1572116469696-31de0f17cc34", 41)],
    openNow: true, hours: "16:00 – 01:00",
    walkMin: 18,
    description: "Más de 80 etiquetas de cerveza artesanal mexicana. Cocina de bar y trivia los martes.",
    perks: discountPerks(5, 10, 15, 20),
    welcomePerk: { kind: "discount", pct: 25, label: "25% en tu primera cuenta" },
  },
  {
    id: "doloreschico",
    name: "Dolores Chico",
    category: "place", subcategory: "Café",
    participation: "listed",
    zone: "Centro", priceLevel: 2,
    clubersRating: 4.6, googleRating: 4.7,
    vibes: ["café especialidad", "trabajar", "tranquilo"],
    cover: photo("1554118811-1e0d58224f24", 5),
    gallery: [photo("1495474472287-4d71bcdd2085", 51)],
    openNow: true, hours: "08:00 – 21:00",
    walkMin: 22,
    description: "Tostaduría de café de especialidad. Granos de Chiapas y Veracruz.",
  },
  {
    id: "fonda",
    name: "Fonda San Francisco",
    category: "place", subcategory: "Restaurante",
    participation: "listed",
    zone: "Centro", priceLevel: 2,
    clubersRating: 4.3, googleRating: 4.4,
    vibes: ["tradicional", "familiar", "comida corrida"],
    cover: photo("1555939594-58d7cb561ad1", 6),
    gallery: [photo("1504674900247-0877df9cc836", 61)],
    openNow: false, hours: "12:00 – 18:00",
    walkMin: 25,
    description: "Cocina norteña casera desde 1978. Cabrito al pastor los fines de semana.",
  },
  {
    id: "vertigo",
    name: "Vértigo Sky Lounge",
    category: "place", subcategory: "Club",
    participation: "partner",
    zone: "San Pedro", priceLevel: 4,
    clubersRating: 4.4, googleRating: 4.2,
    vibes: ["club", "house", "noche larga"],
    cover: photo("1571266028243-e1b97f9f6e2c", 7),
    gallery: [photo("1571266028243-e1b97f9f6e2c", 71), photo("1493676304819-0d7a8d026dcf", 72)],
    openNow: true, hours: "22:00 – 04:00",
    walkMin: 10,
    description: "Club en el piso 30 con line-up internacional. Reserva de mesa con bottle service.",
    perks: cashbackPerks(0, 5, 10, 15),
    welcomePerk: { kind: "cashback", pct: 10, label: "10% en tu primera mesa" },
  },
  {
    id: "biko",
    name: "Biko Cocina Vasca",
    category: "place", subcategory: "Restaurante",
    participation: "partner",
    zone: "Valle Oriente", priceLevel: 3,
    clubersRating: 4.5, googleRating: 4.5,
    vibes: ["española", "pintxos", "vinos"],
    cover: photo("1559329007-40df8a9345d8", 8),
    gallery: [photo("1414235077428-338989a2e8c0", 81)],
    openNow: true, hours: "13:00 – 23:00",
    walkMin: 15,
    description: "Cocina vasca contemporánea, pintxos y carta de vinos curada.",
    perks: cashbackPerks(4, 8, 12, 16),
    welcomePerk: { kind: "cashback", pct: 12, label: "12% en tu primera visita" },
  },
  // Experiences — placeholders
  {
    id: "exp-cata",
    name: "Cata de Mezcales",
    category: "experience", subcategory: "Cata",
    participation: "listed",
    zone: "San Pedro", priceLevel: 3,
    clubersRating: 4.7, googleRating: 4.6,
    vibes: ["guiada", "mezcal", "íntimo"],
    cover: photo("1551024709-8f23befc6f87", 91),
    gallery: [], openNow: true, hours: "Sáb 19:00",
    walkMin: 14,
    description: "Cata guiada de 7 mezcales artesanales de Oaxaca, Guerrero y Durango.",
    durationLabel: "2 hrs",
  },
  {
    id: "exp-cook",
    name: "Clase de Cocina Norteña",
    category: "experience", subcategory: "Clase",
    participation: "listed",
    zone: "Centro", priceLevel: 2,
    clubersRating: 4.5, googleRating: 4.4,
    vibes: ["hands-on", "grupos pequeños"],
    cover: photo("1556909114-f6e7ad7d3136", 92),
    gallery: [], openNow: true, hours: "Dom 12:00",
    walkMin: 20,
    description: "Aprende a hacer machaca, gorditas y discada con un chef local.",
    durationLabel: "3 hrs",
  },
  // Events — placeholders
  {
    id: "ev-bcn",
    name: "Bad Bunny — World Tour",
    category: "event", subcategory: "Concierto",
    participation: "listed",
    zone: "Estadio BBVA", priceLevel: 4,
    clubersRating: 4.9, googleRating: 4.8,
    vibes: ["estadio", "reggaeton"],
    cover: photo("1470229722913-7c0e2dbbafd3", 93),
    gallery: [], openNow: false, hours: "21:00",
    walkMin: 0,
    description: "Gira mundial 2026, parada Monterrey. Entradas en preventa.",
    whenLabel: "Sáb 14 mar · 21:00",
  },
  {
    id: "ev-fest",
    name: "Pa'l Norte 2026",
    category: "event", subcategory: "Festival",
    participation: "listed",
    zone: "Parque Fundidora", priceLevel: 4,
    clubersRating: 4.8, googleRating: 4.7,
    vibes: ["festival", "3 días", "indie"],
    cover: photo("1459749411175-04bf5292ceea", 94),
    gallery: [], openNow: false, hours: "Tres días",
    walkMin: 0,
    description: "El festival más grande del norte. Tres escenarios, +100 artistas.",
    whenLabel: "3–5 abr",
  },
];

// ───────────────────────────────────────────────────────────────
// Strings — Spanish-first. Swap source later for i18n lib.
// ───────────────────────────────────────────────────────────────
export const t = {
  brand: "Clubers",
  tagline: "Tu noche, curada por AI.",
  nav: { discover: "Descubre", saved: "Guarda", qr: "QR", share: "Comparte", profile: "Perfil" },
  discover: {
    ai: "AI Planner", swipe: "Swipe", map: "Mapa", catalog: "Catálogo",
    cats: { place: "Lugares", experience: "Experiencias", event: "Eventos" },
    aiHero: "¿Qué se te antoja esta noche?",
    aiPlaceholder: "Cena en rooftop y algo en vivo, bajo $800, caminando en San Pedro…",
    aiBuilding: "Armando tu noche…",
    yourNight: "Tu noche",
    why: "Por qué te lo recomendamos",
    swipeHint: "Desliza ↑ para guardar · ↓ para pasar",
    openNow: "Abierto ahora", closed: "Cerrado",
    comingSoon: "Próximamente — ahora solo restaurantes y bares.",
  },
  venue: {
    reserve: "Reservar", saved: "Guardado", save: "Guardar",
    yourPerk: "Tu beneficio hoy",
    welcome: "Bienvenida",
    partner: "Partner verificado",
    listed: "Listado",
    clubers: "Clubers", google: "Google",
    menu: "Menú", instagram: "Instagram", website: "Sitio",
    upgradeHint: "Sube de clase para mejorar este beneficio →",
  },
  reserve: {
    title: "Reservar mesa",
    when: "Cuándo", time: "Hora", party: "Personas",
    confirm: "Confirmar reservación",
    contacting: "Contactando al venue…",
    contactingDesc: "Nuestro agente AI está hablando con el restaurante por ti. Te avisamos en cuanto confirmen.",
    done: "¡Reservación enviada!",
    doneDesc: "Te notificaremos cuando el venue confirme. Mientras, ya está en tu lista de guardados.",
    close: "Listo",
  },
  saved: { title: "Tus guardados", upcoming: "Próximas reservaciones", empty: "Aún no has guardado nada. Vé a Descubre y empieza a explorar." },
  qr: { title: "Tu QR", desc: "Muestra este código al mesero al pagar.", howTitle: "Cómo funciona", how: ["Llega al venue y pide la cuenta.", "El mesero escanea tu QR.", "Pagas con la app — el cashback se acredita al instante."] },
  share: { title: "Invita y gana", subtitle: "Por cada amigo que se una con tu código, ambos ganan $100 en créditos Clubers.", code: "Tu código", invite: "Invitar amigos", giftTitle: "Regala un beneficio", giftDesc: "Regala una visita con perk Gold en cualquier partner.", giftCta: "Enviar regalo" },
  profile: {
    title: "Tu perfil",
    currentClass: "Tu clase actual",
    paths: "Cómo subes de clase",
    pathFollowers: "Por seguidores en Instagram",
    pathFollowersDesc: "Conecta tu IG y verificamos automáticamente.",
    pathSub: "Por suscripción",
    pathSubDesc: "Pago mensual, sin tener que postear historia.",
    pathManual: "Por invitación",
    pathManualDesc: "Solo para influencers verificados por nuestro equipo.",
    upgrade: "Subir de clase",
    current: "Actual",
    choosePlan: "Elige tu plan",
    perMonth: "/mes",
    select: "Elegir",
    perksTitle: "Qué incluye",
    bronzePerks: ["Coupons Welcome", "Acceso al catálogo"],
    silverPerks: ["5–10% cashback/descuento", "Acceso prioritario en bares"],
    goldPerks: ["10–15% cashback/descuento", "Prioridad en reservaciones", "Mesa garantizada en partners"],
    diamondPerks: ["15–20% cashback/descuento", "Cortesías mensuales", "Acceso a eventos privados"],
    stats: "Tus números",
    visits: "Visitas", saved: "Guardados", credits: "Créditos",
    ig: "Instagram conectada",
    settings: "Ajustes",
  },
  common: { back: "Volver", close: "Cerrar", continue: "Continuar" },
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