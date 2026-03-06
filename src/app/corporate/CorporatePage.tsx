"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(end * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Menu items ─── */
const menuItems = [
  { label: "หน้าแรก", href: "/", external: false },
  { label: "เกี่ยวกับเรา", href: "/section/about", external: true },
  { label: "บริการ", href: "/section/how-it-works", external: true },
  { label: "ติดต่อเรา", href: "/contact", external: true },
];

/* ─── Nav ─── */
function CorporateNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 animate-slide-down ${
          scrolled
            ? "bg-black/45 backdrop-blur-lg border-b border-border/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-5 md:h-20 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/LOGO_ORI.png" alt="ORIGO" width={140} height={40} className="h-9 w-auto md:h-10" priority />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex flex-1 justify-center gap-2 lg:gap-3">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:bg-white/5 hover:text-[var(--luxury-accent)] lg:px-4"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Spacer for mobile */}
          <div className="flex-1 md:hidden" />

          <a
            href="https://www.origo-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hidden md:inline-flex"
          >
            Login
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ml-3 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 animate-fade-in md:hidden">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={handleClick}
              className="text-xl font-medium text-white/80 hover:text-[var(--luxury-accent)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://www.origo-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-4"
            onClick={handleClick}
          >
            Login
          </a>
        </div>
      )}
    </>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const hasTriggered = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only trigger on scroll down, and only once
      if (e.deltaY > 30 && !hasTriggered.current) {
        hasTriggered.current = true;
        window.open("/signals", "_blank");
        // Reset after a delay so it can trigger again if user stays
        setTimeout(() => { hasTriggered.current = false; }, 3000);
      }
    };

    // Also handle touch swipe up on mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 60 && !hasTriggered.current) {
        hasTriggered.current = true;
        window.open("/signals", "_blank");
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
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--luxury-bg-base)]">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--luxury-bg-base)] via-transparent to-[var(--luxury-bg-base)]" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--luxury-accent-subtle)] blur-[150px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo + Text Row */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Animated Logo left - larger than text */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 shrink-0 -mr-1 sm:-mr-2 md:-mr-3 flex items-center justify-center">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
              <circle
                className="animate-[squishRing_0.6s_cubic-bezier(.28,.84,.42,1)_infinite_alternate_0.3s]"
                cx="110" cy="110" r="45"
                stroke="var(--luxury-accent, #FDB850)" strokeWidth="30" fill="none"
                style={{ transformOrigin: "110px 155px" }}
              />
              <circle
                className="animate-[jumpDot_0.6s_cubic-bezier(.28,.84,.42,1)_infinite_alternate]"
                cx="45" cy="45" r="15"
                fill="var(--luxury-accent, #FDB850)"
                style={{ transformOrigin: "45px 45px" }}
              />
            </svg>
          </div>

          {/* Text right */}
          <div className="text-left">
            <h1 className="font-heading font-black leading-[1.1] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
              <span className="text-white">FOCUS THE </span>
              <span className="text-[var(--luxury-accent)]">8%</span>
            </h1>
            <p className="mt-1 font-heading font-semibold text-[clamp(1.2rem,3.5vw,2.4rem)] tracking-wide">
              <span className="text-white/40">DESIGNS THE </span>
              <span className="text-[var(--luxury-accent)]">92%</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="/signals"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury group inline-flex items-center gap-3 rounded-full bg-[var(--luxury-accent)] px-8 py-3.5 text-base font-semibold text-[#0A0A0A] sm:px-10 sm:py-4 sm:text-lg"
          >
            <span className="relative z-10">เริ่มต้นกับ ORIGO</span>
            <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-transform duration-300 group-hover:rotate-45">
              →
            </span>
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 md:mt-20 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <div className="inline-flex flex-col items-center gap-2 text-[var(--luxury-text-subtle)]">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll to explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-[var(--luxury-text-disabled)] text-xs animate-fade-in-up" style={{ animationDelay: "1s" }}>
          © {new Date().getFullYear()} ORIGO. All rights reserved.
        </p>
      </div>
    </section>
  );
}

/* ─── Three.js Globe ─── */
function GlobeCanvas({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = reject;
        document.head.appendChild(s);
      });

    (async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js");

      if (disposed) return;
      const THREE = (window as any).THREE;

      const w = container.clientWidth;
      const h = container.clientHeight;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050505, 0.002);

      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
      camera.position.z = 250;
      camera.position.y = 50;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minDistance = 150;
      controls.maxDistance = 400;

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      const globeRadius = 100;
      const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x0a0a0a, emissive: 0x000000, specular: 0x111111,
        shininess: 5, transparent: true, opacity: 0.95,
      });
      globeGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dl = new THREE.DirectionalLight(0xffffff, 0.6);
      dl.position.set(1, 1, 1).normalize();
      scene.add(dl);

      function createCircleTex(color: string, size: number) {
        const c = document.createElement("canvas");
        c.width = size; c.height = size;
        const ctx = c.getContext("2d")!;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        const t = new THREE.Texture(c);
        t.needsUpdate = true;
        return t;
      }

      function latLonToVec3(lat: number, lon: number, r: number) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -(r * Math.sin(phi) * Math.cos(theta)),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        );
      }

      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.src = "https://unpkg.com/three-globe/example/img/earth-water.png";
      img.onload = () => {
        if (disposed) return;
        const cv = document.createElement("canvas");
        cv.width = img.width; cv.height = img.height;
        const ctx = cv.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
        const pos: number[] = [];
        const step = 3;
        for (let y = 0; y < cv.height; y += step)
          for (let x = 0; x < cv.width; x += step) {
            if (data[(y * cv.width + x) * 4] < 100) {
              const v = latLonToVec3(90 - (y / cv.height) * 180, (x / cv.width) * 360 - 180, globeRadius + 0.5);
              pos.push(v.x, v.y, v.z);
            }
          }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
          size: 1.0, color: 0xbbbbbb, transparent: true, opacity: 0.8,
          map: createCircleTex("#ffffff", 32), alphaTest: 0.1,
        });
        globeGroup.add(new THREE.Points(geo, mat));
      };

      function animate() {
        if (disposed) return;
        requestAnimationFrame(animate);
        globeGroup.rotation.y += 0.0015;
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      const onResize = () => {
        if (disposed) return;
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);
    })();

    return () => {
      disposed = true;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}

/* ─── About ─── */
function AboutSection() {
  const r1 = useReveal();
  const r2 = useReveal();

  const dataPoints = [
    "ตลาดและแนวโน้มอุตสาหกรรม",
    "ผู้ซื้อและเครือข่ายธุรกิจ",
    "กำลังการผลิตและซัพพลายเชน",
    "โครงสร้างการแข่งขัน",
  ];

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-16 sm:py-24 bg-[var(--luxury-bg-base)] overflow-hidden scroll-mt-24 snap-start">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
        {/* Label */}
        <div
          ref={r1.ref}
          className={`transition-all duration-700 ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--luxury-text-tertiary)] mb-6">
            About ORIGO
          </div>
          <h2 className="font-heading text-2xl font-semibold leading-tight text-white sm:text-4xl md:text-6xl max-w-3xl">
            From Information
            <br />
            to <span className="text-[var(--luxury-accent)]">Intelligence</span>
          </h2>
        </div>

        {/* Globe + overlay text */}
        <div
          ref={r2.ref}
          className={`relative mt-10 md:mt-14 rounded-2xl overflow-hidden transition-all duration-700 delay-200 ${
            r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ minHeight: "500px" }}
        >
          <GlobeCanvas className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-center h-full min-h-[500px] p-8 md:p-12 lg:p-16 max-w-lg">
            <p className="text-[var(--luxury-text-tertiary)] text-base sm:text-lg leading-[1.8] mb-8">
              ORIGO ก่อตั้งขึ้นจากประสบการณ์การทำธุรกิจระหว่างประเทศ
              และการวิเคราะห์ตลาดมากกว่า{" "}
              <span className="font-semibold text-[var(--luxury-accent)]">18 ปี</span>
            </p>

            <ul className="space-y-3 mb-8">
              {dataPoints.map((dp, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--luxury-accent)] shrink-0" />
                  <span className="text-white/90 text-sm sm:text-base md:text-lg">{dp}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/50 text-sm sm:text-base leading-relaxed">
              ให้กลายเป็นภาพรวมที่เข้าใจได้ทันที
              <br />
              เพื่อให้ผู้บริหารมองเห็นโอกาสและความเสี่ยงได้ชัดเจนขึ้น
            </p>
          </div>
        </div>

        {/* Proof points */}
        <div id="results" className="mt-12 grid gap-8 pt-10 md:grid-cols-4 text-center scroll-mt-24">
          {[
            { value: 18, suffix: "+", label: "ปี", sub: "ประสบการณ์" },
            { value: 165, suffix: "+", label: "ประเทศ", sub: "ครอบคลุมทั่วโลก" },
            { value: 70, suffix: "K+", label: "พาร์ตเนอร์", sub: "เครือข่ายธุรกิจ" },
            { value: 4, suffix: "B+", label: "บาท", sub: "ยอดขายที่สร้างให้ลูกค้า" },
          ].map((s) => {
            const rv = useReveal();
            return (
              <div
                key={s.label}
                ref={rv.ref}
                className={`transition-all duration-700 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <p className="text-2xl font-semibold text-white sm:text-4xl md:text-6xl">
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xl text-white/85 sm:text-2xl md:text-3xl">{s.label}</p>
                <p className="mt-3 text-base text-white/50 sm:text-lg">{s.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const cards = [
    {
      phase: "01",
      title: "Get Clarity",
      subtitle: "Data Intelligence Phase",
      body: "เปลี่ยนข้อมูลตลาด ผู้ซื้อ และกำลังการผลิต ให้เป็นภาพข้อมูลที่เข้าใจง่ายผ่าน Dashboard",
      points: ["ธุรกิจของคุณอยู่ตรงไหนในตลาด", "ใครคือคู่แข่งสำคัญ", "โอกาสอยู่ที่ใด"],
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      phase: "02",
      title: "Get Connected",
      subtitle: "Market Activation Phase",
      body: "ใช้ฐานข้อมูลและการวิเคราะห์รูปแบบตลาด เพื่อค้นหาประเทศและผู้ซื้อที่เหมาะกับธุรกิจของคุณ",
      points: ["เข้าถึงตลาดใหม่อย่างมีทิศทาง"],
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      phase: "03",
      title: "Get Ahead",
      subtitle: "Action & Growth Phase",
      body: "ไม่ใช่แค่วิเคราะห์ข้อมูล แต่ช่วยแนะนำก้าวต่อไปของธุรกิจ พร้อมอัปเดตข้อมูลตลาดและคำแนะนำเชิงกลยุทธ์อย่างต่อเนื่อง",
      points: ["แนะนำก้าวต่อไปของธุรกิจ"],
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="relative min-h-screen flex flex-col justify-center py-16 sm:py-20 bg-[var(--luxury-bg-elevated-1)] overflow-hidden snap-start scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
        {/* Section header */}
        {(() => {
          const rv = useReveal();
          return (
            <div
              ref={rv.ref}
              className={`text-center mb-12 md:mb-16 transition-all duration-700 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--luxury-text-tertiary)] mb-6">
                How It Works
              </div>
              <h2 className="font-heading text-2xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                ORIGO ทำงานอย่างไร
              </h2>
            </div>
          );
        })()}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {cards.map((card, i) => {
            const rv = useReveal();
            return (
              <div
                key={card.phase}
                ref={rv.ref}
                className={`card-luxury rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-700 ${
                  rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Phase number */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[var(--luxury-accent-subtle)] flex items-center justify-center text-[var(--luxury-accent)]">
                    {card.icon}
                  </div>
                  <span className="text-[var(--luxury-text-subtle)] text-xs font-mono">{card.phase}</span>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 font-heading">{card.title}</h3>
                <p className="text-[var(--luxury-accent)] opacity-70 text-xs font-mono uppercase tracking-wider mb-4">{card.subtitle}</p>

                <p className="text-[var(--luxury-text-tertiary)] text-base sm:text-lg leading-[1.7] flex-1">{card.body}</p>

                {/* Points */}
                <ul className="mt-5 space-y-2">
                  {card.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-white/60 text-base sm:text-lg">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--luxury-accent)] opacity-60 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {(() => {
          const rv = useReveal();
          return (
            <div
              ref={rv.ref}
              className={`text-center mt-12 md:mt-16 transition-all duration-700 delay-300 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Link
                href="/signals"
                className="btn-luxury group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--luxury-accent)] px-7 py-3 text-base font-semibold text-[#0A0A0A] sm:w-auto sm:px-9 sm:py-4 sm:text-lg md:px-10 md:text-2xl"
              >
                <span className="relative z-10">เริ่มต้นกับ Origo Signals</span>
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-transform duration-300 group-hover:rotate-45 sm:h-10 sm:w-10">
                  →
                </span>
              </Link>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

/* ─── Footer (matches Signals footer pattern) ─── */
function CorporateFooter() {
  return (
    <footer id="reviews" className="relative min-h-screen flex flex-col justify-center bg-[var(--luxury-bg-elevated-1)] py-16 sm:py-20 snap-start scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white">
                ORIG<span className="text-[var(--luxury-accent)]">O</span>
              </p>
              <p className="mt-3 text-sm text-[var(--luxury-text-tertiary)]">
                Market Intelligence for International Trade
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-6">
            <p className="text-[var(--luxury-text-disabled)] text-xs">
              © {new Date().getFullYear()} ORIGO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function CorporateHomePage() {
  return (
    <main className="h-screen overflow-hidden bg-[var(--luxury-bg-base)] text-white">
      <CorporateNav />
      <HeroSection />
    </main>
  );
}

/* ─── Exported sub-sections for use in other pages ─── */
export { AboutSection, HowItWorksSection, CorporateFooter, CorporateNav };
