import { notFound } from "next/navigation";
import { RoomDetailView } from "@/components/RoomDetailView";
import { rooms } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  // Next exige au moins un paramètre en mode statique strict : on garde dynamicParams=false et un tableau vide géré ci-dessous.
  return rooms.map((r) => ({ slug: r.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();
  return <RoomDetailView room={room} />;
}
