"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const GAP_PX = 24;

const reviews = [
  {
    initials: "SP",
    name: "Somchai P.",
    title: "Chief Data Officer",
    quote:
      "ก่อนทำงานกับ Origo เราใช้เวลาส่วนใหญ่ไปกับการลองผิดลองถูกหลายเดือน ทีมช่วยวิเคราะห์ให้ชัดขึ้นมาก",
    rating: 5,
  },
  {
    initials: "NW",
    name: "Nattaya W.",
    title: "Founder & CEO",
    quote:
      "ทำให้เราเห็นชัดเลยว่าควรโฟกัสตลาดไหน และลูกค้าแบบไหน จากเดิมที่ตัดสินใจจากความรู้สึก",
    rating: 5,
  },
  {
    initials: "PK",
    name: "Prasert K.",
    title: "Operations Manager",
    quote:
      "ยอดขายโตขึ้นอย่างมีทิศทาง และงานบริหารหลายอย่างมีระบบมากขึ้นอย่างเห็นได้ชัด",
    rating: 5,
  },
  {
    initials: "AL",
    name: "Anong L.",
    title: "Export Director",
    quote:
      "ข้อมูลเชิงลึกช่วยให้ทีมขายคุยกับลูกค้าได้แม่นขึ้นและปิดดีลได้เร็วกว่าเดิม",
    rating: 5,
  },
  {
    initials: "KT",
    name: "Krit T.",
    title: "Commercial Lead",
    quote:
      "เราลดการลองผิดลองถูกได้เยอะมาก ทุกคนในทีมเห็นภาพเดียวกันและเดินไปทางเดียวกัน",
    rating: 5,
  },
  {
    initials: "MS",
    name: "May S.",
    title: "Business Owner",
    quote:
      "หลังได้ทิศทางที่ชัดเจน เราเริ่มเห็นตัวเลขเติบโตแบบคุมได้ ไม่ต้องเร่งแบบเดาสุ่ม",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isStacked, setIsStacked] = useState(false);
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, reviews.length - visibleCount);
  const progress = maxIndex === 0 ? 100 : Math.round((index / maxIndex) * 100);

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateCardWidth = () => {
      if (!containerRef.current) return;
      const styles = window.getComputedStyle(containerRef.current);
      const paddingLeft = parseFloat(styles.paddingLeft || "0");
      const paddingRight = parseFloat(styles.paddingRight || "0");
      const containerWidth = Math.max(
        0,
        containerRef.current.clientWidth - paddingLeft - paddingRight
      );
      if (containerWidth === 0) return;

      const nextVisibleCount =
        containerWidth < 640 ? 1 : containerWidth < 1024 ? 2 : 3;
      const nextIsStacked = containerWidth < 640;
      const calculatedCardWidth = nextIsStacked
        ? containerWidth
        : (containerWidth - nextVisibleCount * GAP_PX) /
          (nextVisibleCount + 1);
      setVisibleCount(nextVisibleCount);
      setIsStacked(nextIsStacked);
      setCardWidth(Math.round(calculatedCardWidth));
    };

    const observer = new ResizeObserver(updateCardWidth);
    observer.observe(containerRef.current);
    updateCardWidth();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [index, maxIndex]);

  const canGoPrev = index > 0;
  const canGoNext = index < maxIndex;
  const offset = index * (cardWidth + GAP_PX);
  const reviewsWidth = isStacked
    ? cardWidth
    : visibleCount * cardWidth + (visibleCount - 1) * GAP_PX;

  return (
    <div className="relative mt-10">
      <div
        className="mx-auto w-full max-w-7xl px-6 overflow-visible desktop-shell"
        ref={containerRef}
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          <div
            className="flex-none rounded-3xl border border-white/10 bg-[#1b1c1f] px-8 py-8 shadow-[0_24px_50px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            style={{
              width:
                cardWidth > 0 ? (isStacked ? "100%" : `${cardWidth}px`) : "auto",
            }}
          >
            <div className="space-y-6">
              <img
                src="/landing-hero/review.png"
                alt="Review mark"
                className="w-2/3 h-auto object-contain"
              />
              <p className="text-3xl text-white leading-tight">
                ลูกค้าของเรา
                <br />
                ว่าอย่างไรบ้าง
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                className="text-3xl text-white/70 transition hover:text-white disabled:opacity-30"
                aria-label="เลื่อนไปทางซ้าย"
                disabled={!canGoPrev}
              >
                ←
              </button>
              <div className="mx-4 h-[2px] flex-1 rounded-full bg-white/20">
                <div
                  className="h-[2px] rounded-full bg-white transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button
                type="button"
                onClick={() => setIndex((prev) => Math.min(maxIndex, prev + 1))}
                className="text-3xl text-white/70 transition hover:text-white disabled:opacity-30"
                aria-label="เลื่อนไปทางขวา"
                disabled={!canGoNext}
              >
                →
              </button>
            </div>
          </div>

          <div
            className="flex-none overflow-hidden"
            style={{
              width: cardWidth > 0 ? `${reviewsWidth}px` : "auto",
            }}
          >
            <div
              className="flex gap-6 py-2 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${offset}px)` }}
              aria-label="รีวิวจากลูกค้าของเรา"
            >
              {reviews.map((item) => (
                <div
                  key={item.initials}
                  className="flex-none flex min-h-[420px] flex-col items-center rounded-[12px] border border-white/20 bg-[#1a1b20] px-8 py-10 text-center shadow-[0_24px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffbd59]/30 hover:shadow-[0_24px_50px_rgba(0,0,0,0.4),0_12px_32px_rgba(255,189,89,0.10)]"
                  style={{ width: cardWidth > 0 ? `${cardWidth}px` : "auto" }}
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 text-2xl font-semibold text-white">
                    {item.initials}
                  </div>
                  <p className="mt-5 font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-white/50">{item.title}</p>
                  <p className="mt-6 text-sm leading-relaxed text-white/50">
                    {item.quote}
                  </p>
                  <div className="mt-auto flex items-center justify-center gap-1 pt-6">
                    {Array.from({ length: item.rating }).map((_, starIndex) => (
                      <Star
                        key={`${item.initials}-star-${starIndex}`}
                        className="h-4 w-4 fill-[#FFBD59] text-[#FFBD59]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
