"use client";
import Link from "next/link";
import { Users, BedDouble, Maximize, Mountain } from "lucide-react";
import { PageHero } from "./PageHero";
import { useI18n } from "@/lib/i18n";
import type { Room } from "@/lib/data";

export function RoomDetailView({ room }: { room: Room }) {
  const { t } = useI18n();
  return (
    <>
      <PageHero image={room.images[0] || "/images/room.jpg"} eyebrow="Motel Ain Mersa" title={room.name} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          {room.description && <p className="text-lg text-muted-foreground">{room.description}</p>}
          <ul className="mt-8 flex flex-wrap gap-6 text-sm">
            <li className="flex items-center gap-2"><Users className="h-4 w-4 text-terracotta" />{room.capacity} {t("guests")}</li>
            {room.bed_type && <li className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-terracotta" />{room.bed_type}</li>}
            {room.surface_m2 && <li className="flex items-center gap-2"><Maximize className="h-4 w-4 text-terracotta" />{room.surface_m2} m²</li>}
            {room.view && <li className="flex items-center gap-2"><Mountain className="h-4 w-4 text-terracotta" />{room.view}</li>}
          </ul>
          {room.amenities.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl text-forest-deep">{t("amenities")}</h2>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{room.amenities.map((a) => <li key={a}>· {a}</li>)}</ul>
            </div>
          )}
        </div>
        <aside className="h-fit rounded-md bg-forest-deep p-7 text-cream">
          {room.price_mad && <p className="font-display text-3xl">{room.price_mad} MAD <span className="text-sm opacity-70">{t("per_night")}</span></p>}
          <Link href="/reservation" className="mt-6 block rounded-sm bg-terracotta py-3.5 text-center font-semibold transition hover:brightness-110">{t("book")}</Link>
        </aside>
      </section>
    </>
  );
}
