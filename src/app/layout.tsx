import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motel Ain Mersa — Auberge à Ifrane, Dayet Aoua, Moyen Atlas",
  description: "Séjour nature au cœur du Moyen Atlas : auberge familiale à Dayet Aoua, province d’Ifrane.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2f4a3a" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;600&display=swap" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
