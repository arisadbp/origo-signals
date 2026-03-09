"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface TopNavProps {
  links?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
}

const defaultLinks = [
  { label: "บริการ", href: "#services" },
  { label: "ผลลัพธ์", href: "#results" },
  { label: "เกี่ยวกับเรา", href: "#about" },
];

export default function TopNav({
  links: customLinks,
  ctaLabel = "จองเวลา",
  ctaHref = "/contact",
  ctaExternal = false,
}: TopNavProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = customLinks || defaultLinks;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaProps = ctaExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 animate-slide-down ${
          isScrolled
            ? "bg-black/45 backdrop-blur-lg border-b border-border/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-5 md:h-20 md:px-6 desktop-shell">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/LOGO_ORI.png"
                alt="ORIGO"
                width={140}
                height={40}
                className="h-9 w-auto md:h-10"
                priority
              />
            </Link>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center md:flex">
            {ctaExternal ? (
              <a href={ctaHref} {...ctaProps} className="btn-gold inline-flex items-center gap-2">
                {ctaLabel}
                <ArrowRight size={18} />
              </a>
            ) : (
              <Link href={ctaHref} className="btn-gold inline-flex items-center gap-2">
                {ctaLabel}
                <ArrowRight size={18} />
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors duration-200 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12" /><path d="M18 6l-12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute inset-0 flex flex-col items-center justify-center gap-8 text-xl text-white transition-transform duration-300 sm:gap-10 sm:text-2xl ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {ctaExternal ? (
            <a
              href={ctaHref}
              {...ctaProps}
              className="btn-gold inline-flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {ctaLabel}
              <ArrowRight size={18} />
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="btn-gold inline-flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {ctaLabel}
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
