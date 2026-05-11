import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame, LaptopFrame } from "@/components/DeviceFrame";
import { GuestApp } from "@/components/emulators/GuestApp";
import { ValidatorChat } from "@/components/emulators/ValidatorChat";
import { ManagerWeb } from "@/components/emulators/ManagerWeb";
import { AdminWeb } from "@/components/emulators/AdminWeb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mesita 🦚 — Emulator" },
      {
        name: "description",
        content:
          "Live emulator of the Mesita platform: guest mobile app, WhatsApp validator, and manager web portal.",
      },
    ],
  }),
  component: Index,
});

type Product = "admin" | "manager" | "validator" | "guest";

const products: { id: Product; label: string; tag: string; desc: string }[] = [
  {
    id: "admin",
    label: "Admin Web",
    tag: "Mesita HQ",
    desc: "Operate the network: venues, tier curation, revenue, trust & safety.",
  },
  {
    id: "manager",
    label: "Manager Web",
    tag: "Venue portal",
    desc: "Launch cashback campaigns, segment guests, see revenue lift.",
  },
  {
    id: "validator",
    label: "Validator WhatsApp",
    tag: "Staff · WhatsApp",
    desc: "Waiters validate QR coupons in a familiar chat — no new tools.",
  },
  {
    id: "guest",
    label: "Guest Mobile",
    tag: "iOS · Android",
    desc: "Swipe-to-discover venues, claim cashback, redeem with QR.",
  },
];

function Index() {
  const [active, setActive] = useState<Product>("admin");
  const current = products.find((p) => p.id === active)!;

  return (
    <div className="min-h-screen bg-hero">
      {/* Top navbar with product switcher */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-peacock text-lg shadow-glow">
              🦚
            </div>
            <div>
              <p className="font-display text-base font-semibold leading-none">
                Mesita
              </p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Emulator
              </p>
            </div>
          </div>

          <nav className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active === p.id
                      ? "bg-peacock text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-[10px] opacity-60">{i + 1}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-tier-gold px-3 py-1 text-[11px] font-bold text-black md:inline">
              Gold preview
            </span>
          </div>
        </div>
      </header>

      {/* Hero / context */}
      <section className="mx-auto max-w-5xl px-6 pt-12 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          🦚 Smart wallet of cashback for restaurants, bars & nightlife
        </p>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
          {current.label}
          <span className="ml-3 align-middle text-base font-medium uppercase tracking-[0.3em] text-muted-foreground">
            · {current.tag}
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          {current.desc}
        </p>
      </section>

      {/* Emulator stage */}
      <section className="mx-auto mt-10 max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-border bg-card/30 p-6 backdrop-blur-sm md:p-12">
          {active === "admin" && (
            <LaptopFrame label="Admin Web · Mesita HQ">
              <AdminWeb />
            </LaptopFrame>
          )}
          {active === "manager" && (
            <LaptopFrame label="Manager Web · Venue Portal">
              <ManagerWeb />
            </LaptopFrame>
          )}
          {active === "validator" && (
            <PhoneFrame label="Validator · WhatsApp">
              <ValidatorChat />
            </PhoneFrame>
          )}
          {active === "guest" && (
            <PhoneFrame label="Guest Mobile App">
              <GuestApp />
            </PhoneFrame>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 text-center text-xs text-muted-foreground md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card/40 p-4">
            <p className="mb-1 text-secondary">🥉 Bronze · 🥈 Silver · 🥇 Gold</p>
            Tiers reward presence, influence and social amplification — not just spend.
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-4">
            <p className="mb-1 text-secondary">Story → cashback</p>
            Verified Instagram stories unlock extra rewards automatically.
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-4">
            <p className="mb-1 text-secondary">AI voice reservations</p>
            Mesita calls the venue and books the table in natural conversation.
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        🦚 Mesita · platform emulator · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
