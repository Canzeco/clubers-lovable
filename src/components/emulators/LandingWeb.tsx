import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  QrCode,
  Wallet,
  TrendingUp,
  MessageCircle,
  Star,
  Check,
  Instagram,
  Crown,
} from "lucide-react";

type Audience = "guests" | "venues";

export function LandingWeb() {
  const [aud, setAud] = useState<Audience>("venues");

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
            <a className="hover:text-foreground">How it works</a>
            <a className="hover:text-foreground">Tiers</a>
            <a className="hover:text-foreground">For venues</a>
            <a className="hover:text-foreground">Press</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground md:inline-flex">
              Sign in
            </button>
            <button className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-glow hover:opacity-90">
              Get the app
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-secondary" /> Curated nightlife
              · Buenos Aires
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Spend like
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                someone watches.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Mesita is the cashback club for the rooftops, omakases and
              cocktail rooms worth bragging about. Swipe a venue, book a
              table, get up to 30% back when you flash the QR.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-glow hover:opacity-90">
                Download Mesita
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur hover:bg-card">
                I run a venue
              </button>
            </div>
            <div className="mt-7 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-1.5">
                {["bg-tier-gold", "bg-tier-silver", "bg-tier-bronze", "bg-tier-diamond"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className={`h-6 w-6 rounded-full ${c} ring-2 ring-background`}
                    />
                  ),
                )}
              </div>
              <span>
                <span className="font-semibold text-foreground">12,400+</span>{" "}
                tastemakers · 184 venues
              </span>
            </div>
          </div>

          {/* Hero card mock */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-peacock opacity-30 blur-2xl" />
            <div className="relative rounded-3xl border border-border bg-card-soft p-5 shadow-elev backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tier-gold text-xs font-bold text-black">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Gold tier</p>
                    <p className="text-[10px] text-muted-foreground">
                      30% cashback unlocked
                    </p>
                  </div>
                </div>
                <Crown className="h-4 w-4 text-gold" />
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl bg-peacock p-4 text-white">
                <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">
                  Tonight · Palermo
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
                    <p className="text-[10px] opacity-70">You'll get back</p>
                    <p className="font-display text-3xl font-semibold">
                      $14,400
                    </p>
                  </div>
                  <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black">
                    Reserve
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Swipe to discover</span>
                <span>← →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo strip */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 py-5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>As reviewed in</span>
          {["La Nación", "Time Out", "Infobae", "Condé Nast", "Eater"].map(
            (n) => (
              <span key={n} className="font-display text-sm tracking-normal text-foreground/70">
                {n}
              </span>
            ),
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              How it works
            </p>
            <h2 className="mt-2 max-w-xl font-display text-4xl font-semibold tracking-tight">
              Three taps from craving to cashback.
            </h2>
          </div>
          <div className="hidden rounded-full border border-border bg-card p-1 text-xs md:flex">
            {(["guests", "venues"] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAud(a)}
                className={`rounded-full px-4 py-1.5 font-medium capitalize transition ${
                  aud === a
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                }`}
              >
                For {a}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(aud === "guests"
            ? [
                {
                  icon: Sparkles,
                  title: "Swipe a venue",
                  body: "Curated catalog. Tinder-style. No sponsored slop, no bots, no influencer fees.",
                },
                {
                  icon: MessageCircle,
                  title: "Reserve via WhatsApp",
                  body: "Our AI agent calls the venue, locks the table, drops the cashback coupon in your wallet.",
                },
                {
                  icon: QrCode,
                  title: "Flash QR, get cash",
                  body: "Waiter scans on WhatsApp. Cashback hits your wallet within 24h. Withdraw anytime.",
                },
              ]
            : [
                {
                  icon: TrendingUp,
                  title: "Launch a campaign",
                  body: "Pick the night, set the cashback %, target the tier. Live in 90 seconds.",
                },
                {
                  icon: QrCode,
                  title: "Validate in WhatsApp",
                  body: "Your waiters validate QRs in the same app they already use. No POS install.",
                },
                {
                  icon: Wallet,
                  title: "Get the lift",
                  body: "See ticket size, repeat rate and revenue lift in one dashboard. Pay only on attribution.",
                },
              ]
          ).map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border bg-card-soft p-6 shadow-elev"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-peacock text-white shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Step 0{i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-card/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
              The class ladder
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Tier is mostly automatic. Instagram does the talking.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We read public signal — followers, reach, where you eat — and
              place you on a tier. Models, chefs, athletes, press, founders
              can appeal manually.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { n: "Bronze", c: "bg-tier-bronze", cb: "5%", who: "Anyone" },
              { n: "Silver", c: "bg-tier-silver", cb: "12%", who: "1k+ reach" },
              { n: "Gold", c: "bg-tier-gold", cb: "20%", who: "Curated" },
              { n: "Diamond", c: "bg-tier-diamond", cb: "30%", who: "Invite only" },
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
                  <p className="mt-4 font-display text-3xl font-semibold">
                    {t.cb}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    cashback ceiling
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-peacock p-10 text-white shadow-glow md:p-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] opacity-80">
                For venues
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Fill quiet nights with the right faces.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed opacity-85">
                Mesita pushes your campaign to a curated audience that posts,
                tags and comes back. You pay only when they walk in.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90">
                Open the manager portal
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "+38%", v: "Ticket size, gold guests" },
                { k: "4.7×", v: "Repeat rate vs walk-ins" },
                { k: "92s", v: "From signup to live campaign" },
                { k: "0%", v: "Setup, monthly or POS fees" },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                >
                  <p className="font-display text-3xl font-semibold">{m.k}</p>
                  <p className="mt-1 text-[11px] opacity-80">{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              q: "Replaced our influencer budget overnight. The room looks expensive again.",
              n: "Tomás Vidal",
              r: "Owner · Casa Luminar",
            },
            {
              q: "I get 20% back on every dinner I'd post anyway. Felt rude not to use it.",
              n: "Lola P.",
              r: "Gold tier · 18k followers",
            },
            {
              q: "Validating coupons in WhatsApp means staff actually do it. Adoption was instant.",
              n: "Mariana K.",
              r: "Manager · Neón Bar",
            },
          ].map((t, i) => (
            <figure
              key={i}
              className="rounded-3xl border border-border bg-card-soft p-6 shadow-elev"
            >
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 font-display text-lg leading-snug">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-xs">
                <div className="h-8 w-8 rounded-full bg-peacock" />
                <div>
                  <p className="font-semibold">{t.n}</p>
                  <p className="text-muted-foreground">{t.r}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA + footer */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Check className="h-3 w-3 text-secondary" /> Free for guests · forever
          </span>
          <h2 className="max-w-2xl font-display text-5xl font-semibold tracking-tight">
            Your next dinner pays you back.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-glow">
              App Store
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold">
              Google Play
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>🦚</span>
              <span>Mesita · Buenos Aires</span>
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