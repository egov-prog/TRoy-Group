# Skill: TRoyGo™ AI Trip Planner — Live Chat Widget
**Saved:** 2026-04-03
**Category:** AI / Frontend / Travel / Claude API

---

## Overview
Fully functional AI-powered trip planning chat interface for TRoyGo™.
Uses Claude API (`claude-sonnet-4-20250514`) + `web_search_20250305` tool for live internet search.

---

## Files
| File | Location | Purpose |
|------|----------|---------|
| `troygо-ai-trip-planner.html` | `/TRoyGo/Website/` on GitHub | Standalone full-page chat app |
| Floating widget (inline embed) | Inside TRoyGo homepage | Embedded floating chat button |

---

## API Call Pattern
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    messages: conversationHistory  // full history each call
  })
});
```

## System Prompt Key Points
- Identity: TRoyGo™ AI Trip Planner, part of TRoy Group™
- Tagline: "Your World. Your Way. TRoyGo™"
- Covers: hotels, flights, itineraries, cruises, visa, restaurants, budget, transfers
- Always use web search for prices, availability, visa requirements
- Format: **bold** names/prices, ### headers, bullet lists
- Base: Darwin, NT, Australia — global audience

---

## UI Components
- Sidebar: logo, New Trip button, recent chats list, powered-by footer
- Header: AI avatar, online status with pulse dot, share + download buttons
- Messages: user bubbles (green), AI bubbles (dark surface), welcome screen with chips
- Search indicator: spinner + "Searching the web..." during API call
- Input bar: textarea (auto-resize), mic icon, send button
- Suggestion chips: 6 quick-start prompts + 4 topic buttons
- Download: exports chat as `.txt` file

---

## Colour Palette
```css
--green:      #2ECC71   /* Primary — TRoyGo brand */
--green-dark: #27AE60
--green-light:#A8F0C6
--bg:         #070d09   /* Deepest background */
--surface:    #0d1f12
--surface2:   #122018
--surface3:   #1a2e20
--border:     rgba(46,204,113,0.15)
--muted:      #7a9e84
```

---

## Floating Widget Embed (for homepage)
Add this at the bottom of any TRoyGo™ page:
```html
<!-- TRoyGo AI Trip Planner Float Button -->
<div id="troy-chat-float">
  <button id="troy-fab" onclick="toggleTroyChat()">✦ Plan My Trip</button>
  <div id="troy-chat-panel">
    <iframe src="troygо-ai-trip-planner.html" frameborder="0"></iframe>
  </div>
</div>
```

---

## Conversation History Pattern
- Keep full `conversationHistory` array in JS state
- Push `{role:'user', content: text}` before API call
- Push `{role:'assistant', content: aiText}` after response
- Send entire array each call (Claude has no memory between calls)
- `newChat()` resets array to `[]`

---

## Markdown → HTML Formatter
Converts API response markdown to styled HTML:
- `### heading` → `<h3>`
- `**bold**` → `<strong>` (coloured green-light)
- `- item` → `<li>` wrapped in `<ul>`
- `[text](url)` → `<a href>` with green styling
- `---` → `<hr>`
- Double newlines → `<p>` paragraphs

---

## Default Suggestion Chips
```
🏨 Budget hotels in Santorini
🚢 Best cruise routes Mediterranean
🕌 Quiet stays Turkish Aegean walkable
🏝️ Maldives resorts under $300/night
✈️ Flights Darwin to Istanbul cheapest
📄 Visa requirements Turkey for Australians
```

---

## Integration with TRoyGo™ Homepage
- "AI Trip Creator" button in hero section → opens full planner page
- Floating chat bubble (bottom-right) → opens iframe panel
- Standalone URL: `/TRoyGo/Website/troygо-ai-trip-planner.html`
