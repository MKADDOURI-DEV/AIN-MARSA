"use client";
import Link from "next/link";
import { Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Room } from "@/lib/data";

export function RoomCard({ room }: { room: Room }) {
  const { t } = useI18n();
  return (
    <article className="group overflow-hidden rounded-md bg-card shadow-soft">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={room.images[0] || "/images/room.jpg"} alt={room.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl text-forest-deep">{room.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" />{room.capacity} {t("guests")}{room.bed_type && ` · ${room.bed_type}`}</p>
        <div className="mt-5 flex items-center justify-between">
          {room.price_mad ? <p className="font-display text-xl">{room.price_mad} MAD <span className="text-sm text-muted-foreground">{t("per_night")}</span></p> : <span />}
          <Link href={`/chambres/${room.slug}`} className="text-sm font-semibold text-terracotta underline-offset-4 hover:underline">{t("details")} →</Link>
        </div>
      </div>
    </article>
  );
}
