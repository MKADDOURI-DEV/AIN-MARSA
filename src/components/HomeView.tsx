"use client";
import Link from "next/link";
import { Leaf, Wind, HeartHandshake, Compass, Star } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { RoomCard } from "./RoomCard";
import { ServiceIcon } from "./ServiceIcon";
import { useI18n } from "@/lib/i18n";
import { rooms, services, testimonials } from "@/lib/data";
import { SITE } from "@/lib/site";

export function HomeView() {
  const { t } = useI18n();
  const exp = [
    { i: Leaf, h: t("exp_1"), d: t("exp_1d") }, { i: Wind, h: t("exp_2"), d: t("exp_2d") },
    { i: HeartHandshake, h: t("exp_3"), d: t("exp_3d") }, { i: Compass, h: t("exp_4"), d: t("exp_4d") },
  ];
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <img src="/images/hero-atlas.jpg" alt="Montagnes du Moyen Atlas et lac près de Dayet Aoua" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 text-cream lg:px-8">
          <p className="eyebrow text-gold fade-up">{t("hero_eyebrow")}</p>
          <h1 className="fade-up mt-4 max-w-4xl text-5xl leading-[1.02] md:text-7xl lg:text-8xl">{t("hero_title")}</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">{t("hero_sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reservation" className="rounded-sm bg-terracotta px-7 py-3.5 font-semibold text-cream transition hover:brightness-110">{t("cta_book")}</Link>
            <a href="#experience" className="rounded-sm border border-cream/60 px-7 py-3.5 font-semibold transition hover:bg-cream hover:text-forest-deep">{t("cta_discover")}</a>
          </div>
          <div className="mt-12"><SearchBar /></div>
        </div>
      </section>

      <section id="experience" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <img src="/images/forest.jpg" alt="Sentier en forêt de cèdres du Moyen Atlas" loading="lazy" width={1280} height={960} className="aspect-[4/5] w-full rounded-md object-cover shadow-soft md:aspect-[5/4]" />
        </div>
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="eyebrow">{t("exp_eyebrow")}</p>
          <h2 className="mt-4 text-4xl text-forest-deep md:text-5xl">{t("exp_title")}</h2>
          <span className="rule-gold mt-6" />
          <p className="mt-6 text-muted-foreground">{t("exp_text")}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {exp.map(({ i: I, h, d }) => (
              <div key={h}>
                <I className="h-5 w-5 text-terracotta" />
                <h3 className="mt-3 font-sans text-sm font-bold">{h}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-deep text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-cream/15 px-5 py-12 text-center lg:px-8">
          <div><p className="font-display text-5xl">{SITE.capacity.rooms}</p><p className="mt-1 text-xs uppercase tracking-widest opacity-70">{t("facts_rooms")}</p></div>
          <div><p className="font-display text-5xl">{SITE.capacity.beds}</p><p className="mt-1 text-xs uppercase tracking-widest opacity-70">{t("facts_beds")}</p></div>
          <div className="flex flex-col items-center justify-center"><p className="font-display text-2xl text-gold md:text-3xl">{t("facts_class")}</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("nav_rooms")}</p>
            <h2 className="mt-3 text-4xl text-forest-deep md:text-5xl">{t("rooms_title")}</h2>
          </div>
          <Link href="/chambres" className="text-sm font-semibold text-terracotta hover:underline">{t("nav_rooms")} →</Link>
        </div>
        {rooms.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{rooms.slice(0, 3).map((r) => <RoomCard key={r.slug} room={r} />)}</div>
        ) : (
          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <img src="/images/room.jpg" alt="Chambre chaleureuse en bois et pierre" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-md object-cover shadow-soft" />
            <div>
              <p className="text-lg text-muted-foreground">{t("rooms_sub")}</p>
              <p className="mt-4 text-sm text-muted-foreground">{t("rooms_empty")}</p>
              <Link href="/reservation" className="mt-8 inline-block rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-deep">{t("cta_book")}</Link>
            </div>
          </div>
        )}
      </section>

      <section className="bg-sand/60">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <p className="eyebrow">{t("services_title")}</p>
          <h2 className="mt-3 text-4xl text-forest-deep md:text-5xl">{t("services_sub")}</h2>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border md:grid-cols-3 lg:grid-cols-5">
            {services.map((s) => (
              <div key={s.id} className="bg-background p-6">
                <ServiceIcon name={s.icon} className="h-6 w-6 text-forest" />
                <p className="mt-4 text-sm font-semibold">{s.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 lg:px-8">
        <div className="order-2 md:order-1">
          <p className="eyebrow">{t("breakfast_eyebrow")}</p>
          <h2 className="mt-3 text-4xl text-forest-deep md:text-5xl">{t("breakfast_title")}</h2>
          <span className="rule-gold mt-6" />
          <p className="mt-6 text-muted-foreground">{t("breakfast_text")}</p>
        </div>
        <img src="/images/breakfast.jpg" alt="Petit-déjeuner marocain sur une terrasse face aux montagnes" loading="lazy" width={1280} height={960} className="order-1 aspect-[4/3] w-full rounded-md object-cover shadow-soft md:order-2" />
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <h2 className="text-4xl text-forest-deep">{t("reviews_title")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((r) => (
              <figure key={r.id} className="rounded-md bg-card p-7 shadow-soft">
                {r.rating && <div className="flex gap-0.5 text-gold">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>}
                <blockquote className="mt-4 font-display text-xl leading-snug">“{r.text}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">{r.first_name}{r.country && `, ${r.country}`}{r.platform && ` · ${r.platform}`}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden">
        <img src="/images/hero-atlas.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest-deep/80" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center text-cream">
          <h2 className="text-4xl md:text-5xl">{t("dest_title")}</h2>
          <p className="mt-4 opacity-85">{t("dest_sub")}</p>
          <Link href="/destination" className="mt-8 inline-block rounded-sm border border-cream/60 px-7 py-3 font-semibold hover:bg-cream hover:text-forest-deep">{t("cta_discover")}</Link>
        </div>
      </section>
    </>
  );
}
