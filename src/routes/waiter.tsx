import { createFileRoute } from "@tanstack/react-router";
import { ValidatorChat } from "@/components/emulators/ValidatorChat";

export const Route = createFileRoute("/waiter")({
  head: () => ({
    meta: [
      { title: "Mesita — Waiter" },
      { name: "description", content: "Waiter validator: validate QR coupons via WhatsApp-style chat." },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen w-screen items-center justify-center bg-neutral-950 p-4">
      <div className="h-[100dvh] max-h-[900px] w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl">
        <ValidatorChat />
      </div>
    </div>
  ),
});
