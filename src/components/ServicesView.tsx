"use client";
import { PageHero } from "./PageHero";
import { ServiceIcon } from "./ServiceIcon";
import { useI18n } from "@/lib/i18n";
import { services } from "@/lib/data";

export function ServicesView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="Motel Ain Mersa" title={t("services_title")} sub={t("services_sub")} />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {services.map((s) => (
          <div key={s.id} className="rounded-md border bg-card p-7">
            <ServiceIcon name={s.icon} className="h-7 w-7 text-terracotta" />
            <h2 className="mt-5 text-2xl text-forest-deep">{s.title}</h2>
            {s.description && <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>}
          </div>
        ))}
      </section>
      <section className="bg-sand/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-8">
          <img src="/images/breakfast.jpg" alt="Petit-déjeuner sur la terrasse" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover shadow-soft" />
          <div>
            <p className="eyebrow">{t("breakfast_eyebrow")}</p>
            <h2 className="mt-3 text-4xl text-forest-deep">{t("breakfast_title")}</h2>
            <p className="mt-6 text-muted-foreground">{t("breakfast_text")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
