import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, MessageCircle, Navigation, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";
import { SITE, whatsappUrl, mapsEmbed, mapsDirections } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & accès — Motel Ain Mersa, Dayet Aoua" },
      { name: "description", content: "Contactez le Motel Ain Mersa : +212 6 61 81 37 75. Aït Hmad / Dayet Aoua, province d’Ifrane, Maroc." },
      { property: "og:title", content: "Contact — Motel Ain Mersa" },
      { property: "og:description", content: "Téléphone, WhatsApp, carte et itinéraire vers l’auberge Ain Mersa." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(5).max(2000),
});

function Contact() {
  const { t } = useI18n();
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [st, setSt] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = schema.safeParse(f);
    if (!p.success) return setSt("error");
    setSt("sending");
    const { error } = await supabase.from("contact_messages").insert({ name: p.data.name, email: p.data.email, phone: p.data.phone || null, message: p.data.message });
    setSt(error ? "error" : "done");
    if (!error) setF({ name: "", email: "", phone: "", message: "" });
  };
  const input = "mt-1 w-full rounded-sm border bg-card px-3 py-2.5 text-sm";
  const lbl = "block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <>
      <PageHero eyebrow="Motel Ain Mersa" title={t("contact_title")} sub={t("contact_sub")} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-2 lg:px-8">
        <div>
          <address className="not-italic">
            <p className="font-display text-3xl text-forest-deep">Motel Ain Mersa</p>
            <p className="mt-4 flex gap-3 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-terracotta" /><span>{SITE.address.map((l) => <span key={l} className="block">{l}</span>)}</span></p>
            <p className="mt-2 text-xs text-muted-foreground">{SITE.historicAddress}</p>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${SITE.phoneIntl}`} className="flex items-center gap-2 rounded-sm bg-forest px-5 py-3 text-sm font-semibold text-cream"><Phone className="h-4 w-4" /><span dir="ltr">{SITE.phoneDisplay}</span></a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-sm bg-whatsapp px-5 py-3 text-sm font-semibold text-cream"><MessageCircle className="h-4 w-4" />{t("whatsapp")}</a>
            <a href={mapsDirections} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-sm border px-5 py-3 text-sm font-semibold"><Navigation className="h-4 w-4" />{t("directions")}</a>
          </div>
          <iframe title="Carte" src={mapsEmbed} loading="lazy" className="mt-10 h-80 w-full rounded-md border" />
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-md bg-card p-8 shadow-soft">
          <label className="block"><span className={lbl}>{t("f_name")}</span><input required maxLength={100} className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className={lbl}>{t("f_email")}</span><input required type="email" maxLength={255} className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
            <label><span className={lbl}>{t("f_phone")}</span><input type="tel" maxLength={30} className={input} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
          </div>
          <label className="block"><span className={lbl}>{t("f_message")}</span><textarea required rows={6} maxLength={2000} className={input} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
          {st === "done" && <p role="status" className="rounded-sm bg-forest/10 p-3 text-sm text-forest">{t("contact_ok")}</p>}
          {st === "error" && <p role="alert" className="rounded-sm bg-destructive/10 p-3 text-sm text-destructive">{t("err_generic")}</p>}
          <button disabled={st === "sending"} className="w-full rounded-sm bg-terracotta py-3.5 font-semibold text-cream disabled:opacity-60">{st === "sending" ? t("f_sending") : t("f_send")}</button>
        </form>
      </section>
    </>
  );
}
