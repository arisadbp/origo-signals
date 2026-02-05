"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      setProgress(Math.min(scrollPercentage, 100));
    };

    window.addEventListener("scroll", calculateProgress);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFD700] transition-all duration-150 shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
