import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Users, BedDouble, Maximize, Mountain } from "lucide-react";
import { useState } from "react";
import roomFallback from "@/assets/room.jpg";
import { roomQuery } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/chambres/$slug")({
  loader: async ({ context, params }) => {
    const room = await context.queryClient.ensureQueryData(roomQuery(params.slug));
    if (!room) throw notFound();
    return room;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Chambre"} — Motel Ain Mersa` },
      { name: "description", content: loaderData?.description?.slice(0, 155) ?? "Chambre au Motel Ain Mersa, Ifrane." },
      { property: "og:title", content: `${loaderData?.name ?? "Chambre"} — Motel Ain Mersa` },
      { property: "og:description", content: loaderData?.description?.slice(0, 155) ?? "Chambre au Motel Ain Mersa." },
    ],
  }),
  component: RoomPage,
});

function RoomPage() {
  const { slug } = Route.useParams();
  const { t } = useI18n();
  const { data: room } = useSuspenseQuery(roomQuery(slug));
  const [idx, setIdx] = useState(0);
  if (!room) return null;
  const imgs = room.images.length ? room.images : [roomFallback];
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <Link to="/chambres" className="text-sm text-muted-foreground hover:underline">← {t("rooms_title")}</Link>
      <div className="mt-6 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <img src={imgs[idx]} alt={room.name} className="aspect-[4/3] w-full rounded-md object-cover shadow-soft" />
          {imgs.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {imgs.map((src, i) => (
                <button key={src} onClick={() => setIdx(i)} aria-label={`Photo ${i + 1}`} className={i === idx ? "ring-2 ring-terracotta" : "opacity-70"}>
                  <img src={src} alt="" loading="lazy" className="h-20 w-28 rounded-sm object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          <h1 className="text-5xl text-forest-deep">{room.name}</h1>
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Users className="h-4 w-4" />{room.capacity} {t("guests")}</span>
            {room.bed_type && <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{room.bed_type}</span>}
            {room.surface_m2 && <span className="flex items-center gap-2"><Maximize className="h-4 w-4" />{room.surface_m2} m²</span>}
            {room.view && <span className="flex items-center gap-2"><Mountain className="h-4 w-4" />{room.view}</span>}
          </div>
          {room.description && <p className="mt-6 whitespace-pre-line text-muted-foreground">{room.description}</p>}
          {room.amenities.length > 0 && (
            <>
              <h2 className="mt-8 text-2xl">{t("amenities")}</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {room.amenities.map((a) => <li key={a} className="flex items-center gap-2"><Check className="h-4 w-4 text-forest" />{a}</li>)}
              </ul>
            </>
          )}
          <div className="mt-10 rounded-md bg-sand/60 p-6">
            {room.price_mad && <p className="font-display text-3xl">{room.price_mad} MAD <span className="text-base text-muted-foreground">{t("per_night")}</span></p>}
            <Link to="/reservation" search={{ room: room.id }} className="mt-4 block rounded-sm bg-terracotta py-3 text-center font-semibold text-cream hover:brightness-110">{t("book")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
