"use client";

import { useEffect, useRef } from "react";

interface DottedGlobeProps {
  className?: string;
}

// Simplified continent boundaries — returns true if (lat, lon) is land
function isLand(lat: number, lon: number): boolean {
  // North America
  if (lat > 15 && lat < 72 && lon > -170 && lon < -50) {
    if (lat > 50 && lon < -140) return true; // Alaska
    if (lat > 25 && lat < 50 && lon > -130 && lon < -65) return true; // US/Canada
    if (lat > 15 && lat < 33 && lon > -120 && lon < -85) return true; // Mexico
    if (lat > 50 && lon > -140 && lon < -55) return true; // Canada
  }
  // Central America & Caribbean
  if (lat > 7 && lat < 22 && lon > -92 && lon < -60) return true;
  // South America
  if (lat > -56 && lat < 13 && lon > -82 && lon < -34) {
    if (lon > -82 && lon < -34) {
      if (lat > -5 && lon > -50) return true;
      if (lat > -20 && lon > -70 && lon < -35) return true;
      if (lat > -35 && lon > -72 && lon < -48) return true;
      if (lat > -56 && lat < -35 && lon > -76 && lon < -63) return true;
      if (lat > 0 && lat < 13 && lon > -82 && lon < -60) return true;
      if (lat > -20 && lat < 0 && lon > -82 && lon < -60) return true;
    }
  }
  // Europe
  if (lat > 35 && lat < 72 && lon > -12 && lon < 45) {
    if (lat > 36 && lat < 44 && lon > -10 && lon < 4) return true; // Iberia
    if (lat > 42 && lat < 52 && lon > -5 && lon < 10) return true; // France
    if (lat > 47 && lat < 55 && lon > 5 && lon < 15) return true; // Germany
    if (lat > 36 && lat < 47 && lon > 6 && lon < 19) return true; // Italy
    if (lat > 50 && lat < 60 && lon > -11 && lon < 2) return true; // UK
    if (lat > 55 && lat < 72 && lon > 4 && lon < 32) return true; // Scandinavia
    if (lat > 47 && lat < 55 && lon > 14 && lon < 25) return true; // Poland
    if (lat > 44 && lat < 48 && lon > 20 && lon < 30) return true; // Romania
    if (lat > 35 && lat < 42 && lon > 19 && lon < 30) return true; // Greece
    if (lat > 48 && lat < 60 && lon > 24 && lon < 42) return true; // Baltic/Belarus
  }
  // Africa
  if (lat > -35 && lat < 37 && lon > -18 && lon < 52) {
    if (lat > 20 && lon > -18 && lon < 40) return true; // North Africa
    if (lat > 0 && lat < 20 && lon > -18 && lon < 45) return true; // West/Central
    if (lat > -20 && lat < 0 && lon > 10 && lon < 42) return true; // East
    if (lat > -35 && lat < -20 && lon > 15 && lon < 35) return true; // South
    if (lat > -15 && lat < 0 && lon > 28 && lon < 42) return true; // East coast
    if (lat > 5 && lat < 15 && lon > 35 && lon < 52) return true; // Horn
  }
  // Russia / Central Asia
  if (lat > 42 && lat < 75 && lon > 40 && lon < 180) {
    if (lat > 50) return true;
    if (lat > 42 && lon > 50 && lon < 90) return true;
  }
  // Middle East
  if (lat > 12 && lat < 42 && lon > 25 && lon < 65) {
    if (lat > 20 && lat < 38 && lon > 25 && lon < 50) return true; // Turkey/Iraq/Saudi
    if (lat > 23 && lat < 40 && lon > 44 && lon < 65) return true; // Iran/Afghan
    if (lat > 12 && lat < 25 && lon > 42 && lon < 55) return true; // Yemen/Oman
  }
  // India / South Asia
  if (lat > 6 && lat < 36 && lon > 67 && lon < 98) {
    if (lat > 20 && lon > 67 && lon < 92) return true;
    if (lat > 6 && lat < 20 && lon > 72 && lon < 88) return true;
    if (lat > 25 && lat < 36 && lon > 75 && lon < 98) return true; // Nepal area
  }
  // Southeast Asia
  if (lat > -10 && lat < 28 && lon > 92 && lon < 140) {
    if (lat > 10 && lat < 28 && lon > 92 && lon < 110) return true; // Indochina
    if (lat > -8 && lat < 8 && lon > 95 && lon < 140) return true; // Indonesia/Malaysia
    if (lat > 5 && lat < 20 && lon > 115 && lon < 128) return true; // Philippines
  }
  // East Asia
  if (lat > 18 && lat < 55 && lon > 100 && lon < 145) {
    if (lat > 20 && lat < 55 && lon > 100 && lon < 135) return true; // China
    if (lat > 30 && lat < 46 && lon > 125 && lon < 145) return true; // Japan/Korea
  }
  // Australia
  if (lat > -45 && lat < -10 && lon > 112 && lon < 155) {
    if (lat > -40 && lat < -10 && lon > 112 && lon < 155) return true;
  }
  // New Zealand
  if (lat > -48 && lat < -34 && lon > 165 && lon < 179) return true;

  return false;
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

    // Blue highlight cities (lon, lat)
    const highlights = [
      { lon: -74, lat: 40.7 },   // New York
      { lon: -99, lat: 19.4 },   // Mexico City
      { lon: -43, lat: -22.9 },  // Rio
      { lon: -0.1, lat: 51.5 },  // London
      { lon: 37, lat: 55.8 },    // Moscow
      { lon: 100.5, lat: 13.8 }, // Bangkok
      { lon: 121, lat: 31.2 },   // Shanghai
      { lon: 139.7, lat: 35.7 }, // Tokyo
      { lon: 28, lat: -26 },     // Johannesburg
      { lon: 151, lat: -33.9 },  // Sydney
      { lon: 72.8, lat: 19 },    // Mumbai
      { lon: 55, lat: 25.2 },    // Dubai
    ];

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.42;

      // Draw dark globe background with subtle gradient
      const grad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(30, 32, 38, 1)");
      grad.addColorStop(0.7, "rgba(12, 13, 16, 1)");
      grad.addColorStop(1, "rgba(5, 5, 8, 1)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      glowGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
      glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      const dotSpacing = 3.2;
      const dotRadius = 0.7;
      const rotation = rotationRef.current;

      // Draw continent dots on sphere
      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        const latRad = (lat * Math.PI) / 180;
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);
        const lonStep = Math.max(dotSpacing, (dotSpacing / cosLat) * 0.8);

        for (let lon = -180; lon < 180; lon += lonStep) {
          const lonRad = ((lon + rotation) * Math.PI) / 180;
          const cosLon = Math.cos(lonRad);
          const sinLon = Math.sin(lonRad);

          // Depth check — only front-facing
          const depth = cosLon * cosLat;
          if (depth < 0.05) continue;

          // Only draw land
          if (!isLand(lat, lon)) continue;

          const x = cx + radius * sinLon * cosLat;
          const y = cy - radius * sinLat;

          const alpha = 0.12 + depth * 0.55;

          // Check highlight proximity
          let isHL = false;
          for (const hl of highlights) {
            const dlat = lat - hl.lat;
            const dlon = ((lon - hl.lon + 540) % 360) - 180;
            if (dlat * dlat + dlon * dlon < 25) {
              isHL = true;
              break;
            }
          }

          if (isHL) {
            // Blue glow
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(60, 140, 255, ${alpha * 0.12})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(80, 160, 255, ${alpha * 0.9})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(160, 165, 175, ${alpha * 0.45})`;
            ctx.fill();
          }
        }
      }

      rotationRef.current += 0.12;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow shadow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 80px 20px rgba(255,255,255,0.06), 0 0 160px 60px rgba(255,255,255,0.02)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
