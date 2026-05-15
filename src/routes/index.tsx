import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mesita 🦚 — Platform" },
      { name: "description", content: "Mesita platform: landing, admin, manager, waiter, and guest apps." },
    ],
  }),
  component: Index,
});

const products = [
  { to: "/landing", label: "Landing", tag: "Marketing site", desc: "Public website explaining Mesita to venues and guests." },
  { to: "/admin", label: "Admin", tag: "Mesita HQ", desc: "Operate the network: venues, tier curation, revenue, trust & safety." },
  { to: "/manager", label: "Manager", tag: "Venue portal", desc: "Launch cashback campaigns, segment guests, see revenue lift." },
  { to: "/waiter", label: "Waiter", tag: "Staff · WhatsApp", desc: "Waiters validate QR coupons in a familiar chat — no new tools." },
  { to: "/guest", label: "Guest", tag: "Mobile web", desc: "Swipe-to-discover venues, claim cashback, redeem with QR." },
] as const;

function Index() {
  return (
    <div className="min-h-screen bg-hero">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-peacock text-lg shadow-glow">🦚</div>
            <div>
              <p className="font-display text-base font-semibold leading-none">Mesita</p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Platform</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-tier-gold px-3 py-1 text-[11px] font-bold text-black md:inline">
            Gold preview
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 max-w-2xl">
          <h1 className="font-display text-5xl font-semibold leading-tight">The Mesita platform</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Five surfaces, one social cashback engine. Pick a product to open it.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group rounded-2xl border border-border bg-card/60 p-6 shadow-elev backdrop-blur transition hover:border-foreground/30 hover:shadow-glow"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.tag}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{p.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-4 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                Open {p.to} →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
