import { createFileRoute } from "@tanstack/react-router";
import { ManagerWeb } from "@/components/emulators/ManagerWeb";

export const Route = createFileRoute("/manager")({
  head: () => ({
    meta: [
      { title: "Mesita — Manager" },
      { name: "description", content: "Venue manager portal: cashback campaigns, segmentation, revenue lift." },
    ],
  }),
  component: () => (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <ManagerWeb />
    </div>
  ),
});
