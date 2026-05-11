import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame, LaptopFrame } from "@/components/DeviceFrame";
import { GuestApp } from "@/components/emulators/GuestApp";
import { ValidatorChat } from "@/components/emulators/ValidatorChat";
import { ManagerWeb } from "@/components/emulators/ManagerWeb";

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

type Product = "guest" | "validator" | "manager";

const products: { id: Product; label: string; tag: string; desc: string }[] = [
  {
    id: "guest",
    label: "Guest App",
    tag: "iOS · Android",
    desc: "Swipe-to-discover venues, claim cashback, redeem with QR.",
  },
  {
    id: "validator",
    label: "Validator WhatsApp",
    tag: "Staff · WhatsApp",
    desc: "Waiters validate QR coupons in a familiar chat — no new tools.",
  },
  {
    id: "manager",
    label: "Manager Web",
    tag: "Venue portal",
    desc: "Launch cashback campaigns, segment guests, see real revenue lift.",
  },
];

function Index() {
  const [active, setActive] = useState<Product>("guest");

  return (
    <div className="min-h-screen bg-hero">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-peacock text-2xl shadow-glow">
            🦚
          </div>
          <div>
            <p className="font-display text-xl font-semibold leading-none">
              Mesita
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Platform Emulator
            </p>
          </div>
        </div>
        <div className="hidden gap-2 md:flex">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            v0.1 · demo
          </span>
          <span className="rounded-full bg-tier-gold px-3 py-1 text-xs font-bold text-black">
            Gold tier preview
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-6 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          🦚 Smart wallet of cashback for restaurants, bars & nightlife
        </p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
          The atmosphere is the product.
          <br />
          <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Mesita rewards the guests who create it.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
          Three products, one platform. Switch between them and play with the
          live mock — exactly how guests, staff and venue managers will
          experience Mesita.
        </p>
      </section>

      {/* Product switcher */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-3 md:grid-cols-3">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                active === p.id
                  ? "border-primary/60 bg-card shadow-glow"
                  : "border-border bg-card/40 hover:border-border hover:bg-card/70"
              }`}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {p.tag}
              </p>
              <p className="mt-1 font-display text-xl font-semibold">{p.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <span
                className={`absolute right-4 top-4 h-2 w-2 rounded-full transition ${
                  active === p.id ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Emulator stage */}
      <section className="mx-auto mt-14 max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-border bg-card/30 p-8 backdrop-blur-sm md:p-14">
          {active === "guest" && (
            <PhoneFrame label="Guest Mobile App">
              <GuestApp />
            </PhoneFrame>
          )}
          {active === "validator" && (
            <PhoneFrame label="Validator · WhatsApp">
              <ValidatorChat />
            </PhoneFrame>
          )}
          {active === "manager" && (
            <LaptopFrame label="Manager Web Portal">
              <ManagerWeb />
            </LaptopFrame>
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
