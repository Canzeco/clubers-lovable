import { createFileRoute } from "@tanstack/react-router";
import { AdminWeb } from "@/components/emulators/AdminWeb";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Mesita — Admin" },
      { name: "description", content: "Mesita HQ admin: venues, tier curation, revenue, trust & safety." },
    ],
  }),
  component: () => (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <AdminWeb />
    </div>
  ),
});
