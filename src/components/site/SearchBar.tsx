import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const today = () => new Date().toISOString().slice(0, 10);
const plus = (d: string, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

export function SearchBar() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [s, setS] = useState({ in: today(), out: plus(today(), 2), adults: 2, children: 0, rooms: 1 });
  const field = "w-full bg-transparent text-sm font-medium text-foreground outline-none";
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); nav({ to: "/reservation", search: { in: s.in, out: s.out, adults: s.adults, children: s.children, rooms: s.rooms } }); }}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border shadow-soft md:grid-cols-6"
    >
      {[
        { k: "in", label: t("s_checkin"), type: "date" },
        { k: "out", label: t("s_checkout"), type: "date" },
      ].map((f) => (
        <label key={f.k} className="bg-card px-4 py-3">
          <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">{f.label}</span>
          <input type="date" required className={field} value={s[f.k as "in"]} min={f.k === "out" ? plus(s.in, 1) : today()}
            onChange={(e) => setS({ ...s, [f.k]: e.target.value })} />
        </label>
      ))}
      {([["adults", t("s_adults"), 1], ["children", t("s_children"), 0], ["rooms", t("s_rooms"), 1]] as const).map(([k, label, min]) => (
        <label key={k} className="bg-card px-4 py-3">
          <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</span>
          <input type="number" min={min} max={20} className={field} value={s[k]} onChange={(e) => setS({ ...s, [k]: Number(e.target.value) })} />
        </label>
      ))}
      <button className="col-span-2 bg-forest px-4 py-4 text-sm font-semibold text-cream transition hover:bg-forest-deep md:col-span-1">
        {t("s_search")}
      </button>
    </form>
  );
}
