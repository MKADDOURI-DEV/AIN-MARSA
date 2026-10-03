import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import forest from "@/assets/forest.jpg";
import { PageHero } from "@/components/site/PageHero";
import { activitiesQuery } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";

export const Route = createFileRoute("/activites")({
  head: () => ({
    meta: [
      { title: "Activités nature — Motel Ain Mersa, Moyen Atlas" },
      { name: "description", content: "Randonnées, balades et découvertes autour d’Ifrane et Dayet Aoua depuis le Motel Ain Mersa." },
      { property: "og:title", content: "Activités — Motel Ain Mersa" },
      { property: "og:description", content: "Activités nature dans le Moyen Atlas." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activitiesQuery),
  component: Activities,
});

function Activities() {
  const { t } = useI18n();
  const { data } = useSuspenseQuery(activitiesQuery);
  return (
    <>
      <PageHero image={forest} eyebrow={t("nav_destination")} title={t("act_title")} sub={t("act_sub")} />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {data.length === 0 ? (
          <p className="mx-auto max-w-xl text-center text-muted-foreground">{t("act_empty")}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((a) => (
              <article key={a.id} className="overflow-hidden rounded-md bg-card shadow-soft">
                <img src={a.image || forest} alt={a.title} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                <div className="p-6">
                  {a.category && <p className="eyebrow">{a.category}</p>}
                  <h2 className="mt-2 text-2xl text-forest-deep">{a.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{[a.duration, a.level, a.location, a.price_mad && `${a.price_mad} MAD`].filter(Boolean).join(" · ")}</p>
                  <a href={whatsappUrl(`Bonjour, je souhaite des informations sur l’activité : ${a.title}`)} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-terracotta hover:underline">{t("info_request")} →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
