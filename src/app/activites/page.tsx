import type { Metadata } from "next";
import { ActivitiesView } from "@/components/ActivitiesView";

export const metadata: Metadata = {
  title: "Activités — Motel Ain Mersa, Ifrane",
  description: "Activités nature dans le Moyen Atlas.",
  openGraph: { title: "Activités — Motel Ain Mersa, Ifrane", description: "Activités nature dans le Moyen Atlas." },
};

export default function Page() {
  return <ActivitiesView />;
}
