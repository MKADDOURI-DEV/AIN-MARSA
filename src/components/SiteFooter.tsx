"use client";
import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <img src="/logo.png" alt="Auberge Ain Mersa" className="h-24 w-auto rounded-md bg-cream p-2" />
          <p className="mt-3 max-w-xs text-sm opacity-75">{t("footer_tag")}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold">{t("facts_class")}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold" />{SITE.address.join(", ")}</p>
          <a href={`tel:${SITE.phoneIntl}`} className="flex gap-3 hover:underline" dir="ltr"><Phone className="h-4 w-4 text-gold" />{SITE.phoneDisplay}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex gap-3 hover:underline"><MessageCircle className="h-4 w-4 text-gold" />{t("whatsapp")}</a>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm opacity-85">
          <Link href="/chambres">{t("nav_rooms")}</Link>
          <Link href="/services">{t("nav_services")}</Link>
          <Link href="/destination">{t("nav_destination")}</Link>
          <Link href="/activites">{t("nav_activities")}</Link>
          <Link href="/galerie">{t("nav_gallery")}</Link>
          <Link href="/reservation">{t("nav_book")}</Link>
          <Link href="/contact">{t("nav_contact")}</Link>
        </nav>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} Motel Ain Mersa</div>
    </footer>
  );
}
