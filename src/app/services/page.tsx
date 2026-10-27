import type { Metadata } from "next";
import { ServicesView } from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Services — Motel Ain Mersa, Ifrane",
  description: "Wi-Fi gratuit, parking privé, chambres familiales, jardin, terrasse et petit-déjeuner au Motel Ain Mersa.",
  openGraph: { title: "Services — Motel Ain Mersa, Ifrane", description: "Wi-Fi gratuit, parking privé, chambres familiales, jardin, terrasse et petit-déjeuner au Motel Ain Mersa." },
};

export default function Page() {
  return <ServicesView />;
}
