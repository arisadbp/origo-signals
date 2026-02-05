# ORIGO Design System - Quick Reference Card

## 🎯 Core Principles
1. **Mobile-First**: Base styles = mobile, enhance for desktop
2. **Max-Width Everything**: All text blocks need max-width
3. **Safe Padding**: Minimum 20px (px-5) on mobile
4. **Fluid Typography**: Scale smoothly across breakpoints
5. **No Edge Bleeding**: Never allow text to touch screen edges

---

## 📏 Essential Patterns (Copy-Paste Ready)

### Container Wrapper
```tsx
className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8"
```

### Section Spacing
```tsx
className="py-16 sm:py-20 md:py-24 lg:py-32"
```

### Main Headline (Hero)
```tsx
className="
  text-[26px] leading-[1.25]
  sm:text-[32px]
  md:text-[40px]
  lg:text-[48px]
  xl:text-[56px]
  font-bold text-white
  max-w-4xl mx-auto px-5 sm:px-6
"
```

### Section Headline
```tsx
className="
  text-2xl sm:text-3xl md:text-4xl
  font-bold text-white
  max-w-4xl mx-auto px-5 sm:px-6
"
```

### Body Text
```tsx
className="
  text-sm md:text-base lg:text-lg
  leading-[1.6] md:leading-[1.6] lg:leading-[1.7]
  text-white/90
  max-w-3xl mx-auto px-5 sm:px-6
"
```

### Primary CTA Button
```tsx
<Button className="
  h-12 sm:h-14
  px-8 sm:px-12
  bg-[#FFB347] hover:bg-[#FFA500]
  text-black font-bold
  text-base sm:text-lg
  rounded-full
  transition-all duration-300
  transform hover:scale-105
  w-full sm:w-auto max-w-md
">
  Start the 3-min Quiz
</Button>
```

### Ghost Button
```tsx
<Button className="
  h-12 md:h-14
  px-6 md:px-8
  border-2 border-[#FFB347]
  text-[#FFB347]
  bg-transparent
  hover:bg-[#FFB347] hover:text-black
  rounded-lg
  text-sm md:text-base
">
  เพิ่มเติมเกี่ยวกับเรา
</Button>
```

### Responsive Grid (1→2→3 cols)
```tsx
className="
  grid
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-5 sm:gap-6 lg:gap-8
"
```

### Two-Column Split
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
  <div className="order-2 lg:order-1">{/* Image */}</div>
  <div className="order-1 lg:order-2">{/* Content */}</div>
</div>
```

---

## 🎨 Color Palette

```tsx
// Primary
bg-[#FFB347]      // Gold
hover:bg-[#FFA500] // Darker gold

// Backgrounds
bg-[#050505]      // Almost black
bg-[#0F0F0F]      // Dark gray
bg-[#1a1a1a]      // Card background

// Text
text-white        // Primary text
text-white/90     // Body text
text-white/80     // Muted text
text-gray-400     // Secondary
text-gray-500     // Tertiary
```

---

## 📱 Breakpoints

```tsx
Base:  0px    (mobile)
sm:    640px  (large mobile)
md:    768px  (tablet)
lg:    1024px (desktop)
xl:    1280px (large desktop)
```

---

## ⚡ Typography Scale

```tsx
// Headings (Mobile → Desktop)
H1: text-[26px] → xl:text-[56px]
H2: text-2xl → md:text-4xl
H3: text-xl → md:text-2xl
H4: text-lg → md:text-xl

// Body
text-sm → md:text-base → lg:text-lg

// Small
text-xs → sm:text-sm
```

---

## 📐 Spacing Scale

```tsx
// Gaps
gap-5 sm:gap-6 lg:gap-8

// Margins (bottom)
mb-6 sm:mb-8 md:mb-10 lg:mb-12

// Padding (vertical)
py-16 sm:py-20 md:py-24 lg:py-32

// Padding (horizontal)
px-5 sm:px-6 md:px-8 lg:px-12
```

---

## ✅ Pre-Flight Checklist

Before committing code, verify:
- [ ] All text has `max-w-*` and `mx-auto`
- [ ] All containers have `px-5 sm:px-6` minimum
- [ ] All buttons have `h-12` minimum (48px tap area)
- [ ] Mobile buttons have `w-full sm:w-auto max-w-md`
- [ ] Grids use `grid-cols-1` base
- [ ] Typography scales from mobile to desktop
- [ ] No text touches screen edges

---

## 🚫 Common Mistakes to Avoid

```tsx
// ❌ BAD: No max-width
<h1 className="text-4xl">Heading</h1>

// ✅ GOOD: With max-width
<h1 className="text-4xl max-w-4xl mx-auto px-5">Heading</h1>

// ❌ BAD: Desktop-first
<div className="text-lg md:text-sm">

// ✅ GOOD: Mobile-first
<div className="text-sm md:text-lg">

// ❌ BAD: No safe padding
<div className="max-w-7xl mx-auto">

// ✅ GOOD: With safe padding
<div className="max-w-7xl mx-auto px-5 sm:px-6">

// ❌ BAD: Fixed width on mobile
<button className="w-[400px]">

// ✅ GOOD: Responsive width
<button className="w-full sm:w-auto max-w-md">
```

---

## 🎯 Component Audit Quick Check

### Hero Section
- [ ] Headline: 26px mobile → 56px desktop
- [ ] Max-width: 4xl
- [ ] Safe padding: px-5 sm:px-6
- [ ] Badge: responsive sizing

### Bridge CTA
- [ ] Button: w-full sm:w-auto
- [ ] Button height: 52px
- [ ] Text max-width: 3xl
- [ ] Section padding: py-16 → py-32

### Testimonials
- [ ] Grid: 1 → 2 → 3 cols
- [ ] Gap: gap-5 sm:gap-6 lg:gap-8
- [ ] Card padding: p-5 sm:p-6
- [ ] Text: text-sm md:text-base

### About Stats
- [ ] Two-column with order swap
- [ ] Image stacks above on mobile
- [ ] Stats vertical bar visible
- [ ] Button responsive

### Final CTA
- [ ] Card max-width: 4xl
- [ ] Center alignment
- [ ] Button responsive width
- [ ] Footer centered

---

## 🛠️ Development Workflow

1. **Start Mobile** (0-639px)
   - Write base classes
   - Test on iPhone SE (375px)

2. **Add Tablet** (640-1023px)
   - Add `sm:` and `md:` prefixes
   - Test on iPad (768px)

3. **Add Desktop** (1024px+)
   - Add `lg:` and `xl:` prefixes
   - Test on 1280px and 1920px

4. **Fine-tune**
   - Test all breakpoints
   - Check tap targets (min 48px)
   - Verify no edge collisions

---

**Keep this reference card open while coding!**
