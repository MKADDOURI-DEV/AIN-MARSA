"use client";

export function NumberSelect({ value, onChange, min, max, className }: { value: number; onChange: (n: number) => void; min: number; max: number; className?: string }) {
  const opts = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))} className={className}>
      {opts.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>
  );
}
