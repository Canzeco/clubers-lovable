import { createFileRoute } from "@tanstack/react-router";
import { LandingWeb } from "@/components/emulators/LandingWeb";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Mesita — Landing" },
      { name: "description", content: "Mesita: cashback social spend platform for venues and guests." },
    ],
  }),
  component: () => (
    <div className="h-screen w-screen overflow-hidden">
      <LandingWeb />
    </div>
  ),
});
