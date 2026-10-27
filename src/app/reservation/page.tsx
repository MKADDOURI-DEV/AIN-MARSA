import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingView } from "@/components/BookingView";

export const metadata: Metadata = {
  title: "Réservation — Motel Ain Mersa, Ifrane",
  description: "Envoyez votre demande de séjour au Motel Ain Mersa, auberge à Dayet Aoua dans le Moyen Atlas.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookingView />
    </Suspense>
  );
}
