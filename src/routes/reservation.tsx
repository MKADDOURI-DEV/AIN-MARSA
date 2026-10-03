import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { roomsQuery } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const searchSchema = z.object({
  in: z.string().optional(), out: z.string().optional(),
  adults: z.coerce.number().optional(), children: z.coerce.number().optional(),
  rooms: z.coerce.number().optional(), room: z.string().optional(),
});

export const Route = createFileRoute("/reservation")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Réservation — Motel Ain Mersa, Ifrane" },
      { name: "description", content: "Envoyez votre demande de séjour au Motel Ain Mersa, auberge à Dayet Aoua dans le Moyen Atlas." },
      { property: "og:title", content: "Réserver — Motel Ain Mersa" },
      { property: "og:description", content: "Demande de réservation pour un séjour au cœur du Moyen Atlas." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(roomsQuery),
  component: Booking,
});

const formSchema = z.object({
  guest_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255),
  notes: z.string().max(1000).optional(),
});

function Booking() {
  const { t } = useI18n();
  const s = Route.useSearch();
  const { data: rooms } = useSuspenseQuery(roomsQuery);
  const [f, setF] = useState({
    check_in: s.in ?? "", check_out: s.out ?? "", adults: s.adults ?? 2, children: s.children ?? 0, rooms_count: s.rooms ?? 1,
    room_id: s.room ?? "", guest_name: "", phone: "", email: "", notes: "",
  });
  const [state, setState] = useState<{ status: "idle" | "sending" | "done" | "error"; msg?: string; ref?: string }>({ status: "idle" });
  const matching = rooms.filter((r) => r.capacity * Math.max(1, f.rooms_count) >= f.adults + f.children);
  const room = rooms.find((r) => r.id === f.room_id);
  const nights = f.check_in && f.check_out ? Math.round((+new Date(f.check_out) - +new Date(f.check_in)) / 86400000) : 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) return setState({ status: "error", msg: t("err_dates") });
    const parsed = formSchema.safeParse(f);
    if (!parsed.success) return setState({ status: "error", msg: t("err_generic") });
    setState({ status: "sending" });
    const reference = "AM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const { error } = await supabase.from("bookings").insert({
      reference, ...parsed.data, check_in: f.check_in, check_out: f.check_out, adults: f.adults, children: f.children,
      rooms_count: f.rooms_count, room_id: f.room_id || null,
      estimated_price: room?.price_mad ? Number(room.price_mad) * nights * f.rooms_count : null,
    });
    if (error) return setState({ status: "error", msg: t("err_generic") });
    setState({ status: "done", ref: reference });
  };

  const input = "mt-1 w-full rounded-sm border bg-card px-3 py-2.5 text-sm";
  const lbl = "block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  if (state.status === "done") {
    return (
      <section className="mx-auto max-w-xl px-5 py-32 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-forest" />
        <h1 className="mt-6 text-4xl text-forest-deep">{t("book_ok_title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("book_ok")}</p>
        <p className="mt-6 font-display text-2xl">{t("ref")} : {state.ref}</p>
        <p className="mt-6 text-sm text-muted-foreground" dir="ltr">{SITE.phoneDisplay}</p>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Motel Ain Mersa" title={t("book_title")} sub={t("book_sub")} />
      <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-12 lg:px-8">
        <div className="space-y-8 lg:col-span-8">
          <fieldset className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <label className="col-span-1"><span className={lbl}>{t("s_checkin")}</span><input required type="date" className={input} value={f.check_in} onChange={(e) => setF({ ...f, check_in: e.target.value })} /></label>
            <label className="col-span-1"><span className={lbl}>{t("s_checkout")}</span><input required type="date" className={input} value={f.check_out} min={f.check_in} onChange={(e) => setF({ ...f, check_out: e.target.value })} /></label>
            <label><span className={lbl}>{t("s_adults")}</span><input type="number" min={1} max={20} className={input} value={f.adults} onChange={(e) => setF({ ...f, adults: +e.target.value })} /></label>
            <label><span className={lbl}>{t("s_children")}</span><input type="number" min={0} max={20} className={input} value={f.children} onChange={(e) => setF({ ...f, children: +e.target.value })} /></label>
            <label><span className={lbl}>{t("s_rooms")}</span><input type="number" min={1} max={10} className={input} value={f.rooms_count} onChange={(e) => setF({ ...f, rooms_count: +e.target.value })} /></label>
          </fieldset>

          {matching.length > 0 && (
            <div>
              <p className={lbl}>{t("f_room")}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <RoomOption active={!f.room_id} onClick={() => setF({ ...f, room_id: "" })} title={t("f_any")} />
                {matching.map((r) => (
                  <RoomOption key={r.id} active={f.room_id === r.id} onClick={() => setF({ ...f, room_id: r.id })}
                    title={r.name} sub={`${r.capacity} ${t("guests")}${r.price_mad ? ` · ${r.price_mad} MAD ${t("per_night")}` : ""}`} />
                ))}
              </div>
            </div>
          )}

          <fieldset className="grid gap-4 md:grid-cols-3">
            <label><span className={lbl}>{t("f_name")}</span><input required maxLength={100} className={input} value={f.guest_name} onChange={(e) => setF({ ...f, guest_name: e.target.value })} /></label>
            <label><span className={lbl}>{t("f_phone")}</span><input required type="tel" maxLength={30} className={input} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
            <label><span className={lbl}>{t("f_email")}</span><input required type="email" maxLength={255} className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
            <label className="md:col-span-3"><span className={lbl}>{t("f_notes")}</span><textarea rows={4} maxLength={1000} className={input} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></label>
          </fieldset>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-md bg-forest-deep p-7 text-cream">
            <p className="font-display text-2xl">Motel Ain Mersa</p>
            <dl className="mt-5 space-y-2 text-sm opacity-90">
              <div className="flex justify-between"><dt>{t("s_checkin")}</dt><dd>{f.check_in || "—"}</dd></div>
              <div className="flex justify-between"><dt>{t("s_checkout")}</dt><dd>{f.check_out || "—"}</dd></div>
              <div className="flex justify-between"><dt>{t("s_adults")} / {t("s_children")}</dt><dd>{f.adults} / {f.children}</dd></div>
              {room && <div className="flex justify-between"><dt>{t("f_room")}</dt><dd>{room.name}</dd></div>}
              {room?.price_mad && nights > 0 && <div className="flex justify-between border-t border-cream/20 pt-2 font-semibold"><dt>≈</dt><dd>{Number(room.price_mad) * nights * f.rooms_count} MAD</dd></div>}
            </dl>
            {state.status === "error" && <p role="alert" className="mt-4 rounded-sm bg-destructive/90 p-3 text-sm">{state.msg}</p>}
            <button disabled={state.status === "sending"} className="mt-6 w-full rounded-sm bg-terracotta py-3.5 font-semibold transition hover:brightness-110 disabled:opacity-60">
              {state.status === "sending" ? t("f_sending") : t("f_send")}
            </button>
            <p className="mt-4 text-xs opacity-70">{t("book_sub")}</p>
          </div>
        </aside>
      </form>
    </>
  );
}

function RoomOption({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub?: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`rounded-md border p-4 text-start transition ${active ? "border-forest bg-forest/5 ring-1 ring-forest" : "hover:bg-muted"}`}>
      <p className="font-semibold">{title}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </button>
  );
}
