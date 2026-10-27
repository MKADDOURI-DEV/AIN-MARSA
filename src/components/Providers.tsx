"use client";
import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppButton } from "./WhatsAppButton";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </I18nProvider>
  );
}
