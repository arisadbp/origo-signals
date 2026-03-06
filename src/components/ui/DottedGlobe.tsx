"use client";

import { useEffect, useRef } from "react";

interface DottedGlobeProps {
  className?: string;
}

export function DottedGlobe({ className = "" }: DottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Highlighted regions (lon, lat in degrees) — gold accent points
    const highlights = [
      { lon: -60, lat: -15 },   // South America
      { lon: 30, lat: 5 },      // Africa
      { lon: 100, lat: 15 },    // Southeast Asia (Thailand)
      { lon: 140, lat: -25 },   // Australia
      { lon: -95, lat: 35 },    // North America
      { lon: 10, lat: 50 },     // Europe
      { lon: 80, lat: 30 },     // India
      { lon: 120, lat: 35 },    // East Asia
    ];

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.55;
      const radius = Math.min(w, h) * 0.44;

      const dotSpacing = 4.5;
      const dotRadius = 1.0;
      const rotation = rotationRef.current;

      // Draw dots on sphere
      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        const latRad = (lat * Math.PI) / 180;
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);
        const circumference = cosLat * 360;
        const lonStep = Math.max(dotSpacing, (dotSpacing / cosLat) * 0.8);

        for (let lon = -180; lon < 180; lon += lonStep) {
          const lonRad = ((lon + rotation) * Math.PI) / 180;
          const cosLon = Math.cos(lonRad);
          const sinLon = Math.sin(lonRad);

          // Only draw front-facing dots
          if (cosLon * cosLat < 0) continue;

          const x = cx + radius * sinLon * cosLat;
          const y = cy - radius * sinLat;

          // Check if near a highlight
          let isHighlight = false;
          for (const hl of highlights) {
            const dlat = lat - hl.lat;
            const dlon = ((lon - hl.lon + 540) % 360) - 180;
            if (dlat * dlat + dlon * dlon < 120) {
              isHighlight = true;
              break;
            }
          }

          // Depth-based alpha
          const depth = cosLon * cosLat;
          const alpha = 0.15 + depth * 0.65;

          if (isHighlight) {
            // Gold glow for highlights
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 189, 89, ${alpha * 0.15})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 189, 89, ${alpha * 0.9})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 185, 195, ${alpha * 0.5})`;
            ctx.fill();
          }
        }
      }

      rotationRef.current += 0.15;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
