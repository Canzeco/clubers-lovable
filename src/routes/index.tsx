import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame, LaptopFrame } from "@/components/DeviceFrame";
import { GuestApp } from "@/components/emulators/GuestApp";
import { ValidatorChat } from "@/components/emulators/ValidatorChat";
import { ManagerWeb } from "@/components/emulators/ManagerWeb";
import { AdminWeb } from "@/components/emulators/AdminWeb";
import { LandingWeb } from "@/components/emulators/LandingWeb";

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

type Product = "landing" | "admin" | "manager" | "validator" | "guest";

const products: { id: Product; label: string; tag: string; desc: string }[] = [
  {
    id: "landing",
    label: "🌐 Landing Web",
    tag: "mesita.app",
    desc: "Public marketing site — pitch to guests and venues, drive app installs.",
  },
  {
    id: "admin",
    label: "🛠️ Admin Web",
    tag: "Mesita HQ",
    desc: "Operate the network: venues, tier curation, revenue, trust & safety.",
  },
  {
    id: "manager",
    label: "🧭 Manager Web",
    tag: "Venue portal",
    desc: "Launch cashback campaigns, segment guests, see revenue lift.",
  },
  {
    id: "validator",
    label: "💬 Validator Whats",
    tag: "Staff · WhatsApp",
    desc: "Waiters validate QR coupons in a familiar chat — no new tools.",
  },
  {
    id: "guest",
    label: "📱 Guest Mobile",
    tag: "iOS · Android",
    desc: "Swipe-to-discover venues, claim cashback, redeem with QR.",
  },
];

function Index() {
  const [active, setActive] = useState<Product>("landing");

  return (
    <div className="flex min-h-screen flex-col bg-hero">
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
            <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1.5 shadow-elev backdrop-blur">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    active === p.id
                      ? "bg-foreground text-background shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
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

      {/* Emulator stage — fills remaining viewport */}
      <main className="flex flex-1 items-center justify-center px-6 py-6">
        {active === "landing" && (
          <LaptopFrame>
            <LandingWeb />
          </LaptopFrame>
        )}
        {active === "admin" && (
          <LaptopFrame>
            <AdminWeb />
          </LaptopFrame>
        )}
        {active === "manager" && (
          <LaptopFrame>
            <ManagerWeb />
          </LaptopFrame>
        )}
        {active === "validator" && (
          <PhoneFrame>
            <ValidatorChat />
          </PhoneFrame>
        )}
        {active === "guest" && (
          <PhoneFrame>
            <GuestApp />
          </PhoneFrame>
        )}
      </main>
    </div>
  );
}
