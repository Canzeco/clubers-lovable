import { useState } from "react";
import {
  ArrowUpRight,
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
  Asterisk,
} from "lucide-react";

type Audience = "guests" | "venues";

const Marquee = ({ items }: { items: string[] }) => (
  <div className="flex gap-10 whitespace-nowrap">
    {[...items, ...items, ...items].map((t, i) => (
      <span key={i} className="inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight">
        {t}
        <Asterisk className="h-4 w-4 text-primary" />
      </span>
    ))}
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-sm border border-foreground/80 bg-background px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]">
    {children}
  </span>
);

const SectionLabel = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-baseline gap-3 border-b-2 border-foreground pb-2">
    <span className="font-display text-3xl font-semibold tabular-nums">{n}</span>
    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{children}</span>
  </div>
);

export function LandingWeb() {
  const [aud, setAud] = useState<Audience>("guests");

  return (
    <div className="h-full w-full overflow-y-auto bg-[oklch(0.97_0.008_25)] text-foreground scrollbar-hide">
      {/* Top nav — newspaper masthead */}
      <header className="sticky top-0 z-30 border-b-2 border-foreground bg-[oklch(0.97_0.008_25)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦚</span>
            <span className="font-display text-2xl font-semibold italic tracking-tight">Mesita</span>
            <span className="ml-2 hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:inline">
              Vol. 01 · The cashback club
            </span>
          </div>
          <nav className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex">
            <a className="hover:text-primary">Guests</a>
            <a className="hover:text-primary">Venues</a>
            <a className="hover:text-primary">Tiers</a>
            <a className="hover:text-primary">Payment</a>
            <a className="hover:text-primary">Why</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden text-[11px] font-bold uppercase tracking-[0.18em] hover:text-primary md:inline">
              List your venue
            </button>
            <button className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-background hover:bg-primary">
              Get the app <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO — editorial split */}
      <section className="border-b-2 border-foreground">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-6">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            <span>Issue 01 — Spend Like Someone Watches</span>
            <span>Mexico City · Worldwide</span>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pb-12">
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-display text-[68px] font-semibold leading-[0.92] tracking-[-0.03em] md:text-[112px]">
              Some guests<br />
              <span className="italic text-primary">are part of</span><br />
              <span className="relative inline-block">
                the product.
                <span className="absolute -right-6 -top-2 hidden h-3 w-3 rotate-12 bg-secondary md:block" />
              </span>
            </h1>
          </div>
          <aside className="col-span-12 flex flex-col justify-end gap-5 md:col-span-4">
            <div className="border-l-4 border-primary pl-4">
              <p className="text-base leading-relaxed">
                Mesita turns presence, influence and social magnetism into{" "}
                <span className="bg-secondary/30 px-1 font-semibold">spendable value</span> — for the guests who fill the room, and the venues that want them in it.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-none bg-foreground px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background hover:bg-primary">
                Get the app <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-1.5 border-2 border-foreground bg-background px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background">
                List your venue
              </button>
            </div>
          </aside>
        </div>

        {/* Subhero strip */}
        <div className="border-t-2 border-foreground bg-foreground py-3 text-background">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm leading-snug">
              <Asterisk className="mr-1 inline h-3 w-3 text-secondary" />
              A smart mobile wallet of cashback coupons for restaurants, cafés, bars and nightlife — built on the truth that{" "}
              <span className="italic">not every guest creates the same value.</span>
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden border-t-2 border-foreground bg-secondary/20 py-3">
          <Marquee items={["Cashback Club", "Tier-based Rewards", "AI Discovery", "Stripe-Native", "Tonight in Polanco", "Casa Luminar"]} />
        </div>
      </section>

      {/* Hero card — separate, large */}
      <section className="border-b-2 border-foreground bg-foreground py-14 text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6">
          <div className="col-span-12 md:col-span-5">
            <Tag>Diamond tier</Tag>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight">
              Tonight,<br /><span className="italic text-secondary">your night.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm opacity-80">
              Real-time signal: who's where, who walks in, who lights up the room.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="relative border-2 border-background bg-background p-6 text-foreground">
              <div className="absolute -right-3 -top-3 flex h-12 w-12 rotate-12 items-center justify-center rounded-full bg-tier-gold">
                <Crown className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex items-center justify-between border-b border-foreground pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Polanco · Rooftop</p>
                  <p className="font-display text-4xl font-semibold leading-tight">Casa Luminar</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cashback</p>
                  <p className="font-display text-3xl font-semibold text-primary">$1,440</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-current" /> 4.8</span>
                <span>·</span><span>$$$</span><span>·</span>
                <span>Live</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-px bg-foreground">
                {[
                  { l: "Friends", v: "4" },
                  { l: "Gold guests", v: "12" },
                  { l: "IG stories", v: "27" },
                ].map((s) => (
                  <div key={s.l} className="bg-background p-3 text-center">
                    <p className="font-display text-2xl font-semibold">{s.v}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-foreground py-3 text-xs font-bold uppercase tracking-[0.25em] text-background hover:bg-primary">
                Reserve table →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Audience toggle */}
      <section className="border-b-2 border-foreground bg-[oklch(0.97_0.008_25)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]">§ Two sides of the same room</p>
          <div className="flex border-2 border-foreground">
            {(["guests", "venues"] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAud(a)}
                className={`px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                  aud === a ? "bg-foreground text-background" : "hover:bg-foreground/10"
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
        <section className="border-b-2 border-foreground">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <SectionLabel n="01">For guests</SectionLabel>
            <h2 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
              The smartest way to decide where to go out <span className="italic text-primary">tonight.</span>
            </h2>

            <div className="mt-12 grid grid-cols-12 gap-px bg-foreground">
              {[
                {
                  icon: Sparkles,
                  title: "Experience Intelligence",
                  body: "Mesita reviews, Google & Facebook ratings, real price signals, where Bronze, Silver, Gold and Diamond guests are right now, your friends' activity, and venue-tagged Instagram stories — one discovery layer, far smarter than a review app.",
                  span: "md:col-span-5",
                  bg: "bg-secondary/20",
                },
                {
                  icon: Bot,
                  title: "Table Reservations",
                  body: "One tap. At any venue, affiliated or not. Our AI voice agent calls the restaurant and books your table in a natural conversation. Confirmation hits your phone seconds later.",
                  span: "md:col-span-4",
                  bg: "bg-background",
                },
                {
                  icon: Wallet,
                  title: "Cashback Coupons",
                  body: "Carry a prepaid balance with bonus credits, auto-applied as a discount on your next visit. Earn cashback at any Mesita venue by showing your QR — extra bonus for posting an Instagram story.",
                  span: "md:col-span-3",
                  bg: "bg-tier-gold/30",
                },
              ].map((s, i) => (
                <article key={i} className={`col-span-12 ${s.span} ${s.bg} p-7`}>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-semibold tabular-nums">0{i + 1}</span>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </article>
              ))}
            </div>

            {/* Discovery modes */}
            <div className="mt-14">
              <p className="border-b border-foreground pb-2 text-[11px] font-bold uppercase tracking-[0.3em]">
                Four ways to discover →
              </p>
              <div className="mt-0 grid grid-cols-12 gap-px bg-foreground border-t border-foreground">
                {[
                  { icon: Heart, t: "Swipe feed", d: "AI vibe tags" },
                  { icon: MapPin, t: "Map", d: "Cashback badges" },
                  { icon: Compass, t: "Catalog", d: "Ratings side by side" },
                  { icon: MessageCircle, t: "AI planner", d: "Just chat" },
                ].map((m, i) => (
                  <div key={i} className="col-span-6 md:col-span-3 bg-background p-6">
                    <m.icon className="h-5 w-5 text-primary" />
                    <p className="mt-6 font-display text-xl font-semibold">{m.t}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{m.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background hover:bg-primary">
                Download the app <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background">
                <MessageCircle className="h-3.5 w-3.5" /> Try it on WhatsApp — no download
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOR VENUES */}
      {aud === "venues" && (
        <section className="border-b-2 border-foreground">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <SectionLabel n="01">For venues</SectionLabel>
            <h2 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
              Stop paying for foot traffic. <span className="italic text-primary">Start choosing your guests.</span>
            </h2>
            <p className="mt-5 max-w-2xl border-l-4 border-primary pl-4 text-base leading-relaxed">
              Mesita is a targeted guest-acquisition channel — not a passive listing. Compete directly for high-intent guests deciding where to go out tonight, and reward the ones who actually move the needle.
            </p>

            <div className="mt-12 grid grid-cols-12 gap-px bg-foreground border-2 border-foreground">
              {[
                { icon: Users, title: "Get Discovered & Win Customers", body: "A one-time \"Welcome\" cashback offer, shown against the live pool of nearby guests who've never visited. Engineered to convert first-timers into regulars." },
                { icon: Crown, title: "Win the Magnetic & High-Spending Guests", body: "Set separate cashback rates for Bronze, Silver, Gold and Diamond. Each rate comes with an estimated lift in weekly visits — so you know what you're buying." },
                { icon: Camera, title: "Automated Instagram Stories", body: "Pay a small bonus for verified guest stories tagging your venue. An AI bot detects mentions and tags, and approves automatically. Real visits become real exposure." },
                { icon: Calendar, title: "Easier Reservations", body: "Every booking includes advance visibility into group size and guest tier. Use reservations strategically to fill slow days and off-peak hours." },
                { icon: BarChart3, title: "Marketing Intelligence", body: "One dashboard: profile views, influenced spend, cashback paid, full conversion funnel, ROAS, average ticket, repeat rate, verified stories. AI copilot writes your next campaign in one click." },
                { icon: Clock, title: "Ten minutes to set up", body: "No hardware. No POS integration. No staff training. Costs nothing until it pays off." },
              ].map((s, i) => (
                <article key={i} className="col-span-12 md:col-span-6 bg-background p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-semibold tabular-nums">0{i + 1}</span>
                    <span className="h-px flex-1 bg-foreground" />
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <button className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background hover:bg-primary">
                Open your dashboard at manager.mesita.app <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TIERS */}
      <section className="border-b-2 border-foreground bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-baseline gap-3 border-b-2 border-background pb-2">
            <span className="font-display text-3xl font-semibold tabular-nums">02</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Guest tiers</span>
          </div>
          <h2 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
            Your social capital, <span className="italic text-secondary">made spendable.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm opacity-80">
            Mesita segments guests into four tiers — automatically, based on real behavior and digital footprint.
          </p>

          <div className="mt-10 grid grid-cols-12 gap-px bg-background">
            {[
              { n: "Bronze", c: "bg-tier-bronze", who: "Where everyone starts", d: "0–2 visits", num: "01" },
              { n: "Silver", c: "bg-tier-silver", who: "~1k+ followers", d: "3–6 visits", num: "02" },
              { n: "Gold", c: "bg-tier-gold", who: "~5k+ followers", d: "7–19 visits", num: "03" },
              { n: "Diamond", c: "bg-tier-diamond", who: "Invite-only · 20k+", d: "Manual review", num: "04" },
            ].map((t) => (
              <div key={t.n} className="col-span-6 md:col-span-3 bg-foreground p-6">
                <div className={`${t.c} mb-6 h-20 w-20 rounded-full`} />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">Tier {t.num}</p>
                <p className="mt-1 font-display text-3xl font-semibold">{t.n}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] opacity-80">{t.who}</p>
                <p className="mt-4 text-sm">{t.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm opacity-80">
            Higher tiers unlock richer cashback and priority access. Models, chefs, press, and founders whose value isn't captured by a follower count get manually reviewed.{" "}
            <span className="italic text-secondary">The guests who shape the room get treated like it.</span>
          </p>
        </div>
      </section>

      {/* HOW PAYMENT WORKS */}
      <section className="border-b-2 border-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionLabel n="03">How payment works</SectionLabel>
          <div className="mt-6 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
                Nothing changes <span className="italic text-primary">during your meal.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed">
                At checkout, you ask for the bill and show your QR. The waiter scans it with their own phone — no new hardware, no POS integration. You pay through a secure Stripe link, and cashback lands in your Mesita balance automatically.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Card payments only", "No cash", "Full-service restaurants"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 border border-foreground bg-background px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    <Check className="h-3 w-3 text-primary" />
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="grid grid-cols-2 gap-px bg-foreground border-2 border-foreground">
                {[
                  { i: QrCode, t: "Show your QR", d: "Open the app, ask for the bill." },
                  { i: Camera, t: "Waiter scans", d: "From their own phone — no POS install." },
                  { i: ShieldCheck, t: "Pay via Stripe", d: "Secure link, card only." },
                  { i: Wallet, t: "Cashback lands", d: "Auto-credited to your Mesita balance." },
                ].map((s, i) => (
                  <div key={i} className="bg-background p-6">
                    <span className="font-display text-4xl font-semibold tabular-nums text-primary">0{i + 1}</span>
                    <s.i className="mt-4 h-5 w-5" />
                    <p className="mt-3 font-display text-xl font-semibold">{s.t}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT LAYERS */}
      <section className="border-b-2 border-foreground bg-secondary/15">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionLabel n="04">Engagement layers</SectionLabel>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
            Beyond <span className="italic text-primary">cashback.</span>
          </h2>

          <div className="mt-10 grid grid-cols-12 gap-px bg-foreground border-2 border-foreground">
            {[
              { icon: GraduationCap, title: "Communities", body: "Verify your school or org email to unlock venue-specific perks. Tec students fill San Pedro rooftops on Thursdays. Stanford alumni gather at Polanco wine bars." },
              { icon: Trophy, title: "Gamification", body: "Levels and XP. Named progression — Tastemaker, Connoisseur. Weekly streaks, leaderboards, regional explorer badges." },
              { icon: Gift, title: "Sharing", body: "Send a friend $100 MXN in credit. Partner with us as a creator. Refer a venue and set them up in ten minutes." },
            ].map((s, i) => (
              <article key={i} className="col-span-12 md:col-span-4 bg-background p-7">
                <div className="flex items-center justify-between border-b border-foreground pb-3">
                  <span className="font-display text-2xl font-semibold tabular-nums">0{i + 1}</span>
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MESITA */}
      <section className="border-b-2 border-foreground bg-primary text-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-80">§ 05 — Why Mesita</p>
          <h2 className="mt-4 max-w-4xl font-display text-6xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
            Not loyalty.<br />
            Not POS.<br />
            <span className="italic">Not rewards.</span>
          </h2>

          <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 space-y-4 md:col-span-5">
              {[
                { n: "Cluber", v: "tracks loyalty." },
                { n: "Toast", v: "processes payments." },
                { n: "FiveStars and Thanx", v: "run rewards programs." },
              ].map((r) => (
                <div key={r.n} className="flex items-baseline gap-3 border-b border-background/30 pb-3">
                  <span className="font-display text-xl font-semibold italic">{r.n}</span>
                  <span className="text-sm opacity-80">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="border-2 border-background bg-background/10 p-7 backdrop-blur">
                <Asterisk className="h-6 w-6 text-secondary" />
                <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">
                  Mesita does something none of them do: it treats guests as a{" "}
                  <span className="bg-secondary px-1 italic text-foreground">curated asset class</span> — and turns who walks through your door into a lever you can actually pull.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-bold uppercase tracking-[0.25em] opacity-90">
            <span className="inline-flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Targeted acquisition</span>
            <span className="inline-flex items-center gap-1.5"><Crown className="h-3.5 w-3.5" /> Tier-based rewards</span>
            <span className="inline-flex items-center gap-1.5"><Instagram className="h-3.5 w-3.5" /> Verified social reach</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-px border-x-0 border-foreground bg-foreground">
          <div className="col-span-12 bg-background p-10 md:col-span-6 md:p-14">
            <Tag>For guests</Tag>
            <h3 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight">
              Download <span className="italic text-primary">Mesita.</span>
            </h3>
            <p className="mt-4 max-w-sm text-base leading-relaxed">
              Find the right place tonight, book the table in one tap, and earn cashback every time you walk in.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background hover:bg-primary">
                Download the app <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background">
                <MessageCircle className="h-3.5 w-3.5" /> Open on WhatsApp
              </button>
            </div>
          </div>
          <div className="col-span-12 bg-foreground p-10 text-background md:col-span-6 md:p-14">
            <Tag>For venues</Tag>
            <h3 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight">
              Ten minutes <span className="italic text-secondary">to set up.</span>
            </h3>
            <p className="mt-4 max-w-sm text-base leading-relaxed opacity-90">
              No hardware. No commitment. Pay only when it works.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 bg-secondary px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-background">
              Start at manager.mesita.app <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Footer marquee */}
        <div className="overflow-hidden border-y-2 border-foreground bg-[oklch(0.97_0.008_25)] py-3">
          <Marquee items={["Spendable social capital", "Mesita 🦚", "Cashback Club", "Mexico City", "Tonight"]} />
        </div>

        <div className="bg-foreground text-background">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[10px] font-bold uppercase tracking-[0.25em]">
            <div className="flex items-center gap-2">
              <span>🦚</span>
              <span>Mesita · Vol. 01 · Spendable social capital</span>
            </div>
            <div className="flex items-center gap-5">
              <a className="hover:text-secondary">Privacy</a>
              <a className="hover:text-secondary">Terms</a>
              <a className="inline-flex items-center gap-1 hover:text-secondary">
                <Instagram className="h-3 w-3" /> @mesita
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
