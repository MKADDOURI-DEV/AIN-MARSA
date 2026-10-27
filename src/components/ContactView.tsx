"use client";
import { useState } from "react";
import { Phone, MapPin, MessageCircle, Navigation } from "lucide-react";
import { PageHero } from "./PageHero";
import { useI18n } from "@/lib/i18n";
import { SITE, whatsappUrl, mapsDirections } from "@/lib/site";

export function ContactView() {
  const { t } = useI18n();
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const input = "mt-1 w-full rounded-sm border bg-card px-3 py-2.5 text-sm";
  const lbl = "block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour, je suis ${f.name.trim()}${f.phone ? ` (${f.phone.trim()})` : ""}, ${f.email.trim()}.\n\n${f.message.trim()}`;
    const url = whatsappUrl(msg);
    setSentUrl(url);
    window.open(url, "_blank", "noopener");
  };

  return (
    <>
      <PageHero eyebrow="Motel Ain Mersa" title={t("contact_title")} sub={t("contact_sub")} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 lg:grid-cols-12 lg:px-8">
        <div className="space-y-5 text-sm lg:col-span-5">
          <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-terracotta" /><span>{SITE.address.join(", ")}<br /><span className="text-muted-foreground">{SITE.historicAddress}</span></span></p>
          <a href={`tel:${SITE.phoneIntl}`} className="flex gap-3 hover:underline" dir="ltr"><Phone className="h-5 w-5 text-terracotta" />{SITE.phoneDisplay}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex gap-3 hover:underline"><MessageCircle className="h-5 w-5 text-terracotta" />{t("whatsapp")}</a>
          <a href={mapsDirections} target="_blank" rel="noreferrer" className="flex gap-3 hover:underline"><Navigation className="h-5 w-5 text-terracotta" />{t("directions")}</a>
        </div>
        <div className="lg:col-span-7">
          {sentUrl ? (
            <div className="rounded-md border bg-card p-8 text-center">
              <p className="text-muted-foreground">{t("contact_ok")}</p>
              <a href={sentUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-whatsapp px-6 py-3 text-sm font-semibold text-cream"><MessageCircle className="h-4 w-4" />{t("whatsapp")}</a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <label className="block"><span className={lbl}>{t("f_name")}</span><input required minLength={2} maxLength={100} className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
              <div className="grid gap-5 md:grid-cols-2">
                <label><span className={lbl}>{t("f_email")}</span><input required type="email" maxLength={255} className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
                <label><span className={lbl}>{t("f_phone")}</span><input type="tel" maxLength={30} className={input} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
              </div>
              <label className="block"><span className={lbl}>{t("f_message")}</span><textarea required minLength={5} rows={6} maxLength={2000} className={input} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
              <button className="rounded-sm bg-forest px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-forest-deep">{t("f_send")}</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
