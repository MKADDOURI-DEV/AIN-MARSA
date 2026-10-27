"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const today = () => new Date().toISOString().slice(0, 10);
const plus = (d: string, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

export function SearchBar() {
  const { t } = useI18n();
  const router = useRouter();
  const [s, setS] = useState({ in: "", out: "", adults: 2, children: 0, rooms: 1 });
  const field = "w-full bg-transparent text-sm font-medium text-foreground outline-none";
  const min = today();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams({ in: s.in, out: s.out, adults: String(s.adults), children: String(s.children), rooms: String(s.rooms) });
        router.push(`/reservation?${q.toString()}`);
      }}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border shadow-soft md:grid-cols-6"
    >
      <label className="bg-card px-4 py-3">
        <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">{t("s_checkin")}</span>
        <input type="date" required className={field} value={s.in} min={min} onChange={(e) => setS({ ...s, in: e.target.value, out: s.out && s.out <= e.target.value ? plus(e.target.value, 1) : s.out })} />
      </label>
      <label className="bg-card px-4 py-3">
        <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">{t("s_checkout")}</span>
        <input type="date" required className={field} value={s.out} min={s.in ? plus(s.in, 1) : min} onChange={(e) => setS({ ...s, out: e.target.value })} />
      </label>
      {([["adults", t("s_adults"), 1], ["children", t("s_children"), 0], ["rooms", t("s_rooms"), 1]] as const).map(([k, label, mn]) => (
        <label key={k} className="bg-card px-4 py-3">
          <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</span>
          <input type="number" min={mn} max={20} className={field} value={s[k]} onChange={(e) => setS({ ...s, [k]: Number(e.target.value) })} />
        </label>
      ))}
      <button className="col-span-2 bg-forest px-4 py-4 text-sm font-semibold text-cream transition hover:bg-forest-deep md:col-span-1">{t("s_search")}</button>
    </form>
  );
}
