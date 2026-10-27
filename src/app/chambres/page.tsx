import type { Metadata } from "next";
import { RoomsView } from "@/components/RoomsView";

export const metadata: Metadata = {
  title: "Chambres — Motel Ain Mersa, Ifrane",
  description: "Des chambres chaleureuses pour un séjour nature dans le Moyen Atlas.",
  openGraph: { title: "Chambres — Motel Ain Mersa, Ifrane", description: "Des chambres chaleureuses pour un séjour nature dans le Moyen Atlas." },
};

export default function Page() {
  return <RoomsView />;
}
