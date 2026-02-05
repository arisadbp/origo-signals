# ORIGO Landing Page - Production-Ready Responsive Design System

## 🎯 Design Philosophy
**Mobile-First, Container-Controlled, Predictable Scaling**

---

## 1. TYPOGRAPHY SYSTEM (Tailwind Implementation)

### Fluid Typography Scale
```tsx
// Headline sizes (use clamp thinking)
Mobile:    text-[28px] leading-[1.2]  sm:text-[32px]
Tablet:    md:text-[36px]              lg:text-[40px]
Desktop:   xl:text-[48px]              2xl:text-[56px]

// Body text
Mobile:    text-sm (14px) leading-[1.6]
Tablet:    md:text-base (16px) leading-[1.6]
Desktop:   lg:text-lg (18px) leading-[1.7]

// Subheadline
Mobile:    text-base (16px) leading-[1.5]
Tablet:    md:text-lg (18px)
Desktop:   lg:text-xl (20px)
```

### Practical Tailwind Classes by Use Case

#### Hero Headline (Main Pain Point)
```tsx
className="
  text-[28px] leading-[1.2]
  sm:text-[32px]
  md:text-[40px]
  lg:text-[48px]
  xl:text-[56px]
  font-bold text-white
  max-w-5xl mx-auto
  px-5 sm:px-6 md:px-8
"
```

#### Section Headlines
```tsx
className="
  text-2xl leading-[1.3]
  sm:text-3xl
  md:text-4xl
  lg:text-5xl
  font-bold text-white
  max-w-4xl mx-auto
  px-5 sm:px-6
"
```

#### Body Text
```tsx
className="
  text-sm leading-[1.6]
  md:text-base md:leading-[1.6]
  lg:text-lg lg:leading-[1.7]
  text-white/90
  max-w-3xl mx-auto
  px-5 sm:px-6
"
```

---

## 2. SPACING & CONTAINER SYSTEM

### Safe Container Padding (Never Edge-to-Edge)
```tsx
// Global container pattern
<div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
  {/* Content */}
</div>

// Narrow content (text-focused)
<div className="max-w-4xl mx-auto px-5 sm:px-6">
  {/* Content */}
</div>

// Wide content (grid/visual)
<div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-8">
  {/* Content */}
</div>
```

### Section Vertical Spacing
```tsx
// Section padding - scales with viewport
className="
  py-12         // Mobile: 48px
  sm:py-16      // Small: 64px
  md:py-20      // Medium: 80px
  lg:py-24      // Large: 96px
  xl:py-32      // XL: 128px
"
```

### Element Spacing Inside Sections
```tsx
// Between headline and content
mb-8 md:mb-12 lg:mb-16

// Between content blocks
space-y-6 md:space-y-8 lg:space-y-12

// Grid gaps
gap-6 md:gap-8 lg:gap-12
```

---

## 3. BUTTON SYSTEM

### Primary CTA Button (Gold)
```tsx
<Button className="
  // Size & Shape
  h-12 sm:h-14 md:h-[52px]
  px-8 sm:px-10 md:px-12
  rounded-full

  // Typography
  text-base sm:text-lg font-bold

  // Colors
  bg-[#FFB347] hover:bg-[#FFA500]
  text-black

  // Width Control (Mobile)
  w-[90%] max-w-[400px] sm:w-auto
  mx-auto

  // Interaction
  transition-all duration-300
  transform hover:scale-105
  active:scale-95

  // Tap area (mobile)
  min-h-[48px]
">
  Start the 3-min Quiz
</Button>
```

### Ghost/Outline Button
```tsx
<Button className="
  h-12 md:h-14
  px-6 md:px-8
  rounded-lg

  border-2 border-[#FFB347]
  text-[#FFB347]
  bg-transparent
  hover:bg-[#FFB347] hover:text-black

  transition-all duration-300

  text-sm md:text-base font-medium
">
  เพิ่มเติมเกี่ยวกับเรา
</Button>
```

### Button Container (Safe Spacing)
```tsx
// Wrapper to prevent edge collision
<div className="px-5 sm:px-6 flex justify-center">
  <Button />
</div>
```

---

## 4. GRID & LAYOUT SYSTEM

### Responsive Grid Patterns

#### Testimonials Grid (1 → 2 → 3 columns)
```tsx
<div className="
  grid
  grid-cols-1           // Mobile: Single column
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
  gap-5 md:gap-6 lg:gap-8

  px-5 sm:px-6          // Safe padding
">
  {/* Cards */}
</div>
```

#### Two-Column Split (About Section)
```tsx
<div className="
  grid
  grid-cols-1           // Mobile: Stack vertically
  lg:grid-cols-2        // Desktop: Side by side
  gap-8 lg:gap-12
  items-center          // Vertical alignment
">
  {/* Image - Order 2 on mobile, 1 on desktop */}
  <div className="order-2 lg:order-1">
    <img />
  </div>

  {/* Content - Order 1 on mobile, 2 on desktop */}
  <div className="order-1 lg:order-2">
    <Content />
  </div>
</div>
```

#### Carousel/Slider (Case Studies)
```tsx
// Container
<div className="relative max-w-6xl mx-auto px-5 sm:px-6">

  // Desktop navigation (absolute positioned)
  <div className="
    hidden lg:flex               // Hide on mobile/tablet
    absolute inset-y-0
    -left-4 xl:-left-16          // Outside container
    -right-4 xl:-right-16
  ">
    <Button />  // Left arrow
    <Button />  // Right arrow
  </div>

  // Mobile navigation (below carousel)
  <div className="flex lg:hidden justify-center gap-4 mt-6">
    <Button />
    <Button />
  </div>
</div>
```

---

## 5. COMPONENT-SPECIFIC FIXES

### 🔴 HERO SECTION - Issues & Fixes

#### Current Issues:
1. Headline too large on mobile (text-3xl = 30px, but should be 28px)
2. No max-width on headline (can break on ultra-wide)
3. Padding not using safe minimum (px-6 = 24px, should be px-5 = 20px)
4. Line breaks use `<br>` which can orphan words

#### Fixed Implementation:
```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background - unchanged */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black/90 z-10" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2664')] bg-cover bg-center" />
      </div>

      {/* Content Container - FIXED */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-6 md:px-8 py-16 sm:py-20 text-center">

        {/* Logo - FIXED sizing */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider">
            <span className="text-[#FFB347]">ORIGO</span>
          </h1>
        </div>

        {/* Badge - FIXED */}
        <div className="flex justify-center mb-4 sm:mb-6 px-5">
          <Badge className="
            px-4 sm:px-6 py-2
            bg-black/50 border-[#FFB347]
            text-white text-xs sm:text-sm font-normal
            rounded-full
            inline-flex items-center gap-2
          ">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFB347]" />
            Trade Decision System
          </Badge>
        </div>

        {/* Sub-headline - FIXED */}
        <p className="
          text-sm sm:text-base md:text-lg
          text-white/90
          mb-3 sm:mb-4
          max-w-2xl mx-auto
          px-5
        ">
          บ่อยครั้งไหม... คุณกำลัง 'ทำงานหนัก'
        </p>

        {/* Main Headline - FIXED (fluid typography) */}
        <h2 className="
          text-[26px] leading-[1.25]
          sm:text-[32px]
          md:text-[40px]
          lg:text-[48px]
          xl:text-[56px]
          font-bold text-white
          max-w-4xl mx-auto
          px-5 sm:px-6
        ">
          ยอดขายต่างประเทศ<span className="text-[#FFB347]">ยังไม่โต</span> แม้ลงทุนเพิ่ม?{" "}
          เครื่องมือมากขึ้น แต่ความชัดเจน<span className="text-[#FFB347]">น้อยลง</span>?
        </h2>
      </div>
    </section>
  );
}
```

---

### 🔴 BRIDGE CTA SECTION - Issues & Fixes

#### Current Issues:
1. Button width not controlled on mobile (can be too wide)
2. No min-height for tap area on mobile
3. Padding inconsistent with system

#### Fixed Implementation:
```tsx
export function BridgeCTASection() {
  return (
    <section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background - unchanged */}

      {/* Content - FIXED */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 text-center">

        {/* Headline - FIXED */}
        <h2 className="
          text-[32px] leading-[1.2]
          sm:text-[40px]
          md:text-[48px]
          lg:text-[56px]
          font-bold text-[#FFB347]
          mb-6 sm:mb-8 md:mb-10
        ">
          พร้อมแล้วหรือยัง
        </h2>

        {/* Subtext - FIXED */}
        <p className="
          text-base leading-[1.6]
          md:text-lg md:leading-[1.6]
          lg:text-xl lg:leading-[1.7]
          text-white
          mb-8 sm:mb-10 md:mb-12
          max-w-3xl mx-auto
        ">
          ที่จะมีเครื่องมือที่ดีกว่าเดิม เพื่อกำหนดทิศทางได้แม่นยำขึ้น
          และเพิ่มโอกาสในการปิดการขายได้มากขึ้น
        </p>

        {/* Action Text - FIXED */}
        <p className="
          text-lg leading-[1.5]
          md:text-xl md:leading-[1.5]
          lg:text-2xl lg:leading-[1.4]
          text-white
          mb-6 sm:mb-8
          max-w-2xl mx-auto
        ">
          คำถามเพียง <span className="text-[#FFB347] font-bold">3 นาที</span> ที่จะพาคุณ
          <span className="text-[#FFB347] font-bold">ออกไปจากจุดเดิม</span>
        </p>

        {/* CTA Button - FIXED */}
        <div className="mb-4 sm:mb-6 px-5 flex justify-center">
          <Link href="/quiz/1" className="w-full sm:w-auto max-w-md">
            <Button className="
              w-full sm:w-auto
              h-[52px]
              px-10 sm:px-12

              bg-[#FFB347] hover:bg-[#FFA500]
              text-black
              font-bold
              text-base sm:text-lg

              rounded-full
              transition-all duration-300
              transform hover:scale-105
              active:scale-95

              shadow-lg shadow-[#FFB347]/20
            ">
              Start the 3-min Quiz
            </Button>
          </Link>
        </div>

        {/* Footer Note - FIXED */}
        <p className="
          text-xs sm:text-sm
          text-gray-500
          max-w-xl mx-auto
        ">
          (คุณเติบโตได้มากกว่านี้ ถ้าคุณรู้ว่าควรขาย 'ที่ไหน' และ 'ให้ใคร')
        </p>
      </div>
    </section>
  );
}
```

---

### 🔴 TESTIMONIALS SECTION - Issues & Fixes

#### Current Issues:
1. Grid gap too small on mobile (gap-6 = 24px)
2. No proper stacking on mobile
3. Card padding should scale

#### Fixed Implementation:
```tsx
<section className="bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32">
  <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8">

    {/* Headline - FIXED */}
    <h2 className="
      text-2xl leading-[1.3]
      sm:text-3xl
      md:text-4xl
      font-bold text-white text-center
      mb-10 sm:mb-12 md:mb-16
    ">
      สิ่งที่ลูกค้าของเราพูด
    </h2>

    {/* Grid - FIXED */}
    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-5 sm:gap-6 md:gap-6 lg:gap-8
    ">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="
          bg-[#1a1a1a]
          border-none
          p-5 sm:p-6
          rounded-xl
          hover:bg-[#222]
          transition-colors
          flex flex-col
        ">
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {/* Stars */}
          </div>

          {/* Review - FIXED typography */}
          <p className="
            text-sm leading-[1.6]
            md:text-base md:leading-[1.6]
            text-white/90
            mb-6
            flex-1
          ">
            {testimonial.review}
          </p>

          {/* Profile - unchanged */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            {/* Avatar and info */}
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>
```

---

## 6. RESPONSIVE BREAKPOINT STRATEGY

### Tailwind Breakpoints Used
```tsx
// Mobile-first approach
Base:     0px   (mobile)
sm:       640px (large mobile / small tablet)
md:       768px (tablet)
lg:       1024px (desktop)
xl:       1280px (large desktop)
2xl:      1536px (ultra-wide)
```

### Breakpoint Decision Matrix

| Element | Mobile (0-639) | Tablet (640-1023) | Desktop (1024+) |
|---------|----------------|-------------------|-----------------|
| Hero Headline | 26-32px | 40px | 48-56px |
| Section Padding | 48-64px | 80px | 96-128px |
| Container Padding | 20px | 24px | 32-48px |
| Grid Columns | 1 | 2 | 3 |
| Button Width | 90% max | auto | auto |
| Button Height | 48-52px | 52px | 52px |

---

## 7. ACCESSIBILITY & TAP TARGETS

### Mobile Touch Targets
```tsx
// Minimum tap area: 48x48px
min-h-[48px] min-w-[48px]

// Preferred for CTAs: 52x52px
min-h-[52px]

// Button spacing (prevent accidental taps)
gap-4 sm:gap-6
```

### Focus States
```tsx
// Add to all interactive elements
focus:outline-none
focus:ring-2
focus:ring-[#FFB347]
focus:ring-offset-2
focus:ring-offset-black
```

---

## 8. PERFORMANCE OPTIMIZATION

### Image Optimization
```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="..."
  alt="..."
  width={1200}
  height={800}
  className="object-cover"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 90vw,
         1200px"
  priority={false} // Only true for above-fold images
/>
```

### Lazy Loading
```tsx
// For components below the fold
loading="lazy"
```

---

## 9. QUALITY ASSURANCE CHECKLIST

### Pre-Launch Checks
- [ ] All text has max-width containers
- [ ] No edge-to-edge text on mobile
- [ ] All buttons have min 48px tap area
- [ ] Button max-width on mobile (90% or explicit)
- [ ] Section padding scales with viewport
- [ ] Typography uses fluid sizing (clamp thinking)
- [ ] Grid collapses to single column on mobile
- [ ] Images stack above text on mobile
- [ ] No orphan words in headlines
- [ ] All interactive elements have focus states
- [ ] Safe padding on all sections (min 20px)

### Device Testing Matrix
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1280px
- [ ] Desktop 1920px
- [ ] Ultra-wide 2560px

---

## 10. IMPLEMENTATION PRIORITY

### Phase 1: Critical Fixes (Do First)
1. Fix Hero headline sizing (28px mobile → 56px desktop)
2. Add max-width to all text blocks
3. Fix button widths on mobile (90% max)
4. Update container padding (px-5 sm:px-6)
5. Fix section vertical spacing

### Phase 2: Enhancement
1. Add focus states to all buttons
2. Optimize images with Next.js Image
3. Add proper loading states
4. Implement proper touch target sizes

### Phase 3: Polish
1. Add subtle animations
2. Fine-tune spacing
3. Test on real devices
4. Optimize performance

---

## 🎨 BRAND COLORS (Reference)

```tsx
Primary Gold:     #FFB347
Secondary Gold:   #FFA500
Black BG:         #050505
Dark Gray BG:     #0F0F0F
Card BG:          #1a1a1a
White Text:       #FFFFFF
Secondary Text:   #A1A1AA
Gray Text:        #6B7280
```

---

## 📱 MOBILE-FIRST DEVELOPMENT WORKFLOW

1. Start with mobile styles (base classes)
2. Add tablet breakpoint (md:)
3. Add desktop breakpoint (lg:)
4. Test on actual devices
5. Adjust as needed

### Example:
```tsx
// ✅ CORRECT: Mobile-first
<div className="text-sm md:text-base lg:text-lg">

// ❌ WRONG: Desktop-first
<div className="text-lg md:text-base sm:text-sm">
```

---

## 🚀 READY-TO-USE UTILITY CLASSES

### Container Wrapper
```tsx
className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8"
```

### Section Spacing
```tsx
className="py-16 sm:py-20 md:py-24 lg:py-32"
```

### Fluid Headline
```tsx
className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[1.2] font-bold"
```

### Responsive Grid
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
```

### CTA Button
```tsx
className="h-12 sm:h-14 px-8 sm:px-12 bg-[#FFB347] hover:bg-[#FFA500] text-black font-bold rounded-full transition-all w-full sm:w-auto max-w-md"
```

---

**END OF DESIGN SYSTEM**

*This document serves as the single source of truth for all responsive design decisions.
Follow these patterns consistently across all components for a predictable, stable layout.*
