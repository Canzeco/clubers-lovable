import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Sparkles, Compass, MapPin, LayoutGrid, Bookmark, QrCode, Share2, User,
  Star, BadgeCheck, ChevronLeft, ChevronRight, Calendar, Clock, Users,
  X, ArrowUp, ArrowDown, Loader2, Send, Gift, Copy, Instagram, Globe,
  Crown, Check, Lock, Heart, Wallet, Settings, ArrowRight, Flame,
  TrendingUp, CircleDollarSign, ArrowDownLeft, ArrowUpRight, ShoppingBag,
  Bot, Wrench, Smartphone,
  Eye, EyeOff, Search,
} from "lucide-react";
import {
  SEED_LISTINGS, TIERS, TIER_META, INFLUENCE_META, SEED_USER, clubersApi, t,
  resolveActiveTier, type Listing, type Category, type Tier, type ClassPaths, type IdentityClaim,
} from "@/lib/clubers/data";

// Mock — which identity claims the logged-in user has already cleared on
// Mesita. Apps that require these get to auto-skip the corresponding step.
// In production this is sourced from the user's profile + verifier status.
const USER_CLAIMS: Set<IdentityClaim> = new Set(["face", "ig", "location"]);
const CLAIM_META: Record<IdentityClaim, { label: string; emoji: string }> = {
  face:     { label: "Face",      emoji: "🙂" },
  voice:    { label: "Voice",     emoji: "🎙️" },
  ig:       { label: "Instagram", emoji: "📸" },
  age:      { label: "Age",       emoji: "🎂" },
  location: { label: "Location",  emoji: "📍" },
  id:       { label: "Gov ID",    emoji: "🪪" },
  medical:  { label: "Medical",   emoji: "🩺" },
};

/* ============================================================
   Clubers — Consumer Web App
   Mobile-first. Premium dark nightlife aesthetic.
   Section structure: Discover · Saved · QR · Share · Profile
   ============================================================ */

type Tab = "discover" | "saved" | "pay" | "share" | "profile";
type DiscoverMode = "ai" | "swipe" | "map" | "catalog";

export function ConsumerApp() {
  const [tab, setTab] = useState<Tab>("discover");
  const [paths, setPaths] = useState<ClassPaths>(SEED_USER.paths);
  const tier = resolveActiveTier(paths).tier;
  const [saved, setSaved] = useState<Set<string>>(new Set(["koli", "lacatarina"]));
  // Multi-group membership engine — user belongs to many communities at once.
  const [memberships, setMemberships] = useState<Set<string>>(
    new Set(SEED_USER.memberships.map(m => m.communityId))
  );
  const toggleMembership = (communityId: string) =>
    setMemberships(prev => {
      const next = new Set(prev);
      if (next.has(communityId)) next.delete(communityId); else next.add(communityId);
      return next;
    });
  const [reservations, setReservations] = useState<Array<{ id: string; listingId: string; when: string; party: number; status: "pending" | "confirmed" }>>([]);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [reserveFor, setReserveFor] = useState<Listing | null>(null);

  const toggleSaved = (id: string) =>
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const addReservation = (l: Listing, when: string, party: number) =>
    setReservations(r => [...r, { id: `res_${Date.now()}`, listingId: l.id, when, party, status: "pending" }]);

  return (
    <div className="dark relative h-full w-full overflow-hidden bg-[oklch(0.10_0.02_280)] text-foreground">
      {/* Ambient gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-90"
           style={{ background: "radial-gradient(900px 500px at 10% -10%, oklch(0.45 0.22 320 / 0.35), transparent 60%), radial-gradient(700px 500px at 110% 10%, oklch(0.55 0.22 22 / 0.30), transparent 60%)" }} />

      <div className="relative flex h-full flex-col">
        {/* SECTION SWITCH */}
        <main className="relative flex-1 overflow-hidden">
          {tab === "discover" && (
            <Discover
              tier={tier} saved={saved} onToggleSave={toggleSaved}
              onOpenListing={setActiveListing} onReserve={setReserveFor}
              memberships={memberships} onToggleMembership={toggleMembership}
            />
          )}
          {tab === "saved" && (
            <Saved
              tier={tier} saved={saved} reservations={reservations}
              onOpen={setActiveListing} onToggleSave={toggleSaved}
            />
          )}
          {tab === "pay" && <PayScreen tier={tier} />}
          {tab === "share" && <ShareScreen />}
          {tab === "profile" && (
            <Profile
              tier={tier} paths={paths} onUpgrade={() => setShowUpgrade(true)}
              savedCount={saved.size}
              memberships={memberships}
              onLeaveMembership={toggleMembership}
            />
          )}
        </main>

        <BottomNav tab={tab} onChange={setTab} />
      </div>

      {/* Overlays */}
      {activeListing && (
        <VenueDetail
          listing={activeListing} tier={tier} saved={saved.has(activeListing.id)}
          onClose={() => setActiveListing(null)}
          onToggleSave={() => toggleSaved(activeListing.id)}
          onReserve={() => { setReserveFor(activeListing); setActiveListing(null); }}
          onUpgrade={() => { setActiveListing(null); setShowUpgrade(true); }}
          memberships={memberships}
          onJoinCommunity={toggleMembership}
        />
      )}
      {reserveFor && (
        reserveFor.category === "community" ? (
          <JoinCommunitySheet
            listing={reserveFor}
            alreadyMember={memberships.has(reserveFor.id)}
            onClose={() => setReserveFor(null)}
            onDone={() => {
              if (!memberships.has(reserveFor.id)) toggleMembership(reserveFor.id);
              setSaved(p => new Set(p).add(reserveFor.id));
              setReserveFor(null);
            }}
          />
        ) : (
          <ReserveSheet
            listing={reserveFor}
            onClose={() => setReserveFor(null)}
            onDone={(when, party) => { addReservation(reserveFor, when, party); setSaved(p => new Set(p).add(reserveFor.id)); setReserveFor(null); setTab("saved"); }}
          />
        )
      )}
      {showUpgrade && (
        <UpgradeScreen tier={tier} onClose={() => setShowUpgrade(false)} onSelect={(newTier) => {
          setPaths(p => ({ ...p, subscription: { ...p.subscription, state: newTier === "bronze" ? "inactive" : "active", tier: newTier === "bronze" ? null : newTier } }));
          setShowUpgrade(false);
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Bottom Nav
   ───────────────────────────────────────────────────────────── */
function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const items: Array<{ id: Tab; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { id: "discover", label: t.nav.discover, Icon: Compass },
    { id: "saved",    label: t.nav.saved,    Icon: Bookmark },
    { id: "pay",      label: t.nav.pay,      Icon: QrCode },
    { id: "share",    label: t.nav.share,    Icon: Share2 },
    { id: "profile",  label: t.nav.profile,  Icon: User },
  ];
  return (
    <nav className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-md grid-cols-5 px-2 pb-3 pt-2">
        {items.map(({ id, label, Icon }) => {
          const active = tab === id;
          if (id === "profile") {
            return (
              <button key={id} onClick={() => onChange(id)}
                className={`group flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-medium transition ${active ? "text-fuchsia-300" : "text-white/55 hover:text-white/80"}`}>
                <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 p-[1.5px] transition ${active ? "scale-110 ring-2 ring-fuchsia-300/60" : ""}`}>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-black/70">
                    <User className="h-3 w-3 text-white" />
                  </div>
                </div>
                <span className="tracking-wide">{label}</span>
              </button>
            );
          }
          return (
            <button key={id} onClick={() => onChange(id)}
              className={`group flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-medium transition ${active ? "text-fuchsia-300" : "text-white/55 hover:text-white/80"}`}>
              <Icon className={`h-5 w-5 transition ${active ? "scale-110" : ""}`} />
              <span className="tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   DISCOVER
   ───────────────────────────────────────────────────────────── */
function Discover({
  tier, saved, onToggleSave, onOpenListing, onReserve, memberships, onToggleMembership,
}: {
  tier: Tier; saved: Set<string>;
  onToggleSave: (id: string) => void;
  onOpenListing: (l: Listing) => void;
  onReserve: (l: Listing) => void;
  memberships: Set<string>;
  onToggleMembership: (communityId: string) => void;
}) {
  const [mode, setMode] = useState<DiscoverMode>("ai");
  const [cat, setCat] = useState<Category | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [city, setCity] = useState("Monterrey");
  const [when, setWhen] = useState<{ day: string; time: string }>({ day: "Tonight", time: "8PM" });
  const [picker, setPicker] = useState<null | "what" | "where" | "when">(null);

  const CITIES = ["Monterrey", "San Pedro", "CDMX", "Guadalajara", "Tulum", "Mérida"];
  const DAYS = ["Tonight", "Tomorrow", "This weekend", "Next week"];
  const TIMES = ["6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "Late"];
  const CATS: Category[] = ["place", "event", "community", "person", "product", "service", "app"];

  const subcategories = useMemo(() => {
    const set = new Set<string>();
    if (!cat) return [];
    for (const l of SEED_LISTINGS) if (l.category === cat && l.subcategory) set.add(l.subcategory);
    return Array.from(set);
  }, [cat]);

  const listings = useMemo(
    () => SEED_LISTINGS.filter(l => (!cat || l.category === cat) && (!sub || l.subcategory === sub)),
    [cat, sub],
  );

  return (
    <div className="relative flex h-full flex-col">
      {/* Header — Mesita-style top bar (floats over swipe deck) */}
      <header className={`px-4 pt-4 ${mode === "swipe" ? "absolute inset-x-0 top-0 z-20" : "relative"}`}>
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white shadow-lg shadow-fuchsia-500/30">
            <span className="font-serif text-lg font-bold leading-none">M</span>
          </div>
          <div className="flex flex-1 items-center divide-x divide-white/10 rounded-full border border-white/10 bg-white/[0.04] px-1 py-1.5">
            <button
              type="button"
              onClick={() => setPicker(p => p === "what" ? null : "what")}
              className={`flex flex-1 items-center gap-2 px-3 text-left transition ${picker === "what" ? "text-fuchsia-200" : ""}`}
            >
              <Sparkles className="h-4 w-4 text-fuchsia-300" />
              <div className="leading-tight">
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">What</p>
                <p className="font-display text-[13px] font-semibold">{cat ? t.discover.cats[cat] : "All"}</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPicker(p => p === "where" ? null : "where")}
              className={`flex flex-1 items-center gap-2 px-3 text-left transition ${picker === "where" ? "text-fuchsia-200" : ""}`}
            >
              <MapPin className="h-4 w-4 text-fuchsia-300" />
              <div className="leading-tight">
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">Where</p>
                <p className="font-display text-[13px] font-semibold">{city}</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPicker(p => p === "when" ? null : "when")}
              className={`flex flex-1 items-center gap-2 px-3 text-left transition ${picker === "when" ? "text-fuchsia-200" : ""}`}
            >
              <Calendar className="h-4 w-4 text-fuchsia-300" />
              <div className="leading-tight">
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">When <span className="ml-0.5 text-white/70">{when.time}</span></p>
                <p className="font-display text-[13px] font-semibold">{when.day}</p>
              </div>
            </button>
          </div>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg ${TIER_META[tier].bg}`}>
            {tier[0].toUpperCase()}
          </div>
        </div>

        {/* Mode segmented control — Mesita style */}
        <div className="mt-4 flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {([
            { id: "swipe" as const,   Icon: Flame,      label: t.discover.swipe },
            { id: "catalog" as const, Icon: LayoutGrid, label: t.discover.catalog },
            { id: "map" as const,     Icon: MapPin,     label: t.discover.map },
            { id: "ai" as const,      Icon: Sparkles,   label: t.discover.ai },
          ]).map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setMode(id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium transition ${mode === id ? "bg-white text-black" : "text-white/65"}`}>
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Filter sheet — covers the phone emulator only */}
      {picker && (
        <div className="absolute inset-0 z-[100] flex flex-col bg-[oklch(0.10_0.02_280)]/98 backdrop-blur-xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="font-display text-base font-semibold">Filters</p>
            <button onClick={() => setPicker(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <section>
              <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">What are you looking for</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button onClick={() => { setCat(null); setSub(null); }}
                  className={`col-span-2 flex items-center justify-between rounded-xl border px-3 py-3 text-sm transition ${cat === null ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/75 hover:bg-white/5"}`}>
                  <span className="font-medium">All</span>
                  {cat === null && <Check className="h-4 w-4 text-fuchsia-300" />}
                </button>
                {CATS.map(c => (
                  <button key={c} onClick={() => { if (c !== cat) setSub(null); setCat(c); }}
                    className={`flex items-center justify-between rounded-xl border px-3 py-3 text-sm transition ${cat === c ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/75 hover:bg-white/5"}`}>
                    <span className="font-medium">{t.discover.cats[c]}</span>
                    {cat === c && <Check className="h-4 w-4 text-fuchsia-300" />}
                  </button>
                ))}
              </div>
            </section>

            {subcategories.length > 0 && (
              <section className="mt-6">
                <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Type of {cat ? t.discover.cats[cat].toLowerCase() : ""}</p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setSub(null)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${sub === null ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/65"}`}>
                    All
                  </button>
                  {subcategories.map(s => (
                    <button key={s} onClick={() => setSub(s === sub ? null : s)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${sub === s ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/65"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-6">
              <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Where</p>
              <div className="flex flex-wrap gap-1.5">
                {CITIES.map(c => (
                  <button key={c} onClick={() => setCity(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${city === c ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/65"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </section>

            {(cat === "event" || cat === "place") && (
              <>
                <section className="mt-6">
                  <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Day</p>
                  <div className="flex flex-wrap gap-1.5">
                    {DAYS.map(d => (
                      <button key={d} onClick={() => setWhen(w => ({ ...w, day: d }))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${when.day === d ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/65"}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </section>

                {cat === "event" && (
                  <section className="mt-6">
                    <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Time</p>
                    <div className="flex flex-wrap gap-1.5">
                      {TIMES.map(tm => (
                        <button key={tm} onClick={() => setWhen(w => ({ ...w, time: tm }))}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${when.time === tm ? "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100" : "border-white/10 text-white/65"}`}>
                          {tm}
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>

          <div className="shrink-0 border-t border-white/10 bg-[oklch(0.10_0.02_280)]/95 px-4 py-3">
            <div className="flex items-center gap-2">
              <button onClick={() => { setCat(null); setSub(null); setCity("Monterrey"); setWhen({ day: "Tonight", time: "8PM" }); }}
                className="rounded-full border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/70 hover:text-white">
                Reset
              </button>
              <button onClick={() => setPicker(null)}
                className="flex-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 py-2.5 text-sm font-semibold text-white">
                Show results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode body */}
      <div className="relative mt-3 flex-1 overflow-hidden">
        {mode === "swipe" ? (
          <SwipeDeck listings={listings} tier={tier} onOpen={onOpenListing} onSave={(id) => onToggleSave(id)} onReserve={onReserve} interleaveByCategory={cat === null} />
        ) : cat === "community" ? (
          <CommunityList listings={listings} onOpen={onOpenListing} memberships={memberships} onToggleMembership={onToggleMembership} />
        ) : cat === "person" ? (
          <PeopleList listings={listings} onOpen={onOpenListing} />
        ) : cat === null ? (
          <Catalog listings={listings} tier={tier} onOpen={onOpenListing} saved={saved} onToggleSave={onToggleSave} />
        ) : mode === "ai" ? (
          <AIPlanner tier={tier} onOpen={onOpenListing} onReserve={onReserve} saved={saved} onToggleSave={onToggleSave} />
        ) : mode === "map" ? (
          <MapView listings={listings} tier={tier} onOpen={onOpenListing} />
        ) : (
          <Catalog listings={listings} tier={tier} onOpen={onOpenListing} saved={saved} onToggleSave={onToggleSave} />
        )}
      </div>
    </div>
  );
}

/* ── AI Planner ─────────────────────────────────────────────── */
function AIPlanner({
  tier, onOpen, onReserve, saved, onToggleSave,
}: { tier: Tier; onOpen: (l: Listing) => void; onReserve: (l: Listing) => void; saved: Set<string>; onToggleSave: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Listing[] | null>(null);

  const examples = [
    "Romantic dinner in San Pedro, under $1200",
    "Rooftop with good music and drinks",
    "Club with international DJ tonight",
    "Quick dinner then something live",
  ];

  const submit = async (q: string) => {
    if (!q.trim()) return;
    setSubmitted(q);
    setLoading(true);
    setPlan(null);
    const result = await clubersApi.aiPlan(q);
    setTimeout(() => { setPlan(result); setLoading(false); }, 900);
  };

  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-2">
      {!submitted && (
        <div className="mt-4">
          <h2 className="font-display text-2xl font-semibold leading-tight">{t.discover.aiHero}</h2>
          <p className="mt-1 text-sm text-white/55">Describe el plan, nosotros lo armamos.</p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); submit(query); }} className="mt-4">
        <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2 pl-4 backdrop-blur-md focus-within:border-fuchsia-300/50">
          <Sparkles className="h-4 w-4 text-fuchsia-300" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={t.discover.aiPlaceholder}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/35"
          />
          <button type="submit" disabled={!query.trim()}
            className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-rose-500 p-2 text-white shadow-lg shadow-fuchsia-500/30 transition disabled:opacity-40">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {!submitted && (
        <div className="mt-5 space-y-2">
          <p className="eyebrow !text-white/40">Ideas</p>
          {examples.map(ex => (
            <button key={ex} onClick={() => { setQuery(ex); submit(ex); }}
              className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-white/80 transition hover:border-white/25 hover:bg-white/[0.07]">
              {ex}
            </button>
          ))}
        </div>
      )}

      {submitted && (
        <div className="mt-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">Your search</p>
            <p className="mt-1 text-sm text-white/85">"{submitted}"</p>
          </div>

          {loading && (
            <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
              <Loader2 className="h-4 w-4 animate-spin text-fuchsia-300" />
              {t.discover.aiBuilding}
            </div>
          )}

          {plan && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold">{t.discover.yourNight}</h3>
                <p className="text-xs text-white/45">{plan.length} paradas</p>
              </div>
              <div className="mt-3 space-y-3">
                {plan.map((l, i) => (
                  <PlanCard key={l.id} step={i + 1} listing={l} tier={tier}
                    saved={saved.has(l.id)} onSave={() => onToggleSave(l.id)}
                    onOpen={() => onOpen(l)} onReserve={() => onReserve(l)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PlanCard({ step, listing, tier, saved, onOpen, onSave, onReserve }: {
  step: number; listing: Listing; tier: Tier; saved: boolean;
  onOpen: () => void; onSave: () => void; onReserve: () => void;
}) {
  const perk = listing.perks?.[tier];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="relative h-36 cursor-pointer" onClick={onOpen}>
        <img src={listing.cover} alt={listing.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-500/90 text-xs font-bold text-white shadow-lg">{step}</div>
        {listing.participation === "partner" && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-fuchsia-200 backdrop-blur"><BadgeCheck className="h-3 w-3" />Partner</span>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h4 className="font-display text-lg font-semibold leading-tight text-white">{listing.name}</h4>
          <p className="text-[11px] text-white/70">{listing.subcategory} · {listing.zone}</p>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"><Star className="h-3 w-3 fill-amber-300 text-amber-300" />{listing.clubersRating.toFixed(1)} <span className="text-white/40">Clubers</span></span>
          <span className="text-white/35">·</span>
          <span className="text-white/55">{listing.googleRating.toFixed(1)} G</span>
        </div>
        <div className="rounded-lg bg-white/[0.04] p-2.5 text-[11px] text-white/70">
          <span className="text-white/45">{t.discover.why}: </span>
          {step === 1 ? "Rooftop with a view, opens early and fits your vibe perfectly." :
           step === 2 ? "Nearby fine-dining dinner, top-rated on Clubers." :
           "Same area, opens late — close the night in style."}
        </div>
        <div className="flex items-center gap-2">
          {perk ? (
            <span className="flex-1 rounded-lg bg-fuchsia-500/15 px-3 py-2 text-[11px] font-medium text-fuchsia-200">{perk.label}</span>
          ) : (
            <span className="flex-1 rounded-lg bg-white/[0.04] px-3 py-2 text-[11px] text-white/45">Sin perk · listado</span>
          )}
          <button onClick={onSave} className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10">
            <Heart className={`h-4 w-4 ${saved ? "fill-rose-400 text-rose-400" : ""}`} />
          </button>
          <button onClick={onReserve} className="rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-black">{t.venue.reserve}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Swipe Deck ─────────────────────────────────────────────── */
function SwipeDeck({ listings, tier, onOpen, onSave, onReserve, interleaveByCategory }: { listings: Listing[]; tier: Tier; onOpen: (l: Listing) => void; onSave: (id: string) => void; onReserve: (l: Listing) => void; interleaveByCategory?: boolean }) {
  const ordered = useMemo(() => {
    if (!interleaveByCategory) return listings;
    // Round-robin by category so the user sees one example of each
    // entity type before repeating: place → event → community → person →
    // product → service → app → place ...
    const order: Category[] = ["place", "event", "community", "person", "product", "service", "app"];
    const buckets = new Map<Category, Listing[]>();
    for (const c of order) buckets.set(c, []);
    for (const l of listings) buckets.get(l.category)?.push(l);
    const out: Listing[] = [];
    let added = true;
    while (added) {
      added = false;
      for (const c of order) {
        const b = buckets.get(c)!;
        if (b.length) { out.push(b.shift()!); added = true; }
      }
    }
    return out;
  }, [listings, interleaveByCategory]);
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState({ x: 0 });
  const [flying, setFlying] = useState<"left" | "right" | null>(null);
  const startX = useRef<number | null>(null);

  const current = ordered[idx];
  const next = ordered[idx + 1];

  const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const onPointerMove = (e: React.PointerEvent) => { if (startX.current != null) setDrag({ x: e.clientX - startX.current }); };
  const onPointerUp = () => {
    if (Math.abs(drag.x) > 100) {
      const dir = drag.x > 0 ? "right" : "left";
      if (dir === "right") onSave(current.id);
      setFlying(dir);
      setTimeout(() => { setIdx(i => (i + 1) % ordered.length); setDrag({ x: 0 }); setFlying(null); }, 220);
    } else { setDrag({ x: 0 }); }
    startX.current = null;
  };

  if (!current) return null;
  const flyX = flying === "right" ? 800 : flying === "left" ? -800 : drag.x;
  const rot = (drag.x / 30);

  const advance = (dir: "left" | "right") => {
    if (dir === "right") onSave(current.id);
    setFlying(dir);
    setTimeout(() => { setIdx(i => (i + 1) % ordered.length); setDrag({ x: 0 }); setFlying(null); }, 220);
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative flex-1">
        {next && <SwipeCard listing={next} tier={tier} style={{ transform: "scale(0.95) translateY(8px)", opacity: 0.6 }} />}
        <SwipeCard
          listing={current} tier={tier}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          onClick={() => Math.abs(drag.x) < 6 && onOpen(current)}
          style={{ transform: `translateX(${flyX}px) rotate(${rot}deg)`, transition: flying ? "transform 220ms ease-out" : startX.current ? "none" : "transform 200ms" }}
          overlay={drag.x > 40 ? "save" : drag.x < -40 ? "skip" : null}
        />
      </div>
      {/* Action bar — floats over the card */}
      {(() => {
        const cta: Record<Category, { label: string; Icon: typeof BadgeCheck }> = {
          place:     { label: "Reserve", Icon: BadgeCheck },
          service:   { label: "Reserve", Icon: BadgeCheck },
          event:     { label: "Reserve", Icon: BadgeCheck },
          product:   { label: "Buy",     Icon: ShoppingBag },
          community: { label: "Join",    Icon: Users },
          person:    { label: "Follow",  Icon: Heart },
          app:       { label: "Open",    Icon: Smartphone },
        };
        const { label: ctaLabel, Icon: CtaIcon } = cta[current.category];
        return (
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-center gap-2 [&>*]:pointer-events-auto">
        <button onClick={() => advance("left")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-neutral-900 py-3 text-sm text-white/80 transition hover:bg-neutral-800">
          <X className="h-4 w-4" /> {t.discover.skip}
        </button>
        <button onClick={() => onOpen(current)}
          className="flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-neutral-900 px-5 py-3 text-sm text-white/90 transition hover:bg-neutral-800">
          <LayoutGrid className="h-4 w-4" /> Info
        </button>
        <button onClick={() => {
            if (current.category === "person" || current.category === "app") advance("right");
            else onReserve(current);
          }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 py-3 text-sm font-semibold text-white transition hover:brightness-110">
          <CtaIcon className="h-4 w-4" /> {ctaLabel}
        </button>
      </div>
        );
      })()}
    </div>
  );
}

function SwipeCard({ listing, tier, style, overlay, onPointerDown, onPointerMove, onPointerUp, onClick }: {
  listing: Listing; tier: Tier; style?: React.CSSProperties; overlay?: "save" | "skip" | null;
  onPointerDown?: (e: React.PointerEvent) => void; onPointerMove?: (e: React.PointerEvent) => void; onPointerUp?: () => void;
  onClick?: () => void;
}) {
  const isPartner = listing.participation === "partner";
  const galleryCount = Math.max(listing.gallery?.length ?? 0, 6);
  return (
    <div
      onPointerDown={onPointerDown} onPointerMove={onPointerMove}
      onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClick={onClick}
      className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl touch-none select-none"
      style={style}
    >
      <img src={listing.cover} alt={listing.name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Top: pagination dots + counter */}
      <div className="absolute inset-x-5 top-4 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-center gap-1.5">
          {Array.from({ length: galleryCount }).map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition ${i === 0 ? "w-5 bg-white" : "w-1 bg-white/35"}`} />
          ))}
        </div>
        <span className="absolute right-0 text-[11px] font-medium text-white/70">1 / {galleryCount}</span>
      </div>

      {/* Bottom: eyebrow, name, meta, chips */}
      <div className="absolute inset-x-0 bottom-0 px-5 pt-5 pb-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
          {listing.subcategory}{listing.vibes[0] ? ` · ${listing.vibes[0]}` : ""}
        </p>
        <h3 className="mt-2 font-display text-[34px] font-bold leading-[1.05] text-white">{listing.name}</h3>
        <p className="mt-1.5 text-[13px] text-white/65">
          {"$".repeat(listing.priceLevel)} · until {listing.hours.split("–").pop()?.trim() ?? listing.hours}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wider text-black">
            <Star className="h-3 w-3" /> NEW
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur">
            <Globe className="h-3 w-3" /> WEB
          </span>
          {isPartner && (
            <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white">
              <BadgeCheck className="h-3 w-3" /> PARTNER
            </span>
          )}
        </div>
      </div>

      {overlay === "save" && (
        <div className="absolute left-1/2 top-12 -translate-x-1/2 rounded-2xl border-2 border-fuchsia-300 bg-fuchsia-500/20 px-5 py-2 text-sm font-bold uppercase tracking-widest text-fuchsia-100 backdrop-blur">
          <ArrowUp className="mr-1 inline h-4 w-4" /> Save
        </div>
      )}
      {overlay === "skip" && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 rounded-2xl border-2 border-white/60 bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-white backdrop-blur">
          <ArrowDown className="mr-1 inline h-4 w-4" /> Skip
        </div>
      )}
    </div>
  );
}

/* ── Map View (mock) ────────────────────────────────────────── */
function MapView({ listings, tier, onOpen }: { listings: Listing[]; tier: Tier; onOpen: (l: Listing) => void }) {
  const [picked, setPicked] = useState<Listing | null>(null);
  // Deterministic pin positions
  const pins = listings.map((l, i) => ({ l, x: 18 + ((i * 71) % 64), y: 22 + ((i * 47) % 58) }));
  return (
    <div className="relative h-full px-4 pb-28">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10"
           style={{ background: "linear-gradient(135deg, oklch(0.16 0.04 280), oklch(0.12 0.03 250))" }}>
        {/* Fake map grid */}
        <div className="absolute inset-0 opacity-30"
             style={{ backgroundImage: "linear-gradient(oklch(0.40 0.05 280 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.40 0.05 280 / 0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 opacity-50"
             style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.45 0.18 320 / 0.20), transparent 60%)" }} />
        {pins.map(({ l, x, y }) => {
          const isPartner = l.participation === "partner";
          return (
            <button key={l.id} onClick={() => setPicked(l)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition hover:scale-110 ${isPartner ? "bg-fuchsia-500 ring-2 ring-fuchsia-300/60" : "bg-white/85 ring-2 ring-white/40"}`}
              style={{ left: `${x}%`, top: `${y}%` }}>
              <MapPin className={`h-3.5 w-3.5 ${isPartner ? "text-white" : "text-black"}`} />
            </button>
          );
        })}
      </div>
      {picked && (
        <div className="absolute inset-x-4 bottom-24">
          <button onClick={() => setPicked(null)} className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1 text-white/80"><X className="h-3.5 w-3.5" /></button>
          <CatalogCard listing={picked} tier={tier} onOpen={() => onOpen(picked)} saved={false} onToggleSave={() => {}} compact />
        </div>
      )}
    </div>
  );
}

/* ── Catalog ────────────────────────────────────────────────── */
function Catalog({ listings, tier, onOpen, saved, onToggleSave }: {
  listings: Listing[]; tier: Tier; onOpen: (l: Listing) => void;
  saved: Set<string>; onToggleSave: (id: string) => void;
}) {
  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-2">
      <div className="space-y-3">
        {listings.map(l => (
          <CatalogCard key={l.id} listing={l} tier={tier} onOpen={() => onOpen(l)}
            saved={saved.has(l.id)} onToggleSave={() => onToggleSave(l.id)} />
        ))}
      </div>
    </div>
  );
}

function CatalogCard({ listing, tier, onOpen, saved, onToggleSave, compact }: {
  listing: Listing; tier: Tier; onOpen: () => void; saved: boolean; onToggleSave: () => void; compact?: boolean;
}) {
  const perk = listing.perks?.[tier];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
      <div className="flex">
        <button onClick={onOpen} className={`relative shrink-0 ${compact ? "h-24 w-24" : "h-32 w-32"}`}>
          <img src={listing.cover} alt={listing.name} className="h-full w-full object-cover" />
          {listing.participation === "partner" && (
            <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-0.5 rounded-full bg-fuchsia-500/90 px-1.5 py-0.5 text-[9px] font-medium text-white"><BadgeCheck className="h-2.5 w-2.5" /></span>
          )}
        </button>
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between gap-2">
            <button onClick={onOpen} className="text-left">
              <h4 className="font-display text-base font-semibold leading-tight">{listing.name}</h4>
              <p className="text-[11px] text-white/55">{listing.subcategory} · {listing.zone} · {"$".repeat(listing.priceLevel)}</p>
            </button>
            <button onClick={onToggleSave} className="-mr-1 -mt-1 rounded-lg p-1.5 text-white/65 hover:bg-white/10">
              <Heart className={`h-4 w-4 ${saved ? "fill-rose-400 text-rose-400" : ""}`} />
            </button>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-300/15 px-1.5 py-0.5 text-amber-200"><Star className="h-2.5 w-2.5 fill-amber-300 text-amber-300" />{listing.clubersRating.toFixed(1)}</span>
            <span className="text-white/45">Clubers</span>
            <span className="text-white/25">·</span>
            <span className="text-white/65">{listing.googleRating.toFixed(1)} Google</span>
          </div>
          <div className="mt-2">
            {perk ? (
              <span className="inline-block rounded-md bg-fuchsia-500/15 px-2 py-0.5 text-[10px] font-medium text-fuchsia-200">{perk.label}</span>
            ) : (
              <span className="inline-block rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/40">Sin perk</span>
            )}
            <span className={`ml-2 text-[10px] ${listing.openNow ? "text-emerald-300" : "text-white/40"}`}>
              {listing.openNow ? "● Open" : "○ Closed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Placeholder category (Events) ──────────────────────────── */
function PlaceholderCategory({ listings, onOpen }: { listings: Listing[]; onOpen: (l: Listing) => void }) {
  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-2">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-rose-500/10 p-4">
        <p className="font-display text-base font-semibold">Coming soon</p>
        <p className="mt-1 text-xs text-white/65">{t.discover.comingSoon}</p>
      </div>
      <div className="mt-4 space-y-3">
        {listings.map(l => (
          <div key={l.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <button onClick={() => onOpen(l)} className="block w-full text-left">
              <div className="relative h-40">
                <img src={l.cover} alt={l.name} className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-display text-lg font-semibold text-white">{l.name}</h4>
                  <p className="text-[11px] text-white/65">{l.subcategory} · {l.whenLabel ?? l.hours}</p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Communities ────────────────────────────────────────────── */
function CommunityList({ listings, onOpen, memberships, onToggleMembership }: {
  listings: Listing[]; onOpen: (l: Listing) => void;
  memberships: Set<string>; onToggleMembership: (id: string) => void;
}) {
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-2">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 p-4">
        <p className="font-display text-base font-semibold">Communities</p>
        <p className="mt-1 text-xs text-white/65">Grupos abiertos, members clubs y comunidades universitarias. Únete o crea la tuya.</p>
      </div>
      <div className="mt-4 space-y-3">
        {listings.map(l => {
          const joined = memberships.has(l.id);
          return (
          <button key={l.id} onClick={() => onOpen(l)}
            className="block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left transition hover:border-white/20">
            <div className="relative h-32">
              <img src={l.cover} alt={l.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              {l.participation === "partner" && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-fuchsia-200 backdrop-blur"><BadgeCheck className="h-3 w-3" />Verified</span>
              )}
              {joined && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow"><Check className="h-3 w-3" />Joined</span>
              )}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] uppercase tracking-wider text-white/55">{l.subcategory} · {l.zone}</p>
                <h4 className="font-display text-lg font-semibold text-white">{l.name}</h4>
              </div>
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-center gap-3 text-[11px] text-white/70">
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{fmt(l.members ?? 0)} members</span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" />{l.entryRule}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/55">
                  {l.monthlyFee && l.monthlyFee > 0 ? `$${l.monthlyFee}/mo` : "Free"}
                </span>
                <span
                  role="button"
                  onClick={(e) => { e.stopPropagation(); onToggleMembership(l.id); }}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold ${joined ? "border border-white/20 bg-white/5 text-white/85" : "bg-white text-black"}`}>
                  {joined ? "Joined" : (l.monthlyFee && l.monthlyFee > 0 ? "Subscribe" : "Join")} {!joined && <ArrowRight className="h-3 w-3" />}
                </span>
              </div>
            </div>
          </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── People ─────────────────────────────────────────────────── */
function PeopleList({ listings, onOpen }: { listings: Listing[]; onOpen: (l: Listing) => void }) {
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : `${n}`;
  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-2">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-rose-500/10 p-4">
        <p className="font-display text-base font-semibold">People who move the city</p>
        <p className="mt-1 text-xs text-white/65">Tastemakers, creators and DJs. Follow them so you don't miss where they'll be tonight.</p>
      </div>
      <div className="mt-4 space-y-3">
        {listings.map(l => {
          const inf = l.influenceTier ? INFLUENCE_META[l.influenceTier] : null;
          return (
            <button key={l.id} onClick={() => onOpen(l)}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-white/20">
              <div className="relative shrink-0">
                <img src={l.cover} alt={l.name} className="h-16 w-16 rounded-full object-cover" />
                {l.participation === "partner" && (
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-fuchsia-500 p-0.5 ring-2 ring-[oklch(0.10_0.02_280)]"><BadgeCheck className="h-3 w-3 text-white" /></span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="truncate font-display text-base font-semibold">{l.name}</h4>
                  {inf && (
                    <span className="shrink-0 rounded-full bg-amber-300/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-200">{inf.label}</span>
                  )}
                </div>
                <p className="truncate text-[11px] text-white/55">{l.handle} · {l.role}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-white/65">
                  <span className="inline-flex items-center gap-1"><Instagram className="h-3 w-3" />{fmt(l.igFollowers ?? 0)} followers</span>
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black">Follow</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VENUE DETAIL
   ───────────────────────────────────────────────────────────── */
function VenueDetail({ listing, tier, saved, onClose, onToggleSave, onReserve, onUpgrade, memberships, onJoinCommunity }: {
  listing: Listing; tier: Tier; saved: boolean;
  onClose: () => void; onToggleSave: () => void; onReserve: () => void; onUpgrade: () => void;
  memberships: Set<string>;
  onJoinCommunity: (communityId: string) => void;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const photos = [listing.cover, ...listing.gallery];
  const perk = listing.perks?.[tier];
  const unlockedCommunityPerks = (listing.communityPerks ?? []).filter(p => memberships.has(p.communityId));
  const lockedCommunityPerks   = (listing.communityPerks ?? []).filter(p => !memberships.has(p.communityId));

  return (
    <div className="absolute inset-0 z-30 overflow-y-auto bg-[oklch(0.10_0.02_280)] text-white">
      {/* Sticky top bar — back + save */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[oklch(0.10_0.02_280)]/85 px-4 py-3 backdrop-blur-xl">
        <button onClick={onClose} className="rounded-full bg-white/10 p-2"><ChevronLeft className="h-4 w-4" /></button>
        <button onClick={onToggleSave} className="rounded-full bg-white/10 p-2">
          <Heart className={`h-4 w-4 ${saved ? "fill-rose-400 text-rose-400" : ""}`} />
        </button>
      </div>

      <div className="space-y-5 px-5 pb-32 pt-5">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[11px] uppercase tracking-wider text-white/45">{listing.subcategory} · {listing.zone}</p>
            {listing.participation === "partner" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/90 px-2 py-0.5 text-[10px] font-medium text-white"><BadgeCheck className="h-3 w-3" /> {t.venue.partner}</span>
            )}
          </div>
          <h2 className="mt-1 font-display text-3xl font-bold leading-tight">{listing.name}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/75">
            <span>{"$".repeat(listing.priceLevel)}</span>
            <span className="text-white/30">·</span>
            <span className={listing.openNow ? "text-emerald-300" : "text-white/50"}>{listing.openNow ? t.discover.openNow : t.discover.closed}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {listing.vibes.map(v => (
              <span key={v} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/85">#{v}</span>
            ))}
          </div>
        </div>

        {/* Media — square 1:1 carousel */}
        <MediaCarouselSquare photos={photos} />

        {/* Reviews summary */}
        <ReviewsSummary listing={listing} />

        {/* Perk panel */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/15 to-rose-500/10 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-wider text-fuchsia-200">{t.venue.yourPerk}</p>
            <TierBadge tier={tier} small />
          </div>
          <p className="mt-1 text-xl font-semibold">{perk?.label ?? "No perk · listed venue"}</p>
          {listing.fiscalType && (
            <p className="mt-1 text-[11px] text-white/60">
              {listing.fiscalType === "formal" ? t.venue.mechanicFormal : t.venue.mechanicInformal}
            </p>
          )}
          {listing.welcomePerk && (
            <p className="mt-1 text-xs text-white/65"><Sparkles className="-mt-0.5 mr-1 inline h-3 w-3 text-amber-300" /> {t.venue.welcome}: {listing.welcomePerk.label}</p>
          )}
          {tier !== "diamond" && perk && (
            <button onClick={onUpgrade} className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-fuchsia-200 hover:text-fuchsia-100">
              {t.venue.upgradeHint}
            </button>
          )}
        </div>

        {/* Community group perks */}
        {/* Product menu */}
        <ProductMenu listing={listing} />

        {/* Promos matrix per tier */}
        <PromosMatrix listing={listing} currentTier={tier} />

        {/* Google reviews */}
        <GoogleReviewsCarousel listing={listing} />

        {/* Mesita reviews & visitors */}
        <MesitaReviewsCarousel listing={listing} />

        {/* Location map */}
        <LocationMap listing={listing} />

        {/* Hours & popular times */}
        <PopularTimesCarousel listing={listing} />

        {/* Description */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <SectionTitle icon={<Sparkles className="h-3.5 w-3.5" />} title="Description" />
          <p className="text-sm leading-relaxed text-white/80">{listing.description}</p>
        </div>

        {/* Details */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <SectionTitle icon={<Settings className="h-3.5 w-3.5" />} title="Details" />
          <dl className="divide-y divide-white/5 text-xs">
            <DetailRow label="Category" value={`${listing.category} · ${listing.subcategory}`} />
            <DetailRow label="Zone" value={listing.zone} />
            <DetailRow label="Price level" value={"$".repeat(listing.priceLevel)} />
            <DetailRow label="Hours" value={listing.hours} />
            <DetailRow label="Distance" value={`${listing.walkMin} min walk`} />
            <DetailRow label="Participation" value={listing.participation} />
            {listing.fiscalType && <DetailRow label="Mechanic" value={listing.fiscalType === "formal" ? "Cashback (formal)" : "Discount (informal)"} />}
            {listing.members != null && <DetailRow label="Members" value={listing.members.toLocaleString()} />}
            {listing.entryRule && <DetailRow label="Entry rule" value={listing.entryRule} />}
          </dl>
        </div>

        {/* Product / Service hero */}
        {(listing.category === "product" || listing.category === "service") && (
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/85">
                  {listing.category === "product" ? <ShoppingBag className="h-3.5 w-3.5" /> : <Wrench className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/55">
                    {listing.category === "product" ? (listing.productKind ?? "Product") : (listing.serviceKind ?? "Service")}
                  </p>
                  <p className="text-xs text-white/80">
                    {listing.category === "product" ? `Sold by ${listing.soldBy ?? "—"}` : `Provided by ${listing.providedBy ?? "—"}`}
                  </p>
                </div>
              </div>
              {typeof listing.price === "number" && (
                <p className="font-display text-2xl font-bold">${listing.price.toLocaleString()}<span className="ml-1 text-xs font-medium text-white/55">MXN</span></p>
              )}
            </div>
            {listing.durationLabel && (
              <p className="mt-2 text-[11px] text-white/60"><Clock className="-mt-0.5 mr-1 inline h-3 w-3" /> {listing.durationLabel}</p>
            )}
          </div>
        )}

        {/* Micro-app hero — auto onboarding */}
        {listing.category === "app" && (
          <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-cyan-200">
                  <Smartphone className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/55">
                    {listing.appKind ?? "Micro-app"}
                  </p>
                  <p className="text-xs text-white/80">by {listing.developer ?? "—"}</p>
                </div>
              </div>
              {typeof listing.installs === "number" && (
                <p className="text-[11px] text-white/70">{listing.installs.toLocaleString()} installs</p>
              )}
            </div>
            {listing.onboardingSteps && listing.onboardingSteps.length > 0 && (
              <div className="mt-3 space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-white/45">Auto onboarding</p>
                {listing.onboardingSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-white/80">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-[9px] font-bold text-cyan-200">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
            {listing.durationLabel && (
              <p className="mt-3 text-[11px] text-white/60"><Clock className="-mt-0.5 mr-1 inline h-3 w-3" /> {listing.durationLabel} to complete</p>
            )}
            {listing.requiresIdentity && listing.requiresIdentity.length > 0 && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="text-[10px] uppercase tracking-wider text-white/45">Uses your Mesita identity</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {listing.requiresIdentity.map((claim) => {
                    const m = CLAIM_META[claim];
                    const onFile = USER_CLAIMS.has(claim);
                    return (
                      <span
                        key={claim}
                        className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${
                          onFile
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                            : "border-cyan-400/30 bg-cyan-400/5 text-cyan-100"
                        }`}
                        title={onFile ? "Already on file — auto-skip" : "We'll collect this once"}
                      >
                        <span>{m.emoji}</span>
                        <span>{m.label}</span>
                        {onFile && <Check className="h-2.5 w-2.5" />}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-[10px] text-white/45">
                  {listing.requiresIdentity.filter(c => USER_CLAIMS.has(c)).length} of {listing.requiresIdentity.length} already on file — onboarding picks up where it ends.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Inline offerings — events and apps both sell products / services / subscriptions */}
        {(listing.category === "event" || listing.category === "app") && listing.offerings && listing.offerings.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
              <p className="text-[10px] uppercase tracking-wider text-white/55">
                {listing.category === "event" ? "Add to your night" : "What's inside this app"}
              </p>
            </div>
            <div className="mt-3 space-y-2">
              {listing.offerings.map(o => {
                const tone =
                  o.kind === "product"      ? "bg-emerald-400/15 text-emerald-200" :
                  o.kind === "service"      ? "bg-sky-400/15 text-sky-200"         :
                                              "bg-fuchsia-400/15 text-fuchsia-200";
                const Icon =
                  o.kind === "product"      ? ShoppingBag :
                  o.kind === "service"      ? Wrench      :
                                              Sparkles;
                const label =
                  o.kind === "subscription" ? "subscription" : o.kind;
                return (
                  <div key={o.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{o.name}</p>
                        <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${tone}`}>
                          {label}
                        </span>
                      </div>
                      {o.description && <p className="mt-0.5 text-[11px] text-white/60">{o.description}</p>}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-sm font-bold">
                        ${o.price.toLocaleString()}
                        {o.kind === "subscription" && o.interval && (
                          <span className="ml-0.5 text-[10px] font-medium text-white/55">/{o.interval === "month" ? "mo" : "yr"}</span>
                        )}
                      </p>
                      <button className="mt-1 rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-black">
                        {o.kind === "subscription" ? "Subscribe" : "Add"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-2 text-xs">
          <a className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] py-2 text-white/80"><Globe className="h-3.5 w-3.5 text-white/55" /> Website</a>
          <a className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] py-2 text-white/80"><Instagram className="h-3.5 w-3.5 text-white/55" /> Instagram</a>
        </div>
      </div>

      {/* Floating reserve CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-white/10 bg-black/85 px-5 pb-6 pt-3 backdrop-blur-xl">
        <button
          onClick={listing.category === "person" ? onToggleSave : onReserve}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30">
          {listing.category === "product" ? (
            <><ShoppingBag className="h-4 w-4" /> Buy</>
          ) : listing.category === "service" ? (
            <><Wrench className="h-4 w-4" /> Book service</>
          ) : listing.category === "app" ? (
            <><Smartphone className="h-4 w-4" /> Open app</>
          ) : listing.category === "person" ? (
            <><Heart className={`h-4 w-4 ${saved ? "fill-white" : ""}`} /> {saved ? "Following" : "Follow"}</>
          ) : listing.category === "community" ? (
            <><Users className="h-4 w-4" /> Join community</>
          ) : (
            <><Calendar className="h-4 w-4" /> {t.venue.reserve}</>
          )}
        </button>
      </div>
    </div>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white/80">
      <span className="text-white/55">{icon}</span>{label}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <dt className="text-white/55">{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-medium text-white capitalize">{value}</dd>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VENUE DETAIL — sub-sections (mock data)
   ───────────────────────────────────────────────────────────── */

function HScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

function SectionTitle({ icon, title, hint }: { icon: React.ReactNode; title: string; hint?: string }) {
  return (
    <div className="mb-2 flex items-end justify-between">
      <div className="flex items-center gap-2">
        <span className="text-fuchsia-300">{icon}</span>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{title}</p>
      </div>
      {hint && <p className="text-[10px] text-white/40">{hint}</p>}
    </div>
  );
}

function MediaCarouselSquare({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0);
  const list = photos.length > 0 ? photos : [""];
  return (
    <div>
      <SectionTitle icon={<LayoutGrid className="h-3.5 w-3.5" />} title="Media" hint={`${idx + 1} / ${list.length}`} />
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black">
        <img src={list[idx]} alt="" className="h-full w-full object-cover" />
        {list.length > 1 && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + list.length) % list.length)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 backdrop-blur">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setIdx(i => (i + 1) % list.length)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 backdrop-blur">
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {list.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/45"}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StarRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-1.5">
      <span className="text-[11px] text-white/70">{label}</span>
      <span className="flex items-center gap-1 text-[11px] font-semibold text-white">
        <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function ReviewsSummary({ listing }: { listing: Listing }) {
  const c = listing.clubersRating;
  // Deterministic mock sub-ratings around clubersRating
  const food = Math.min(5, c + 0.2);
  const service = Math.max(0, c - 0.1);
  const ambiance = Math.min(5, c + 0.3);
  const overall = c;
  const googleN = 1240 + listing.name.length * 31;
  const igFollowers = 18400 + listing.name.length * 220;
  const fbFollowers = 9200 + listing.name.length * 90;
  const fbStars = Math.max(3.8, Math.min(5, c - 0.2));
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <SectionTitle icon={<Star className="h-3.5 w-3.5" />} title="Reviews summary" />
      <div className="grid grid-cols-2 gap-1.5">
        <StarRow label="Mesita · Food" value={food} />
        <StarRow label="Mesita · Service" value={service} />
        <StarRow label="Mesita · Ambiance" value={ambiance} />
        <StarRow label="Mesita · Overall" value={overall} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-white/45">Google</p>
          <p className="mt-0.5 flex items-center justify-center gap-1 text-xs font-semibold">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />{listing.googleRating.toFixed(1)}
          </p>
          <p className="text-[9px] text-white/45">{googleN.toLocaleString()} reviews</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-white/45">Instagram</p>
          <p className="mt-0.5 flex items-center justify-center gap-1 text-xs font-semibold"><Instagram className="h-3 w-3" />{(igFollowers / 1000).toFixed(1)}K</p>
          <p className="text-[9px] text-white/45">followers</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-white/45">Facebook</p>
          <p className="mt-0.5 flex items-center justify-center gap-1 text-xs font-semibold"><Star className="h-3 w-3 fill-amber-300 text-amber-300" />{fbStars.toFixed(1)}</p>
          <p className="text-[9px] text-white/45">{(fbFollowers / 1000).toFixed(1)}K fans</p>
        </div>
      </div>
    </div>
  );
}

const MOCK_MENU = [
  { name: "Tasting menu", desc: "7 courses · chef's selection", price: 1290 },
  { name: "Wagyu tostada", desc: "A5 wagyu · black truffle", price: 320 },
  { name: "Smoked octopus", desc: "Charred citrus · chile morita", price: 280 },
  { name: "Mezcal flight", desc: "3 x 1oz · espadín, tobalá, ensamble", price: 240 },
  { name: "Cacao dessert", desc: "Tabasco cacao · sea salt", price: 180 },
];

function ProductMenu({ listing }: { listing: Listing }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <SectionTitle icon={<ShoppingBag className="h-3.5 w-3.5" />} title="Menu" hint={`${"$".repeat(listing.priceLevel)} · MXN`} />
      <ul className="divide-y divide-white/5">
        {MOCK_MENU.map(m => (
          <li key={m.name} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{m.name}</p>
              <p className="truncate text-[11px] text-white/55">{m.desc}</p>
            </div>
            <p className="shrink-0 font-display text-sm font-bold">${m.price}</p>
          </li>
        ))}
      </ul>
      <button className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 text-[11px] font-medium text-white/75">See full menu</button>
    </div>
  );
}

function PromosMatrix({ listing, currentTier }: { listing: Listing; currentTier: Tier }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <SectionTitle icon={<Gift className="h-3.5 w-3.5" />} title="Promos by tier" hint="What each tier gets" />
      <div className="grid grid-cols-4 gap-1.5">
        {TIERS.map(t => {
          const p = listing.perks?.[t];
          const active = t === currentTier;
          return (
            <div key={t} className={`rounded-xl border p-2 text-center ${active ? "border-fuchsia-300/50 bg-fuchsia-500/10" : "border-white/10 bg-white/[0.03]"}`}>
              <p className={`text-[9px] font-semibold uppercase tracking-wider ${active ? "text-fuchsia-200" : "text-white/55"}`}>
                {TIER_META[t].label}
              </p>
              <p className="mt-1 font-display text-base font-bold text-white">{p ? `${p.pct}%` : "—"}</p>
              <p className="text-[9px] capitalize text-white/45">{p?.kind ?? "no perk"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MOCK_GOOGLE_REVIEWS = [
  { name: "Andrea L.", stars: 5, text: "Easily the best tasting menu in the city. Service was attentive without being intrusive." },
  { name: "Mateo R.", stars: 4, text: "Beautiful space, food is exceptional. A bit loud on weekends." },
  { name: "Sofía G.", stars: 5, text: "Came for an anniversary — the staff went above and beyond. Worth every peso." },
  { name: "Javier T.", stars: 4, text: "Great cocktails and ambient music. The smoked octopus is a must." },
];

const MOCK_MESITA_REVIEWS = [
  { name: "Lucía", tier: "diamond" as Tier, food: 4.9, service: 4.8, ambiance: 5.0, text: "Felt like a private event. Bronze cashback hit my wallet before I left." },
  { name: "Diego", tier: "gold"   as Tier, food: 4.7, service: 4.5, ambiance: 4.8, text: "Reserved through Mesita in 10 seconds. Discount was automatic." },
  { name: "Renata", tier: "silver" as Tier, food: 4.6, service: 4.7, ambiance: 4.9, text: "Honest review: portions are small but every bite counts." },
  { name: "Iván", tier: "diamond" as Tier, food: 5.0, service: 5.0, ambiance: 4.9, text: "Brought 6 friends — the team treated us like regulars on visit one." },
];

function GoogleReviewsCarousel({ listing }: { listing: Listing }) {
  return (
    <div>
      <SectionTitle icon={<Globe className="h-3.5 w-3.5" />} title="Google reviews" hint={`${listing.googleRating.toFixed(1)} ★`} />
      <HScroll>
        {MOCK_GOOGLE_REVIEWS.map((r, i) => (
          <div key={i} className="w-64 shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">{r.name}</p>
              <span className="flex items-center gap-0.5 text-[11px] text-amber-300"><Star className="h-3 w-3 fill-amber-300" />{r.stars}</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/70">{r.text}</p>
          </div>
        ))}
      </HScroll>
    </div>
  );
}

function MesitaReviewsCarousel({ listing }: { listing: Listing }) {
  return (
    <div>
      <SectionTitle icon={<Heart className="h-3.5 w-3.5" />} title="Mesita reviews & visitors" hint={`${listing.clubersRating.toFixed(1)} ★`} />
      <HScroll>
        {MOCK_MESITA_REVIEWS.map((r, i) => (
          <div key={i} className="w-64 shrink-0 snap-start rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-rose-500/5 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">{r.name}</p>
              <TierBadge tier={r.tier} small />
            </div>
            <div className="mt-1.5 grid grid-cols-3 gap-1 text-[10px] text-white/65">
              <span>Food <span className="text-white">{r.food}</span></span>
              <span>Svc <span className="text-white">{r.service}</span></span>
              <span>Amb <span className="text-white">{r.ambiance}</span></span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/75">{r.text}</p>
          </div>
        ))}
      </HScroll>
    </div>
  );
}

function LocationMap({ listing }: { listing: Listing }) {
  return (
    <div>
      <SectionTitle icon={<MapPin className="h-3.5 w-3.5" />} title="Location" hint={`${listing.walkMin} min walk`} />
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 400px at 30% 40%, oklch(0.30 0.10 280 / 0.8), transparent 60%), radial-gradient(600px 300px at 70% 70%, oklch(0.35 0.10 320 / 0.7), transparent 60%), linear-gradient(180deg, oklch(0.16 0.04 280), oklch(0.10 0.02 280))",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 shadow-lg shadow-fuchsia-500/40">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="mt-1 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-medium backdrop-blur">{listing.name}</div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-white/55">Av. {listing.zone} 1248, {listing.zone}, MX</p>
    </div>
  );
}

const MOCK_POPULAR = [
  { day: "Mon", bars: [10, 15, 20, 35, 50, 60, 45, 30] },
  { day: "Tue", bars: [12, 18, 25, 40, 55, 65, 50, 35] },
  { day: "Wed", bars: [15, 20, 30, 45, 60, 75, 60, 40] },
  { day: "Thu", bars: [20, 28, 38, 55, 75, 90, 80, 55] },
  { day: "Fri", bars: [25, 35, 50, 70, 90, 100, 95, 75] },
  { day: "Sat", bars: [30, 40, 55, 75, 95, 100, 98, 80] },
  { day: "Sun", bars: [22, 30, 42, 58, 70, 78, 60, 40] },
];

function PopularTimesCarousel({ listing }: { listing: Listing }) {
  return (
    <div>
      <SectionTitle icon={<Clock className="h-3.5 w-3.5" />} title="Hours & popular times" hint="GMT-6 · Monterrey" />
      <div className="mb-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/75">
        <span className={listing.openNow ? "text-emerald-300" : "text-white/50"}>{listing.openNow ? "Open now" : "Closed"}</span>
        <span className="text-white/30"> · </span>
        <span>{listing.hours}</span>
      </div>
      <HScroll>
        {MOCK_POPULAR.map(d => (
          <div key={d.day} className="w-32 shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">{d.day}</p>
            <div className="mt-2 flex h-16 items-end justify-between gap-0.5">
              {d.bars.map((b, i) => (
                <div key={i} className="w-1.5 rounded-sm bg-gradient-to-t from-fuchsia-500/70 to-rose-400/70" style={{ height: `${b}%` }} />
              ))}
            </div>
            <p className="mt-1 text-[9px] text-white/40">6p — 1a</p>
          </div>
        ))}
      </HScroll>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   RESERVE SHEET
   ───────────────────────────────────────────────────────────── */
function ReserveSheet({ listing, onClose, onDone }: { listing: Listing; onClose: () => void; onDone: (when: string, party: number) => void }) {
  const dates = ["Today", "Tomorrow", "Fri 13", "Sat 14", "Sun 15"];
  const times = ["19:00", "20:00", "20:30", "21:00", "21:30", "22:00"];
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("21:00");
  const [party, setParty] = useState(2);
  const [phase, setPhase] = useState<"form" | "contacting" | "done">("form");

  const submit = async () => {
    setPhase("contacting");
    await clubersApi.createReservation(listing.id, { date, time, party });
    setPhase("done");
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/70 backdrop-blur-sm">
      <div className="w-full rounded-t-3xl border-t border-white/10 bg-[oklch(0.13_0.03_280)] p-5 pb-8 text-white">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />

        {phase === "form" && (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/45">{t.reserve.title}</p>
                <h3 className="font-display text-xl font-semibold">{listing.name}</h3>
              </div>
              <button onClick={onClose} className="rounded-full bg-white/10 p-1.5"><X className="h-4 w-4" /></button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="mb-1.5 text-xs text-white/55">{t.reserve.when}</p>
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                  {dates.map(d => (
                    <button key={d} onClick={() => setDate(d)}
                      className={`shrink-0 rounded-xl border px-3.5 py-2 text-xs ${date === d ? "border-fuchsia-300 bg-fuchsia-500/20 text-fuchsia-100" : "border-white/10 bg-white/5 text-white/75"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-white/55">{t.reserve.time}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {times.map(tm => (
                    <button key={tm} onClick={() => setTime(tm)}
                      className={`rounded-xl border py-2 text-xs ${time === tm ? "border-fuchsia-300 bg-fuchsia-500/20 text-fuchsia-100" : "border-white/10 bg-white/5 text-white/75"}`}>
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-white/55">{t.reserve.party}</p>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                  <button onClick={() => setParty(p => Math.max(1, p - 1))} className="rounded-full bg-white/10 p-1.5"><ChevronLeft className="h-4 w-4" /></button>
                  <span className="text-base font-semibold"><Users className="-mt-0.5 mr-2 inline h-4 w-4 text-white/55" />{party}</span>
                  <button onClick={() => setParty(p => Math.min(12, p + 1))} className="rounded-full bg-white/10 p-1.5"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            <button onClick={submit} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-rose-500 py-3.5 text-sm font-semibold shadow-lg shadow-fuchsia-500/30">
              {t.reserve.confirm} <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}

        {phase === "contacting" && (
          <div className="py-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-500/20">
              <Loader2 className="h-6 w-6 animate-spin text-fuchsia-300" />
            </div>
            <h3 className="font-display text-xl font-semibold">{t.reserve.contacting}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-white/65">{t.reserve.contactingDesc}</p>
          </div>
        )}

        {phase === "done" && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-7 w-7 text-emerald-300" />
            </div>
            <h3 className="font-display text-xl font-semibold">{t.reserve.done}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-white/65">{t.reserve.doneDesc}</p>
            <button onClick={() => onDone(`${date} ${time}`, party)} className="mt-6 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-black">{t.reserve.close}</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SAVED
   ───────────────────────────────────────────────────────────── */
/* ── Join Community Sheet ─────────────────────────────────── */
function JoinCommunitySheet({ listing, alreadyMember, onClose, onDone }: {
  listing: Listing; alreadyMember: boolean; onClose: () => void; onDone: () => void;
}) {
  const needsVerification = listing.entryRule && !/open to everyone/i.test(listing.entryRule);
  const hasFee = (listing.monthlyFee ?? 0) > 0;
  type Phase = "intro" | "verifying" | "done";
  const [phase, setPhase] = useState<Phase>("intro");
  const [accepted, setAccepted] = useState(false);

  const join = async () => {
    if (needsVerification || hasFee) {
      setPhase("verifying");
      await new Promise(r => setTimeout(r, 1200));
    }
    setPhase("done");
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/70 backdrop-blur-sm">
      <div className="w-full rounded-t-3xl border-t border-white/10 bg-[oklch(0.13_0.03_280)] p-5 pb-8 text-white">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />

        {phase === "intro" && (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/45">Join community</p>
                <h3 className="font-display text-xl font-semibold">{listing.name}</h3>
                <p className="mt-0.5 text-[12px] text-white/55">
                  {(listing.members ?? 0).toLocaleString()} members · {listing.subcategory}
                </p>
              </div>
              <button onClick={onClose} className="rounded-full bg-white/10 p-1.5"><X className="h-4 w-4" /></button>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
                <div className="text-[12px]">
                  <p className="font-semibold text-white">Entry requirement</p>
                  <p className="text-white/60">{listing.entryRule ?? "Open to everyone"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
                <div className="text-[12px]">
                  <p className="font-semibold text-white">Membership</p>
                  <p className="text-white/60">
                    {hasFee ? `$${listing.monthlyFee} MXN / month` : "Free to join"}
                  </p>
                </div>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2 text-[12px] text-white/70">
              <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-fuchsia-500" />
              <span>I agree to the community rules and code of conduct.</span>
            </label>

            <button disabled={!accepted} onClick={join}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-rose-500 py-3.5 text-sm font-semibold shadow-lg shadow-fuchsia-500/30 disabled:cursor-not-allowed disabled:opacity-40">
              <Users className="h-4 w-4" />
              {hasFee ? `Join · $${listing.monthlyFee}/mo` : "Join community"}
            </button>
          </>
        )}

        {phase === "verifying" && (
          <div className="py-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-500/20">
              <Loader2 className="h-6 w-6 animate-spin text-fuchsia-300" />
            </div>
            <h3 className="font-display text-xl font-semibold">
              {hasFee && needsVerification ? "Verifying & charging…" : hasFee ? "Processing payment…" : "Verifying access…"}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-white/65">
              {needsVerification ? listing.entryRule : "Setting up your membership."}
            </p>
          </div>
        )}

        {phase === "done" && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-7 w-7 text-emerald-300" />
            </div>
            <h3 className="font-display text-xl font-semibold">
              {alreadyMember ? "You're in" : "Welcome to the crew"}
            </h3>
            <p className="mx-auto mt-1 max-w-xs text-[13px] text-white/65">
              Group perks unlocked. Join the chat to meet the community.
            </p>
            <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[oklch(0.72_0.18_150)] py-3.5 text-sm font-semibold text-black shadow-lg">
              <Share2 className="h-4 w-4" /> Open WhatsApp group
            </a>
            <button onClick={onDone} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/80">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Saved({ tier, saved, reservations, onOpen, onToggleSave }: {
  tier: Tier; saved: Set<string>; reservations: Array<{ id: string; listingId: string; when: string; party: number; status: "pending" | "confirmed" }>;
  onOpen: (l: Listing) => void; onToggleSave: (id: string) => void;
}) {
  const items = SEED_LISTINGS.filter(l => saved.has(l.id));
  const groups: Array<{ cat: Category | null; label: string }> = [
    { cat: null,        label: "All" },
    { cat: "place",     label: t.discover.cats.place },
    { cat: "event",     label: t.discover.cats.event },
    { cat: "community", label: t.discover.cats.community },
    { cat: "person",    label: t.discover.cats.person },
    { cat: "product",   label: t.discover.cats.product },
    { cat: "service",   label: t.discover.cats.service },
    { cat: "app",       label: t.discover.cats.app },
  ];
  const [selCat, setSelCat] = useState<Category | null>(null);
  const filtered = selCat ? items.filter(l => l.category === selCat) : items;
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-6">
      <h1 className="font-display text-2xl font-bold">{t.saved.title}</h1>

      {reservations.length > 0 && (
        <section className="mt-5">
          <p className="eyebrow !text-white/40">{t.saved.upcoming}</p>
          <div className="mt-2 space-y-2">
            {reservations.map(r => {
              const l = SEED_LISTINGS.find(x => x.id === r.listingId)!;
              return (
                <button key={r.id} onClick={() => onOpen(l)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left">
                  <img src={l.cover} alt={l.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-base font-semibold">{l.name}</p>
                    <p className="text-[11px] text-white/55">{r.when} · {r.party} pers · <span className="text-amber-300">{r.status === "pending" ? "Por confirmar" : "Confirmada"}</span></p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/45" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="flex flex-wrap gap-2">
          {groups.map(g => {
            const count = g.cat ? items.filter(l => l.category === g.cat).length : items.length;
            const active = selCat === g.cat;
            return (
              <button key={g.label} onClick={() => setSelCat(g.cat)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${active ? "border-emerald-400/70 bg-emerald-400/15 text-emerald-200" : "border-white/15 bg-transparent text-white/75"}`}>
                {g.label} <span className={`ml-1 ${active ? "text-emerald-200/70" : "text-white/40"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-sm text-white/55">{t.saved.empty}</p>
        ) : (
          <div className="mt-4 space-y-3">
            {filtered.map(l => (
              <CatalogCard key={l.id} listing={l} tier={tier} onOpen={() => onOpen(l)} saved onToggleSave={() => onToggleSave(l.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAY (QR + Wallet)
   ───────────────────────────────────────────────────────────── */
function PayScreen({ tier }: { tier: Tier }) {
  const [sub, setSub] = useState<"qr" | "wallet">("qr");
  const wallet = SEED_USER.wallet;
  // Story-verification banner only when the active class came from the followers path
  const showStoryBanner = SEED_USER.paths.followers.state === "active" && SEED_USER.paths.followers.storyRequired && tier !== "bronze";

  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">{t.pay.title}</h1>
        <TierBadge tier={tier} />
      </div>

      {/* Sub-tabs */}
      <div className="mt-4 flex gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 text-xs">
        {([
          { id: "qr" as const,     label: t.pay.tabQr,     Icon: QrCode },
          { id: "wallet" as const, label: t.pay.tabWallet, Icon: Wallet },
        ]).map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setSub(id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition ${sub === id ? "bg-white text-black" : "text-white/65 hover:text-white"}`}>
            <Icon className="h-3.5 w-3.5" />{label}
          </button>
        ))}
      </div>

      {sub === "qr" && (
        <>
          <p className="mt-4 text-sm text-white/55">{t.qr.desc}</p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-2xl bg-white p-4">
              <QRPattern />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/45">Clase actual</p>
                <p className="font-display text-lg font-semibold">{TIER_META[tier].label}</p>
              </div>
              <span className="rounded-lg bg-emerald-300/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">+{TIER_META[tier].price === 0 ? "0" : (TIER_META[tier].price / 20).toFixed(0)}% cashback</span>
            </div>
          </div>

          {showStoryBanner && (
            <div className="mt-4 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-300/20 p-2 text-amber-200"><Instagram className="h-4 w-4" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-100">{t.pay.storyPending}</p>
                  <p className="mt-0.5 text-[11px] text-amber-100/75">{t.pay.storyDesc}</p>
                </div>
              </div>
            </div>
          )}

          <section className="mt-6">
            <p className="eyebrow !text-white/40">{t.qr.howTitle}</p>
            <ol className="mt-3 space-y-3">
              {t.qr.how.map((step, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-xs font-bold text-fuchsia-200">{i + 1}</span>
                  <p className="text-sm text-white/80">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {sub === "wallet" && (
        <>
          <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-fuchsia-500/15 p-5">
            <p className="text-[10px] uppercase tracking-wider text-white/55">{t.pay.walletBalance}</p>
            <p className="mt-1 font-display text-4xl font-bold">${wallet.credits}<span className="ml-1 text-base font-medium text-white/55">MXN</span></p>
            <p className="mt-2 text-[11px] text-white/65">{t.pay.walletDesc}</p>
          </div>

          <section className="mt-6">
            <p className="eyebrow !text-white/40">{t.pay.tx}</p>
            {wallet.transactions.length === 0 ? (
              <p className="mt-2 text-sm text-white/55">{t.pay.noTx}</p>
            ) : (
              <div className="mt-2 space-y-2">
                {wallet.transactions.map(tx => {
                  const positive = tx.kind === "earned" || tx.kind === "gift" || tx.kind === "refund";
                  return (
                    <div key={tx.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                      <div className={`rounded-lg p-2 ${positive ? "bg-emerald-300/15 text-emerald-200" : "bg-rose-300/15 text-rose-200"}`}>
                        {positive ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{tx.venue}</p>
                        <p className="text-[11px] text-white/55 capitalize">{tx.kind === "earned" ? "Cashback earned" : tx.kind === "spent" ? "Credit spent" : tx.kind === "gift" ? "Gift received" : "Refund"} · {tx.when}</p>
                      </div>
                      <p className={`font-display text-base font-bold ${positive ? "text-emerald-300" : "text-rose-300"}`}>{positive ? "+" : "−"}${tx.amount}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {wallet.giftCards.length > 0 && (
            <section className="mt-6">
              <p className="eyebrow !text-white/40">{t.pay.gifts}</p>
              <div className="mt-2 space-y-2">
                {wallet.giftCards.map(g => (
                  <div key={g.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-amber-300/10 to-fuchsia-500/10 p-3">
                    <div className="rounded-lg bg-amber-300/20 p-2 text-amber-200"><Gift className="h-4 w-4" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">${g.amount} de {g.from}</p>
                      {g.message && <p className="text-[11px] italic text-white/55">"{g.message}"</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function QRPattern() {
  // Deterministic faux-QR
  const cells = Array.from({ length: 21 * 21 }, (_, i) => ((i * 7 + (i % 5) * 13) % 11) < 5);
  return (
    <div className="grid h-full w-full grid-cols-[repeat(21,1fr)] gap-[2px]">
      {cells.map((on, i) => {
        const corner = (i < 21 * 7 && (i % 21) < 7) || (i < 21 * 7 && (i % 21) > 13) || (i > 21 * 14 && (i % 21) < 7);
        const isCornerFrame = corner && (((i % 21 === 0 || i % 21 === 6 || i % 21 === 14 || i % 21 === 20) || (Math.floor(i / 21) === 0 || Math.floor(i / 21) === 6 || Math.floor(i / 21) === 14)));
        return <div key={i} className={`${on || isCornerFrame ? "bg-black" : "bg-transparent"} rounded-[1px]`} />;
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHARE
   ───────────────────────────────────────────────────────────── */
function ShareScreen() {
  const [copied, setCopied] = useState(false);
  const code = "DANIEL100";
  const copy = () => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-6">
      <h1 className="font-display text-2xl font-bold">{t.share.title}</h1>
      <p className="mt-1 text-sm text-white/55">{t.share.subtitle}</p>

      <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/15 to-amber-500/10 p-5">
        <p className="text-[10px] uppercase tracking-wider text-fuchsia-200">{t.share.code}</p>
        <div className="mt-2 flex items-center gap-2">
          <p className="font-display text-3xl font-bold tracking-wider">{code}</p>
          <button onClick={copy} className="ml-auto rounded-lg border border-white/15 bg-white/10 p-2 text-white/85">
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-black">
          <Share2 className="h-4 w-4" /> {t.share.invite}
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-300/20 p-2 text-amber-300"><Gift className="h-5 w-5" /></div>
          <div className="flex-1">
            <p className="font-display text-base font-semibold">{t.share.giftTitle}</p>
            <p className="mt-1 text-xs text-white/65">{t.share.giftDesc}</p>
          </div>
        </div>
        <button className="mt-3 w-full rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white">{t.share.giftCta}</button>
      </div>

      {/* Gift a subscription */}
      <div className="mt-3 rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-amber-300/10 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-fuchsia-500/20 p-2 text-fuchsia-200"><Crown className="h-5 w-5" /></div>
          <div className="flex-1">
            <p className="font-display text-base font-semibold">{t.giftSub.title}</p>
            <p className="mt-1 text-xs text-white/65">{t.giftSub.desc}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(["silver", "gold", "diamond"] as Tier[]).map(tk => (
            <button key={tk} className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-[11px] font-semibold text-white/85 hover:bg-white/10">
              {TIER_META[tk].label}
              <span className="block text-[10px] font-normal text-white/45">${TIER_META[tk].price} MXN</span>
            </button>
          ))}
        </div>
      </div>

      {/* Creator program */}
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-300/15 p-2 text-emerald-200"><TrendingUp className="h-5 w-5" /></div>
          <div className="flex-1">
            <p className="font-display text-base font-semibold">{t.creator.title}</p>
            <p className="mt-1 text-xs text-white/65">{t.creator.desc}</p>
          </div>
        </div>
        <button className="mt-3 w-full rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white">{t.creator.cta}</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROFILE + UPGRADE
   ───────────────────────────────────────────────────────────── */
function Profile({ tier, paths, onUpgrade, savedCount, memberships, onLeaveMembership }: {
  tier: Tier; paths: ClassPaths; onUpgrade: () => void; savedCount: number;
  memberships: Set<string>; onLeaveMembership: (communityId: string) => void;
}) {
  const active = resolveActiveTier(paths);
  const myCommunities = SEED_LISTINGS.filter(l => l.category === "community" && memberships.has(l.id));
  const [view, setView] = useState<"card" | "class" | "groups" | "connectors" | "settings">("card");
  const [discoverable, setDiscoverable] = useState(true);
  const [connections, setConnections] = useState<Record<string, boolean>>({ instagram: true });
  type Connector = { id: string; label: string; desc: string; icon: React.ReactNode; tint: string; ring: string };
  const connectors: Array<Connector> = [
    { id: "ai",        label: "ChatGPT / Claude", desc: "Let your AI book & act on your behalf · MCP", icon: <Bot className="h-4 w-4" />,       tint: "bg-gradient-to-br from-violet-500 to-fuchsia-500", ring: "ring-violet-400/30" },
    { id: "instagram", label: "Instagram",        desc: "Followers, taste & social proof",             icon: <Instagram className="h-4 w-4" />, tint: "bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400", ring: "ring-rose-400/30" },
    { id: "linkedin",  label: "LinkedIn",         desc: "Industry, seniority & network",               icon: <Globe className="h-4 w-4" />,     tint: "bg-gradient-to-br from-sky-600 to-blue-700", ring: "ring-sky-400/30" },
    { id: "spotify",   label: "Spotify",          desc: "Music & vibe matching",                       icon: <Sparkles className="h-4 w-4" />,  tint: "bg-gradient-to-br from-emerald-500 to-green-600", ring: "ring-emerald-400/30" },
    { id: "google",    label: "Google",           desc: "Calendar & places visited",                   icon: <MapPin className="h-4 w-4" />,    tint: "bg-gradient-to-br from-amber-400 via-rose-400 to-sky-500", ring: "ring-amber-400/30" },
    { id: "tiktok",    label: "TikTok",           desc: "Trends you actually care about",              icon: <Flame className="h-4 w-4" />,     tint: "bg-gradient-to-br from-cyan-400 via-white/80 to-rose-500", ring: "ring-cyan-400/30" },
    { id: "amazon",    label: "Amazon",           desc: "Shopping taste & better deals",               icon: <ShoppingBag className="h-4 w-4" />, tint: "bg-gradient-to-br from-amber-500 to-orange-600", ring: "ring-amber-400/30" },
  ];
  const connectedCount = Object.values(connections).filter(Boolean).length;
  const tabs: Array<{ id: typeof view; label: string }> = [
    { id: "card",       label: "Card" },
    { id: "class",      label: "Class" },
    { id: "groups",     label: "Groups" },
    { id: "connectors", label: "Connectors" },
    { id: "settings",   label: "Settings" },
  ];
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-6">
      {/* Identity header — compact */}
      <div className="flex items-center gap-3">
        <div className={`h-12 w-12 shrink-0 rounded-full ${TIER_META[tier].bg} p-[2px]`}>
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black/60">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-display text-xl font-bold leading-tight truncate">{SEED_USER.name}</p>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/55">{TIER_META[tier].label}</span>
          </div>
          <p className="truncate text-xs text-white/50">{SEED_USER.handle}</p>
        </div>
      </div>

      <div className="mt-5 -mx-5 flex gap-1 overflow-x-auto rounded-full px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-full gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {tabs.map(tb => {
            const active = view === tb.id;
            return (
              <button key={tb.id} onClick={() => setView(tb.id)}
                className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? "bg-white text-black" : "text-white/65"}`}>
                {tb.label}
              </button>
            );
          })}
        </div>
      </div>

      {view === "card" && (
        <section className="mt-5 space-y-4">
          {/* Discoverability toggle */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${discoverable ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/55"}`}>
                {discoverable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">Discoverable in people search</p>
                <p className="text-[10px] text-white/50">Venues, groups & people can find you by vibe.</p>
              </div>
            </div>
            <button onClick={() => setDiscoverable(v => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${discoverable ? "bg-emerald-400/80" : "bg-white/15"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${discoverable ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>

          {/* The Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Your card</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Rooftop nights","Natural wine","Indie electronic","Pádel","San Pedro"].map(tag => (
                <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/75">{tag}</span>
              ))}
            </div>

            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-violet-300" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">AI fit</p>
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-white/80">
                Rooftop regular with a late-week rhythm. Overlaps with creative founders and natural-wine crowds in San Pedro.
              </p>
            </div>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-black">
              <Share2 className="h-3.5 w-3.5" /> Share card
            </button>
          </div>

          <p className="px-1 text-[10px] text-white/45">
            Generated from your connectors. Mesita never shares your contact info.
          </p>
        </section>
      )}

      {view === "class" && (
        <section className="mt-5 space-y-3">
          {(["bronze","silver","gold","diamond"] as Tier[]).map(tk => {
            const meta = TIER_META[tk];
            const isCurrent = tk === tier;
            const priceLabel = tk === "bronze" ? "Free" : `$${meta.price}/mo`;
            const desc =
              tk === "bronze"  ? "Default · under 1K followers" :
              tk === "silver"  ? "1K+ followers · or $200/mo" :
              tk === "gold"    ? "5K+ followers · or $500/mo" :
                                 "20K+ · $1,000/mo · or appeal";
            const cashback =
              tk === "bronze"  ? "Base cashback" :
              tk === "silver"  ? "More cashback" :
              tk === "gold"    ? "Even more cashback" :
                                 "Most cashback";
            return (
              <div key={tk}
                className={`rounded-2xl border bg-white/[0.04] p-4 ${isCurrent ? "border-yellow-300/60" : "border-white/10"}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${meta.bg}`}>
                    {meta.label[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-base font-bold">Mesita {meta.label}</p>
                      <p className="font-display text-sm font-bold whitespace-nowrap">{priceLabel}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] text-white/55">{desc}</p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <p className="text-[12px] font-medium text-fuchsia-300">{cashback}</p>
                      {isCurrent && (
                        <span className="rounded-md bg-yellow-300/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-yellow-200">Current</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={onUpgrade} className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black">
            <Crown className="h-3.5 w-3.5" /> {t.profile.upgrade}
          </button>
        </section>
      )}

      {view === "groups" && (
        <section className="mt-5">
          <p className="mt-1 text-[11px] text-white/55">{t.profile.myGroupsDesc}</p>
          <div className="mt-4 space-y-1.5">
            {myCommunities.length === 0 && (
              <p className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-[11px] text-white/50">
                No communities yet. Head to Discover → Communities to join your first one.
              </p>
            )}
            {myCommunities.map(c => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                <img src={c.cover} alt={c.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="truncate text-[10px] text-white/50">{c.subcategory} · {(c.members ?? 0).toLocaleString()} members</p>
                </div>
                <button onClick={() => onLeaveMembership(c.id)} className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-[10px] text-white/70 hover:text-white">
                  {t.profile.leaveGroup}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "settings" && (
        <section className="mt-5">
          <div className="space-y-2">
            {[
              { label: "Account", desc: `${SEED_USER.handle}` },
              { label: "Notifications", desc: "Push notifications" },
              { label: "Language", desc: "Español" },
              { label: "Privacy", desc: "Data & permissions" },
              { label: "Help & support", desc: "FAQ, contact" },
              { label: "Log out", desc: "" },
            ].map(s => (
              <button key={s.label} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm">
                <span>
                  <p>{s.label}</p>
                  {s.desc && <p className="text-[10px] text-white/45">{s.desc}</p>}
                </span>
                <ChevronRight className="h-4 w-4 text-white/45" />
              </button>
            ))}
          </div>
        </section>
      )}

      {view === "connectors" && (
        <section className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-white/55">Link your accounts so Mesita can match you with better venues, events & people.</p>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/70">{connectedCount}/{connectors.length}</span>
          </div>
          <div className="mt-4 space-y-2">
            {connectors.map(c => {
              const on = !!connections[c.id];
              return (
                <div key={c.id} className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border bg-white/[0.04] p-3 transition ${on ? "border-emerald-400/25" : "border-white/10"}`}>
                  <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-lg shadow-black/40 ring-1 ${c.tint} ${c.ring}`}>
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold">{c.label}</p>
                      {on && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                    </div>
                    <p className="truncate text-[10px] text-white/50">{c.desc}</p>
                  </div>
                  <button
                    onClick={() => setConnections(p => ({ ...p, [c.id]: !on }))}
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition ${on ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "bg-white text-black hover:bg-white/90"}`}>
                    {on ? (<span className="inline-flex items-center gap-1"><Check className="h-3 w-3" />Connected</span>) : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[10px] text-white/55">
            <Lock className="mt-0.5 h-3 w-3 shrink-0 text-emerald-300/70" />
            <span>Mesita only reads what's needed to improve matching — never posts on your behalf.</span>
          </p>
        </section>
      )}
    </div>
  );
}

function PathRow({ icon, title, desc, state, highlight }: { icon: React.ReactNode; title: string; desc: string; state: "active" | "inactive" | "locked"; highlight?: boolean }) {
  const stateLabel = state === "active" ? t.profile.pathStateActive : state === "locked" ? t.profile.pathStateLocked : t.profile.pathStateInactive;
  const stateClass = state === "active" ? "bg-emerald-300/15 text-emerald-200" : state === "locked" ? "bg-white/10 text-white/45" : "bg-white/10 text-white/55";
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3 ${highlight ? "border-fuchsia-300/50 bg-fuchsia-500/10" : "border-white/10 bg-white/[0.04]"}`}>
      <div className="rounded-lg bg-white/10 p-2 text-white/85">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{title}</p>
          {highlight && <span className="rounded-full bg-fuchsia-300/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-fuchsia-200">Activo</span>}
        </div>
        <p className="mt-0.5 text-[11px] text-white/55">{desc}</p>
      </div>
      <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${stateClass}`}>
        {state === "locked" && <Lock className="mr-1 inline h-2.5 w-2.5" />}
        {stateLabel}
      </span>
    </div>
  );
}

function UpgradeScreen({ tier, onClose, onSelect }: { tier: Tier; onClose: () => void; onSelect: (t: Tier) => void }) {
  const perksByTier: Record<Tier, string[]> = {
    bronze: t.profile.bronzePerks,
    silver: t.profile.silverPerks,
    gold: t.profile.goldPerks,
    diamond: t.profile.diamondPerks,
  };
  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-[oklch(0.10_0.02_280)] text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/60 px-5 py-4 backdrop-blur-xl">
        <button onClick={onClose} className="rounded-full bg-white/10 p-1.5"><X className="h-4 w-4" /></button>
        <p className="font-display text-base font-semibold">{t.profile.choosePlan}</p>
        <div className="w-8" />
      </header>

      <div className="space-y-3 px-5 py-6 pb-12">
        {TIERS.map(tk => {
          const meta = TIER_META[tk];
          const isCurrent = tk === tier;
          const perks = perksByTier[tk];
          return (
            <div key={tk} className={`overflow-hidden rounded-2xl border ${isCurrent ? "border-fuchsia-300/60" : "border-white/10"} bg-white/[0.04]`}>
              <div className={`${meta.bg} px-4 py-3 text-black/85`}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl font-bold">{meta.label}</p>
                  <p className="text-sm font-semibold">{meta.price === 0 ? "Free" : `$${meta.price} MXN`}{meta.price !== 0 && <span className="text-xs font-normal">{t.profile.perMonth}</span>}</p>
                </div>
                <p className="mt-0.5 text-[11px] opacity-80">o {meta.followers}</p>
              </div>
              <div className="space-y-2 px-4 py-3">
                {perks.map(p => (
                  <div key={p} className="flex items-start gap-2 text-xs text-white/80">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />{p}
                  </div>
                ))}
                <button
                  onClick={() => onSelect(tk)}
                  disabled={isCurrent}
                  className={`mt-3 w-full rounded-xl py-2.5 text-sm font-semibold transition ${isCurrent ? "bg-white/10 text-white/55" : "bg-white text-black hover:bg-white/90"}`}>
                  {isCurrent ? t.profile.current : t.profile.select}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared bits
   ───────────────────────────────────────────────────────────── */
function TierBadge({ tier, small }: { tier: Tier; small?: boolean }) {
  const meta = TIER_META[tier];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${meta.chip} ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"} font-semibold uppercase tracking-wider`}>
      <Crown className={`${small ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
      {meta.label}
    </span>
  );
}
