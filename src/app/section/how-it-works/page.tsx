"use client";

import { HowItWorksSection, CorporateNav } from "@/app/corporate/CorporatePage";
import { useScrollToNewTab } from "@/hooks/useScrollToNewTab";

export default function HowItWorksPage() {
  useScrollToNewTab("/section/footer", "/section/about");

  return (
    <main className="h-screen overflow-hidden bg-[var(--luxury-bg-base)] text-white">
      <CorporateNav />
      <HowItWorksSection />
    </main>
  );
}
