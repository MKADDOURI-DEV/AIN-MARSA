import { Link } from "@tanstack/react-router";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl">Motel Ain Mersa</p>
          <p className="mt-3 max-w-xs text-sm opacity-75">{t("footer_tag")}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold">{t("facts_class")}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold" />{SITE.address.join(", ")}</p>
          <a href={`tel:${SITE.phoneIntl}`} className="flex gap-3 hover:underline" dir="ltr"><Phone className="h-4 w-4 text-gold" />{SITE.phoneDisplay}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex gap-3 hover:underline"><MessageCircle className="h-4 w-4 text-gold" />{t("whatsapp")}</a>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm opacity-85">
          <Link to="/chambres">{t("nav_rooms")}</Link>
          <Link to="/services">{t("nav_services")}</Link>
          <Link to="/destination">{t("nav_destination")}</Link>
          <Link to="/activites">{t("nav_activities")}</Link>
          <Link to="/galerie">{t("nav_gallery")}</Link>
          <Link to="/reservation">{t("nav_book")}</Link>
          <Link to="/contact">{t("nav_contact")}</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} Motel Ain Mersa</div>
    </footer>
  );
}
