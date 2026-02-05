"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  separator?: boolean;
  className?: string;
}

export function CountUp({
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
  separator = false,
  className = "",
}: CountUpProps) {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const count = useCountUp({
    start: 0,
    end,
    duration,
    decimals,
    shouldStart: isInView,
  });

  const formatNumber = (num: string) => {
    if (!separator) return num;

    const [integer, decimal] = num.split(".");
    const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimal ? `${formatted}.${decimal}` : formatted;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
