import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const GuestApp = lazy(() =>
  import("@/components/emulators/GuestApp").then((m) => ({ default: m.GuestApp })),
);

export const Route = createFileRoute("/guest")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mesita — Guest" },
      { name: "description", content: "Mesita guest app: discover venues, claim cashback, redeem with QR." },
    ],
  }),
  component: () => (
    <div className="flex min-h-screen w-screen items-center justify-center bg-neutral-950 p-4">
      <div className="relative h-[100dvh] max-h-[900px] w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl">
        <Suspense fallback={<div className="h-full w-full bg-background" />}>
          <GuestApp />
        </Suspense>
      </div>
    </div>
  ),
});
