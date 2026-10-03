import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-atlas.jpg";
import forest from "@/assets/forest.jpg";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";
import { mapsEmbed } from "@/lib/site";

export const Route = createFileRoute("/destination")({
  head: () => ({
    meta: [
      { title: "Découvrir le Moyen Atlas — Ifrane & Dayet Aoua | Motel Ain Mersa" },
      { name: "description", content: "Ifrane, Dayet Aoua, forêts de cèdres, sources et randonnées : la région du Moyen Atlas autour de l’auberge Ain Mersa." },
      { property: "og:title", content: "Découvrir le Moyen Atlas — Motel Ain Mersa" },
      { property: "og:description", content: "Forêts de cèdres, lacs et sentiers autour d’Ifrane et Dayet Aoua." },
    ],
  }),
  component: Destination,
});

const places = [
  { n: "Ifrane", d: "Ville de montagne du Moyen Atlas, réputée pour son architecture et ses hivers enneigés.", img: hero },
  { n: "Dayet Aoua", d: "Lac de montagne entouré de forêts, lieu de balades et d’observation de la nature.", img: hero },
  { n: "Forêts du Moyen Atlas", d: "Cèdres, chênes verts et sous-bois : des forêts parmi les plus belles du Maroc.", img: forest },
  { n: "Montagnes", d: "Reliefs doux, plateaux et panoramas, au fil des saisons.", img: hero },
  { n: "Sources", d: "La région est riche en sources et points d’eau naturels.", img: forest },
  { n: "Randonnées & balades", d: "Sentiers forestiers et chemins autour des lacs, pour tous les niveaux.", img: forest },
];

function Destination() {
  const { t } = useI18n();
  return (
    <>
      <PageHero image={hero} eyebrow={t("hero_eyebrow")} title={t("dest_title")} sub={t("dest_sub")} />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {places.map((p) => (
          <article key={p.n} className="overflow-hidden rounded-md bg-card shadow-soft">
            <img src={p.img} alt={p.n} loading="lazy" className="aspect-[3/2] w-full object-cover" />
            <div className="p-6">
              <h2 className="text-2xl text-forest-deep">{p.n}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <h2 className="text-4xl text-forest-deep">{t("nearby")}</h2>
        <span className="rule-gold mt-4" />
        <iframe title="Carte" src={mapsEmbed} loading="lazy" className="mt-8 h-[420px] w-full rounded-md border" />
      </section>
    </>
  );
}
