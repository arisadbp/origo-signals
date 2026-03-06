"use client";

import { CorporateFooter, CorporateNav } from "@/app/corporate/CorporatePage";
import { useScrollToNewTab } from "@/hooks/useScrollToNewTab";

export default function FooterPage() {
  useScrollToNewTab(undefined, "/section/how-it-works");

  return (
    <main className="h-screen overflow-hidden bg-[var(--luxury-bg-base)] text-white">
      <CorporateNav />
      <CorporateFooter />
    </main>
  );
}
