"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const statements = [
  {
    title: "เจ้าของธุรกิจ",
    description: "มีเวลาเหลือมากขึ้น",
  },
  {
    title: "ธุรกิจ",
    description: "เติบโตอย่างเป็นระบบ",
  },
  {
    title: "ทีมงาน",
    description: "รู้ชัดว่าควรโฟกัสอะไร",
  },
];

export default function ValueStatementSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    setAnimationStep(0);
    const intervalId = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= statements.length + 1) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(intervalId);
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-6 text-center mobile-shell desktop-shell-narrow">
        <div className="space-y-3">
          <p
            className={`text-sm text-white/70 sm:text-2xl md:text-2xl transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            ไม่ใช่เพราะทำงานหนักขึ้น
          </p>
          <p
            className={`text-xl text-white/90 sm:text-3xl md:text-4xl transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            แต่เพราะเริ่มจากการ
          </p>
          <h2
            className={`font-heading text-2xl leading-tight text-white sm:text-4xl md:text-6xl transition-all duration-700 ease-out ${
              isInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            กำหนดทิศทางการขายที่ชัดเจน
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-center gap-8 text-xl text-white/95 sm:text-3xl md:text-4xl">
          {statements.map((item, index) => {
            const isActive = animationStep > index;
            return (
              <div key={item.title} className="flex flex-col items-center">
                <div
                  className={`transition-all duration-500 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <span className="font-semibold text-[var(--luxury-accent)] sm:text-5xl">
                    {item.title}
                  </span>
                  <p className="mt-2 text-white/90 sm:text-4xl">
                    {item.description}
                  </p>
                </div>

                {index < statements.length - 1 && (
                  <div className="mt-8 h-10 w-px overflow-hidden">
                    <div
                      className={`h-full w-px bg-gradient-to-b from-[var(--luxury-accent)]/60 to-[var(--luxury-accent)]/20 transition-all duration-500 ease-out ${
                        isActive ? "translate-y-0" : "-translate-y-full"
                      }`}
                      style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="h-10 w-px overflow-hidden">
            <div
              className={`h-full w-px bg-gradient-to-b from-[var(--luxury-accent)]/60 to-[var(--luxury-accent)]/20 transition-all duration-500 ease-out ${
                animationStep > statements.length - 1
                  ? "translate-y-0"
                  : "-translate-y-full"
              }`}
              style={{
                transitionDelay: `${statements.length * 100 + 200}ms`,
              }}
            />
          </div>
        </div>

        <div
          className={`mt-10 flex items-center justify-center text-[var(--luxury-accent)] transition-all duration-500 ease-out ${
            animationStep > statements.length
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1"
          }`}
          style={{
            transitionDelay: `${statements.length * 100 + 200}ms`,
            animation:
              animationStep > statements.length
                ? "float 3s ease-in-out infinite"
                : "none",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 4v12m0 0l-5-5m5 5l5-5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
