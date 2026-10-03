import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import room from "@/assets/room.jpg";
import { PageHero } from "@/components/site/PageHero";
import { RoomCard } from "@/components/site/RoomCard";
import { roomsQuery } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/chambres/")({
  head: () => ({
    meta: [
      { title: "Nos chambres — Motel Ain Mersa, Ifrane" },
      { name: "description", content: "Chambres de l’auberge Ain Mersa à Dayet Aoua, Ifrane : 10 chambres, 20 lits, au cœur du Moyen Atlas." },
      { property: "og:title", content: "Nos chambres — Motel Ain Mersa" },
      { property: "og:description", content: "Des chambres chaleureuses pour un séjour nature dans le Moyen Atlas." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(roomsQuery),
  component: Rooms,
});

function Rooms() {
  const { t } = useI18n();
  const { data } = useSuspenseQuery(roomsQuery);
  return (
    <>
      <PageHero image={room} eyebrow="Motel Ain Mersa" title={t("rooms_title")} sub={t("rooms_sub")} />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {data.length ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{data.map((r) => <RoomCard key={r.id} room={r} />)}</div>
        ) : (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-muted-foreground">{t("rooms_empty")}</p>
            <Link to="/reservation" className="mt-8 inline-block rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-cream">{t("cta_book")}</Link>
          </div>
        )}
      </section>
    </>
  );
}
