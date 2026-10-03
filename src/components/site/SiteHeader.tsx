import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overHero = path === "/";
  const links = [
    { to: "/chambres", label: t("nav_rooms") },
    { to: "/services", label: t("nav_services") },
    { to: "/destination", label: t("nav_destination") },
    { to: "/activites", label: t("nav_activities") },
    { to: "/galerie", label: t("nav_gallery") },
    { to: "/contact", label: t("nav_contact") },
  ] as const;

  return (
    <header
      className={cn(
        "z-40 w-full",
        overHero ? "absolute top-0 text-cream" : "sticky top-0 border-b bg-background/95 backdrop-blur text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-wide">Ain Mersa</span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] opacity-75">Motel · Ifrane</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Navigation principale">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="opacity-85 transition hover:opacity-100" activeProps={{ className: "opacity-100 underline underline-offset-8 decoration-gold" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} setLang={setLang} />
          <Link to="/reservation" className="hidden rounded-sm bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream transition hover:brightness-110 sm:inline-block">
            {t("nav_book")}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 text-foreground lg:hidden">
          {[...links, { to: "/reservation", label: t("nav_book") } as const].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-display text-xl">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs font-semibold" role="group" aria-label="Langue">
      {(["fr", "en", "ar"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={cn("rounded-sm px-1.5 py-1 uppercase transition", lang === l ? "opacity-100 underline decoration-gold underline-offset-4" : "opacity-60 hover:opacity-100")}>
          {l === "ar" ? "ع" : l}
        </button>
      ))}
    </div>
  );
}
