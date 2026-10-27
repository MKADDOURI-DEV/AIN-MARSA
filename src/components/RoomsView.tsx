"use client";
import Link from "next/link";
import { PageHero } from "./PageHero";
import { RoomCard } from "./RoomCard";
import { useI18n } from "@/lib/i18n";
import { rooms } from "@/lib/data";

export function RoomsView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero image="/images/room.jpg" eyebrow="Motel Ain Mersa" title={t("rooms_title")} sub={t("rooms_sub")} />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {rooms.length ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{rooms.map((r) => <RoomCard key={r.slug} room={r} />)}</div>
        ) : (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-muted-foreground">{t("rooms_empty")}</p>
            <Link href="/reservation" className="mt-8 inline-block rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-cream">{t("cta_book")}</Link>
          </div>
        )}
      </section>
    </>
  );
}
