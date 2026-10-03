import { Wifi, Car, Users, Wind, Snowflake, Trees, Sun, Coffee, Mountain, Sparkles } from "lucide-react";

const map = { wifi: Wifi, car: Car, users: Users, wind: Wind, snowflake: Snowflake, trees: Trees, sun: Sun, coffee: Coffee, mountain: Mountain };

export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const I = (name && map[name as keyof typeof map]) || Sparkles;
  return <I className={className} aria-hidden />;
}
