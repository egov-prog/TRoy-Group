# Skill: TRoyGo™ Travel Platform UI
**Saved:** 2026-04-02
**Category:** Frontend / Travel Platform

---

## Platform Overview
TRoyGo™ is the travel division of TRoy Group™. It is a Booking.com-style OTA (online travel agency) with AI-powered trip planning.

## Search Tabs (6 total)
1. 🏨 Stays
2. ✈️ Flights
3. 🚢 Cruises
4. 🗺️ Tours
5. 🚖 Airport Transfers
6. 📄 Visa Help

## Hero Search Box Pattern
```html
<div class="search-box"> <!-- gold border, dark glass background -->
  <div class="tabs">     <!-- tab row: active = gold fill -->
  <div class="search-row"> <!-- fields + search button -->
    <div class="search-field">   <!-- Destination -->
    <div class="search-field">   <!-- Check In -->
    <div class="search-field">   <!-- Check Out -->
    <div class="search-field">   <!-- Guests -->
    <button class="search-btn">  <!-- gold CTA -->
```

## Destination Card Pattern
- Grid: `repeat(auto-fit, minmax(200px, 1fr))`
- Height: 240px, `border-radius: 14px`, overflow hidden
- Layers: `.bg` (emoji + gradient) → `.overlay` (bottom-fade) → `.dest-info`
- Overlay: `linear-gradient(to top, rgba(10,22,40,0.92) 0%, transparent 100%)`
- Tag badge: top-right, gold fill

## Hotel Card Pattern
- `background: var(--navy-mid)`, `border: 1px solid rgba(255,255,255,0.07)`
- Image area: 170px height with gradient background + badge
- Body: name (Playfair Display), location, stars (gold ★), footer with price + button
- Price display: `font-size: 20px; font-weight: 700; color: var(--gold)`

## Destination Color Themes
```css
.bg-santorini { background: linear-gradient(135deg, #1a3a5c, #2d6a8a) }
.bg-bali      { background: linear-gradient(135deg, #1a4a2a, #2d7a4a) }
.bg-istanbul  { background: linear-gradient(135deg, #4a1a1a, #8a2d2d) }
.bg-maldives  { background: linear-gradient(135deg, #1a3a5c, #1a6080) }
.bg-kyoto     { background: linear-gradient(135deg, #3a2a4a, #6a4a8a) }
```

## AI Trip Creator Strip
```html
<div class="ai-strip"> <!-- gold border, subtle gold tint background -->
  <div class="ai-icon">🤖</div>
  <div class="ai-text">  <!-- heading + description -->
  <button class="ai-btn">Plan My Trip ✦</button>
</div>
```

## Social Media Presence
- YouTube: @TRoyGo-tm
- Facebook: @TRoyTravelAgency (90+ followers)
- Instagram: @troytravelagency (110+ followers)
- LinkedIn, Pinterest, Google Business Profile active
- TripAdvisor: @TRoyTravelAgencyTM (account created, 0 contributions)

## Monetisation
- Booking.com Affiliate Programme via CJ Publisher — application in progress
- AI Trip Creator: Claude API-powered widget
- PDF trip plan download feature

## Key Features Built
- 7-tab search interface
- Destination cards with hover animations
- Hotel listings with pricing
- AI Trip Creator chat demo widget
- Embeddable floating chat widget
- Standalone Trip Planner page
- 17-second YouTube promo animation
