import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import hero from "@/assets/hero-atlas.jpg";
import room from "@/assets/room.jpg";
import breakfast from "@/assets/breakfast.jpg";
import forest from "@/assets/forest.jpg";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie photos — Motel Ain Mersa, Ifrane" },
      { name: "description", content: "Photos du Motel Ain Mersa et des paysages du Moyen Atlas : chambres, nature, montagne, région." },
      { property: "og:title", content: "Galerie — Motel Ain Mersa" },
      { property: "og:description", content: "Chambres, nature et paysages du Moyen Atlas." },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: hero, cat: "Montagne", alt: "Montagnes et lac au coucher du soleil" },
  { src: room, cat: "Chambres", alt: "Chambre en bois et pierre" },
  { src: breakfast, cat: "Restauration", alt: "Petit-déjeuner en terrasse" },
  { src: forest, cat: "Nature", alt: "Forêt de cèdres" },
];
const cats = ["Chambres", "Montagne", "Nature", "Restauration"];

function Gallery() {
  const { t } = useI18n();
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const list = items.filter((i) => !cat || i.cat === cat);
  useEffect(() => {
    if (open === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o! + 1) % list.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o! - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, list.length]);

  return (
    <>
      <PageHero eyebrow="Motel Ain Mersa" title={t("gallery_title")} />
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {[null, ...cats].map((c) => (
            <button key={c ?? "all"} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm ${cat === c ? "border-forest bg-forest text-cream" : "hover:bg-muted"}`}>{c ?? t("all")}</button>
          ))}
        </div>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {list.map((i, idx) => (
            <button key={i.src} onClick={() => setOpen(idx)} className="mb-4 block w-full overflow-hidden rounded-md">
              <img src={i.src} alt={i.alt} loading="lazy" className="w-full transition duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </section>
      {open !== null && list[open] && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-deep/95 p-4" onClick={() => setOpen(null)}>
          <button className="absolute end-5 top-5 text-cream" aria-label="Fermer"><X /></button>
          <button className="absolute start-4 text-cream" aria-label="Précédent" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length); }}><ChevronLeft className="h-8 w-8" /></button>
          <img src={list[open].src} alt={list[open].alt} className="max-h-[88vh] max-w-full rounded-sm object-contain" onClick={(e) => e.stopPropagation()} />
          <button className="absolute end-4 text-cream" aria-label="Suivant" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % list.length); }}><ChevronRight className="h-8 w-8" /></button>
        </div>
      )}
    </>
  );
}
