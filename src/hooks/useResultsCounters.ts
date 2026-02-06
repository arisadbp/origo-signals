"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

const formatCount = (value: string) => {
  const [integer, decimal] = value.split(".");
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal ? `${formatted}.${decimal}` : formatted;
};

export function useResultsCounters() {
  const [ref, isInView] = useInView<HTMLElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const totalSales = useCountUp({
    start: 0,
    end: 4000,
    duration: 2200,
    shouldStart: isInView,
  });
  const customerGrowth = useCountUp({
    start: 0,
    end: 250,
    duration: 1800,
    shouldStart: isInView,
  });
  const cacReduction = useCountUp({
    start: 0,
    end: 85,
    duration: 1800,
    shouldStart: isInView,
  });

  return {
    ref,
    totalSales: formatCount(totalSales),
    customerGrowth: formatCount(customerGrowth),
    cacReduction: formatCount(cacReduction),
  };
}
