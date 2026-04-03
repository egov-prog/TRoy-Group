# Skill: Dark Luxury Frontend Design Patterns
**Saved:** 2026-04-02
**Category:** Frontend / CSS / UI Design

---

## Core Philosophy
Dark elegant theme: navy backgrounds, gold accents, serif display fonts, glassmorphism overlays, subtle gold grid textures.

---

## Reusable CSS Template
```css
:root {
  --gold:       #C9A84C;
  --gold-light: #E8C97A;
  --navy:       #0A1628;
  --navy-mid:   #112240;
  --navy-soft:  #1A2F50;
  --cream:      #F5F0E8;
  --text-muted: #8A9BB5;
}
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--navy);
  color: #ffffff;
  overflow-x: hidden;
}
```

---

## Glassmorphism Nav
```css
nav {
  background: rgba(10,22,40,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(201,168,76,0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

## Gold Grid Background Texture
```css
.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 59px,
      rgba(201,168,76,1) 59px, rgba(201,168,76,1) 60px),
    repeating-linear-gradient(90deg, transparent, transparent 59px,
      rgba(201,168,76,1) 59px, rgba(201,168,76,1) 60px);
}
```

## Radial Hero Glow
```css
.hero-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse,
    rgba(201,168,76,0.08) 0%, transparent 70%);
}
```

## Badge Pill (Gold)
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.3);
  color: #C9A84C;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
```

## Card (Dark)
```css
.card {
  background: var(--navy-mid);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.card:hover {
  border-color: rgba(201,168,76,0.3);
  transform: translateY(-3px);
}
```

## CTA Button (Gold Fill)
```css
.btn-gold {
  background: var(--gold);
  color: var(--navy);
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-gold:hover { background: var(--gold-light); }
```

## Outline Button (Gold Border)
```css
.btn-outline {
  background: transparent;
  border: 1px solid rgba(201,168,76,0.4);
  color: var(--gold);
  padding: 8px 18px;
  border-radius: 8px;
  transition: all 0.2s;
}
.btn-outline:hover {
  background: var(--gold);
  color: var(--navy);
}
```

## Fade-Up Animation
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate { animation: fadeUp 0.8s ease forwards; }
```

---

## Destination Card Pattern (Image-less)
```css
.dest-card {
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  height: 240px;
  transition: transform 0.3s;
}
.dest-card:hover { transform: translateY(-4px); }
.overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top,
    rgba(10,22,40,0.92) 0%,
    rgba(10,22,40,0.3) 60%,
    transparent 100%);
}
```

---

## Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## Notes
- Always use `position: relative` on hero containers with absolute children
- `backdrop-filter: blur()` requires a non-transparent background to work
- Tab active state: gold fill + navy text; inactive: muted text, hover gold tint
- Search field label: `font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: gold`
