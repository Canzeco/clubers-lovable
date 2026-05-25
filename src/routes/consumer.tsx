import { createFileRoute } from "@tanstack/react-router";
import { ConsumerApp } from "@/components/emulators/ConsumerApp";

export const Route = createFileRoute("/consumer")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Clubers — Consumer" },
      { name: "description", content: "Clubers: AI que cura tu noche. Descubre lugares, experiencias y eventos con beneficios para miembros." },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen w-screen items-center justify-center bg-neutral-950 p-4">
      <div className="relative h-[100dvh] max-h-[900px] w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl">
        <ConsumerApp />
      </div>
    </div>
  ),
});
