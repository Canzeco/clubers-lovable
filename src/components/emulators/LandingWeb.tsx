import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  QrCode,
  MessageCircle,
  Star,
  Check,
  Instagram,
  Crown,
  MapPin,
  Compass,
  Bot,
  Heart,
  TrendingUp,
  Users,
  Camera,
  Calendar,
  BarChart3,
  Wallet,
  GraduationCap,
  Trophy,
  Gift,
  Clock,
  ShieldCheck,
} from "lucide-react";

type Audience = "guests" | "venues";

export function LandingWeb() {
  const [aud, setAud] = useState<Audience>("guests");

  return (
    <div className="h-full w-full overflow-y-auto bg-background scrollbar-hide">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-peacock text-base shadow-glow">
              🦚
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              Mesita
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
            <a className="hover:text-foreground">For guests</a>
            <a className="hover:text-foreground">For venues</a>
            <a className="hover:text-foreground">Tiers</a>
            <a className="hover:text-foreground">How payment works</a>
            <a className="hover:text-foreground">Why Mesita</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground md:inline-flex">
              List your venue
            </button>
            <button className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-glow hover:opacity-90">
              Get the app
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.15fr_1fr] md:items-center md:py-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-secondary" /> The cashback club
              for going out
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-[64px]">
              Some guests are
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                part of the product.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Mesita turns presence, influence and social magnetism into
              spendable value — for the guests who fill the room, and the
              venues that want them in it.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-glow hover:opacity-90">
                Get the app
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur hover:bg-card">
                List your venue
              </button>
            </div>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">
              A smart mobile wallet of cashback coupons for restaurants, cafés,
              bars and nightlife — built on the truth that not every guest
              creates the same value.
            </p>
          </div>

          {/* Hero card mock */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -left-6 -top-6 h-full w-full rounded-3xl bg-peacock opacity-30 blur-2xl" />
            <div className="relative rounded-3xl border border-border bg-card-soft p-5 shadow-elev backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tier-diamond text-xs font-bold text-white">
                    D
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Diamond tier</p>
                    <p className="text-[10px] text-muted-foreground">
                      Invite-only · 30% cashback
                    </p>
                  </div>
                </div>
                <Crown className="h-4 w-4 text-gold" />
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl bg-peacock p-4 text-white">
                <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">
                  Tonight · Polanco
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  Casa Luminar
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] opacity-90">
                  <span>Rooftop</span>
                  <span>·</span>
                  <span>$$$</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-current" /> 4.8
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] opacity-70">Cashback in wallet</p>
                    <p className="font-display text-3xl font-semibold">
                      $1,440
                    </p>
                  </div>
                  <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black">
                    Reserve
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                {[
                  { l: "Friends here", v: "4" },
                  { l: "Gold guests", v: "12" },
                  { l: "IG stories", v: "27" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-border bg-background/60 p-2 text-center">
                    <p className="font-display text-base font-semibold">{s.v}</p>
                    <p className="text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience toggle */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Two sides of the same room
          </p>
          <div className="flex rounded-full border border-border bg-background p-1 text-xs">
            {(["guests", "venues"] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAud(a)}
                className={`rounded-full px-4 py-1.5 font-medium capitalize transition ${
                  aud === a ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
              >
                For {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOR GUESTS */}
      {aud === "guests" && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              For guests
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              The smartest way to decide where to go out tonight.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Experience Intelligence",
                body: "Mesita reviews, Google & Facebook ratings, real price signals, where Bronze, Silver, Gold and Diamond guests are right now, your friends' activity, and venue-tagged Instagram stories — one discovery layer, far smarter than a review app.",
              },
              {
                icon: Bot,
                title: "Table Reservations",
                body: "One tap. At any venue, affiliated or not. Our AI voice agent calls the restaurant and books your table in a natural conversation. Confirmation hits your phone seconds later.",
              },
              {
                icon: Wallet,
                title: "Cashback Coupons",
                body: "Carry a prepaid balance with bonus credits, auto-applied as a discount on your next visit. Earn cashback at any Mesita venue by showing your QR — extra bonus for posting an Instagram story.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-card-soft p-6 shadow-elev"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-peacock text-white shadow-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Discovery modes */}
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Four ways to discover
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {[
                { icon: Heart, t: "Swipe feed", d: "AI vibe tags" },
                { icon: MapPin, t: "Map", d: "Cashback badges" },
                { icon: Compass, t: "Catalog", d: "Ratings side by side" },
                { icon: MessageCircle, t: "AI planner", d: "Just chat" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <m.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{m.t}</p>
                    <p className="text-[11px] text-muted-foreground">{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-glow">
              Download the app
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium">
              <MessageCircle className="h-4 w-4" />
              Try it on WhatsApp — no download
            </button>
          </div>
        </section>
      )}

      {/* FOR VENUES */}
      {aud === "venues" && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              For venues
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Stop paying for foot traffic. Start choosing your guests.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Mesita is a targeted guest-acquisition channel — not a passive
              listing. Compete directly for high-intent guests deciding where
              to go out tonight, and reward the ones who actually move the
              needle.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Get Discovered & Win Customers",
                body: "A one-time \"Welcome\" cashback offer, shown against the live pool of nearby guests who've never visited. Engineered to convert first-timers into regulars.",
              },
              {
                icon: Crown,
                title: "Win the Magnetic & High-Spending Guests",
                body: "Set separate cashback rates for Bronze, Silver, Gold and Diamond. Each rate comes with an estimated lift in weekly visits — so you know what you're buying.",
              },
              {
                icon: Camera,
                title: "Automated Instagram Stories",
                body: "Pay a small bonus for verified guest stories tagging your venue. An AI bot detects mentions and tags, and approves automatically. Real visits become real exposure.",
              },
              {
                icon: Calendar,
                title: "Easier Reservations",
                body: "Every booking includes advance visibility into group size and guest tier. Use reservations strategically to fill slow days and off-peak hours.",
              },
              {
                icon: BarChart3,
                title: "Marketing Intelligence",
                body: "One dashboard: profile views, influenced spend, cashback paid, full conversion funnel, ROAS, average ticket, repeat rate, verified stories. AI copilot writes your next campaign in one click.",
              },
              {
                icon: Clock,
                title: "Ten minutes to set up",
                body: "No hardware. No POS integration. No staff training. Costs nothing until it pays off.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-card-soft p-6 shadow-elev"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-peacock text-white shadow-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-glow">
              Open your dashboard at manager.mesita.app
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* TIERS */}
      <section className="bg-card/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              Guest tiers
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Your social capital, made spendable.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Mesita segments guests into four tiers — automatically, based on
              real behavior and digital footprint.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { n: "Bronze", c: "bg-tier-bronze", who: "Where everyone starts", d: "0–2 visits" },
              { n: "Silver", c: "bg-tier-silver", who: "~1k+ followers", d: "3–6 visits" },
              { n: "Gold", c: "bg-tier-gold", who: "~5k+ followers", d: "7–19 visits" },
              { n: "Diamond", c: "bg-tier-diamond", who: "Invite-only · 20k+", d: "Manual review" },
            ].map((t) => (
              <div
                key={t.n}
                className="overflow-hidden rounded-3xl border border-border bg-background"
              >
                <div className={`${t.c} h-2`} />
                <div className="p-5">
                  <p className="font-display text-xl font-semibold">{t.n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.who}
                  </p>
                  <p className="mt-4 text-sm text-foreground">{t.d}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            Higher tiers unlock richer cashback and priority access. Models,
            chefs, press, and founders whose value isn't captured by a follower
            count get manually reviewed. The guests who shape the room get
            treated like it.
          </p>
        </div>
      </section>

      {/* HOW PAYMENT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              How payment works
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Nothing changes during your meal.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              At checkout, you ask for the bill and show your QR. The waiter
              scans it with their own phone — no new hardware, no POS
              integration. You pay through a secure Stripe link, and cashback
              lands in your Mesita balance automatically.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
              {["Card payments only", "No cash", "Full-service restaurants"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-muted-foreground"
                >
                  <Check className="h-3 w-3 text-secondary" />
                  {b}
                </span>
              ))}
            </div>
          </div>
          <ol className="space-y-3">
            {[
              { i: QrCode, t: "Show your QR", d: "Open the app, ask for the bill." },
              { i: Camera, t: "Waiter scans", d: "From their own phone — no POS install." },
              { i: ShieldCheck, t: "Pay via Stripe", d: "Secure link, card only." },
              { i: Wallet, t: "Cashback lands", d: "Auto-credited to your Mesita balance." },
            ].map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card-soft p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peacock text-white">
                  <s.i className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    <span className="text-muted-foreground">0{i + 1} · </span>
                    {s.t}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ENGAGEMENT LAYERS */}
      <section className="bg-card/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              Engagement layers
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Beyond cashback.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Communities",
                body: "Verify your school or org email to unlock venue-specific perks. Tec students fill San Pedro rooftops on Thursdays. Stanford alumni gather at Polanco wine bars.",
              },
              {
                icon: Trophy,
                title: "Gamification",
                body: "Levels and XP. Named progression — Tastemaker, Connoisseur. Weekly streaks, leaderboards, regional explorer badges.",
              },
              {
                icon: Gift,
                title: "Sharing",
                body: "Send a friend $100 MXN in credit. Partner with us as a creator. Refer a venue and set them up in ten minutes.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-background p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MESITA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-peacock p-10 text-white shadow-glow md:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] opacity-80">
            Why Mesita
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Not loyalty. Not POS. Not rewards.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="space-y-2 text-sm leading-relaxed opacity-90">
              <p><span className="font-semibold">Cluber</span> tracks loyalty.</p>
              <p><span className="font-semibold">Toast</span> processes payments.</p>
              <p><span className="font-semibold">FiveStars and Thanx</span> run rewards programs.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 text-sm leading-relaxed backdrop-blur">
              Mesita does something none of them do: it treats guests as a
              <span className="font-semibold"> curated asset class</span> — and
              turns who walks through your door into a lever you can actually
              pull.
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs opacity-80">
            <span className="inline-flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Targeted acquisition</span>
            <span className="inline-flex items-center gap-1.5"><Crown className="h-3.5 w-3.5" /> Tier-based rewards</span>
            <span className="inline-flex items-center gap-1.5"><Instagram className="h-3.5 w-3.5" /> Verified social reach</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card-soft p-8 shadow-elev">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              For guests
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              Download Mesita.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Find the right place tonight, book the table in one tap, and earn
              cashback every time you walk in.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-glow">
                Download the app
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium">
                <MessageCircle className="h-4 w-4" /> Open on WhatsApp
              </button>
            </div>
          </div>
          <div className="rounded-3xl bg-peacock p-8 text-white shadow-glow">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] opacity-80">
              For venues
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              Ten minutes to set up.
            </h3>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
              No hardware. No commitment. Pay only when it works.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90">
              Start at manager.mesita.app
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>🦚</span>
              <span>Mesita · Spendable social capital</span>
            </div>
            <div className="flex items-center gap-4">
              <a className="hover:text-foreground">Privacy</a>
              <a className="hover:text-foreground">Terms</a>
              <a className="inline-flex items-center gap-1 hover:text-foreground">
                <Instagram className="h-3 w-3" /> @mesita
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
