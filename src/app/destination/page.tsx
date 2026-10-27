import type { Metadata } from "next";
import { DestinationView } from "@/components/DestinationView";

export const metadata: Metadata = {
  title: "Découvrir le Moyen Atlas — Ifrane & Dayet Aoua | Motel Ain Mersa",
  description: "Ifrane, Dayet Aoua, forêts de cèdres, sources et randonnées : la région du Moyen Atlas autour de l’auberge Ain Mersa.",
  openGraph: { title: "Découvrir le Moyen Atlas — Ifrane & Dayet Aoua | Motel Ain Mersa", description: "Ifrane, Dayet Aoua, forêts de cèdres, sources et randonnées : la région du Moyen Atlas autour de l’auberge Ain Mersa." },
};

export default function Page() {
  return <DestinationView />;
}
