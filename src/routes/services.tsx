import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import breakfast from "@/assets/breakfast.jpg";
import { PageHero } from "@/components/site/PageHero";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { servicesQuery } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Motel Ain Mersa, Ifrane" },
      { name: "description", content: "Wi-Fi gratuit, parking privé, chambres familiales, jardin, terrasse et petit-déjeuner au Motel Ain Mersa." },
      { property: "og:title", content: "Services — Motel Ain Mersa" },
      { property: "og:description", content: "Les services de l’auberge Ain Mersa à Dayet Aoua." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  component: Services,
});

function Services() {
  const { t } = useI18n();
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <>
      <PageHero eyebrow="Motel Ain Mersa" title={t("services_title")} sub={t("services_sub")} />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {data.map((s) => (
          <div key={s.id} className="rounded-md border bg-card p-7">
            <ServiceIcon name={s.icon} className="h-7 w-7 text-terracotta" />
            <h2 className="mt-5 text-2xl text-forest-deep">{s.title}</h2>
            {s.description && <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>}
          </div>
        ))}
      </section>
      <section className="bg-sand/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-8">
          <img src={breakfast} alt="Petit-déjeuner sur la terrasse" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover shadow-soft" />
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
