"use client";

import { AboutSection, CorporateNav } from "@/app/corporate/CorporatePage";
import { useScrollToNewTab } from "@/hooks/useScrollToNewTab";

export default function AboutPage() {
  useScrollToNewTab("/section/how-it-works", "/");

  return (
    <main className="h-screen overflow-hidden bg-[var(--luxury-bg-base)] text-white">
      <CorporateNav />
      <AboutSection />
    </main>
  );
}
