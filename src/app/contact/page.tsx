import type { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact — Motel Ain Mersa, Ifrane",
  description: "Contactez le Motel Ain Mersa à Dayet Aoua, province d’Ifrane.",
  openGraph: { title: "Contact — Motel Ain Mersa, Ifrane", description: "Contactez le Motel Ain Mersa à Dayet Aoua, province d’Ifrane." },
};

export default function Page() {
  return <ContactView />;
}
