"use client";

import { useEffect, useRef } from "react";

/**
 * Detects scroll-down (wheel or touch swipe) and opens a URL in a new tab.
 * Optionally detects scroll-up to go back.
 */
export function useScrollToNewTab(nextUrl?: string, prevUrl?: string) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasTriggered.current) return;

      if (e.deltaY > 40 && nextUrl) {
        hasTriggered.current = true;
        window.open(nextUrl, "_blank");
        setTimeout(() => { hasTriggered.current = false; }, 3000);
      } else if (e.deltaY < -40 && prevUrl) {
        hasTriggered.current = true;
        window.open(prevUrl, "_blank");
        setTimeout(() => { hasTriggered.current = false; }, 3000);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (hasTriggered.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;

      if (deltaY > 60 && nextUrl) {
        hasTriggered.current = true;
        window.open(nextUrl, "_blank");
        setTimeout(() => { hasTriggered.current = false; }, 3000);
      } else if (deltaY < -60 && prevUrl) {
        hasTriggered.current = true;
        window.open(prevUrl, "_blank");
        setTimeout(() => { hasTriggered.current = false; }, 3000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextUrl, prevUrl]);
}
