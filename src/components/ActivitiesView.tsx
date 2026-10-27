"use client";
import { PageHero } from "./PageHero";
import { useI18n } from "@/lib/i18n";
import { activities } from "@/lib/data";
import { whatsappUrl } from "@/lib/site";

export function ActivitiesView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero image="/images/forest.jpg" eyebrow={t("nav_destination")} title={t("act_title")} sub={t("act_sub")} />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {activities.length === 0 ? (
          <p className="mx-auto max-w-xl text-center text-muted-foreground">{t("act_empty")}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <article key={a.id} className="overflow-hidden rounded-md bg-card shadow-soft">
                <img src={a.image || "/images/forest.jpg"} alt={a.title} loading="lazy" className="aspect-[3/2] w-full object-cover" />
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
