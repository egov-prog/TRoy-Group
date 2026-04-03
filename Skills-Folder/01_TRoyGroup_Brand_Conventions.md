# Skill: TRoy Group™ Brand & Design Conventions
**Saved:** 2026-04-02
**Category:** Branding / Identity

---

## Brand Name Rules
- Always written as **TRoy** — capital T, capital R, lowercase "oy"
- Always followed by ™ symbol in headings, logos, documents, websites
- Three divisions: **TRoy Maritime Agency™**, **TRoyGo™** (travel), **TRoy Trading Agency™**
- TRoyGo™ tagline: *"Your World. Your Way. TRoyGo™"*
- Group contact: `groupoftroy@gmail.com`
- Division emails: `troymaritimeagency@gmail.com`, `troytravelagency@gmail.com`, `troytradingagency@gmail.com`
- GitHub: username `egov-prog`, repo `TRoy-Group`
- WhatsApp +61 476 496 693 — linked but NEVER displayed publicly

---

## Design System (Dark Elegant Theme)
```css
--gold:       #C9A84C   /* Primary accent — logos, headings, CTAs */
--gold-light: #E8C97A   /* Hover states */
--navy:       #0A1628   /* Deepest background */
--navy-mid:   #112240   /* Card backgrounds */
--navy-soft:  #1A2F50   /* Elevated surfaces */
--cream:      #F5F0E8   /* Light text on dark */
--text-muted: #8A9BB5   /* Secondary text */
```

## Typography
- **Display/Headers:** `Playfair Display` (serif, weight 400/700)
- **Body/UI:** `DM Sans` (weight 300/400/500)
- Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

## Key UI Patterns
- Sticky nav: `rgba(10,22,40,0.95)` + `backdrop-filter: blur(12px)` + gold bottom border
- Gold badge pill: `background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); color: #C9A84C`
- Cards: `border: 1px solid rgba(255,255,255,0.07)` on navy-mid background
- Card hover: `border-color: rgba(201,168,76,0.3); transform: translateY(-3px)`
- CTA buttons: `background: var(--gold); color: var(--navy)` — gold fill, navy text
- Outline buttons: `border: 1px solid rgba(201,168,76,0.4); color: var(--gold)` → hover fills gold
- Grid pattern texture: `opacity: 0.04` gold lines repeating every 60px
- Hero glow: `radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)`

---

## File/Folder Conventions
```
TRoy-Group/
├── TRoy-Maritime-Agency/
│   ├── Website/
│   ├── Tools/
│   ├── Documents/
│   └── Logos/
├── TRoyGo/
│   ├── Website/
│   └── Tools/
└── TRoy-Trading-Agency/
    └── Website/
```

## GitHub Pages
- Live URL: `https://egov-prog.github.io/TRoy-Group/`
- Main homepage: `troy-group-main.html`
- File paths must be relative, not absolute

---

## Key Business Facts
- 100% online, international (not Darwin-based)
- Founder: Ertan — 30+ years maritime experience
- Turkish Straits specialist (Çanakkale/Dardanelles, Bosphorus)
- Darwin, NT, Australia base but global operations
- Planned domain: `troymaritimeagency.com` (not yet registered)
- Banking: ANZ or Westpac + Wise Business for international payments
