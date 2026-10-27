import type { Metadata } from "next";
import { GalleryView } from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Galerie photos — Motel Ain Mersa, Ifrane",
  description: "Photos du Motel Ain Mersa et des paysages du Moyen Atlas : chambres, nature, montagne, région.",
  openGraph: { title: "Galerie photos — Motel Ain Mersa, Ifrane", description: "Photos du Motel Ain Mersa et des paysages du Moyen Atlas : chambres, nature, montagne, région." },
};

export default function Page() {
  return <GalleryView />;
}
