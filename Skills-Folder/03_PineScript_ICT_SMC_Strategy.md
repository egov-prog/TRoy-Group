# Skill: Pine Script Trading Strategy — ICT/SMC + Ichimoku
**Saved:** 2026-04-02
**Category:** Trading / TradingView / Pine Script

---

## Active Strategy
**Name:** "S&R + ICT/SMC Sonnet 4.6 Adaptive ML Strategy v2.2"
**Short title:** "S&R+ICT Sonnet 4.6 ML v2.2 ☼☾"
**Copyright:** © troias
**Version:** Pine Script v6
**Saved:** 2026-03-23

---

## Core Components
| Component | Description |
|-----------|-------------|
| S&R | Support & Resistance zones |
| Order Blocks (OBs) | ICT/SMC — off by default visually |
| Fair Value Gaps (FVGs) | ICT/SMC — off by default |
| BOS | Break of Structure |
| CHoCH | Change of Character |
| Liquidity Sweeps | ICT concept |
| Kill Zones | ICT session timing |
| Adaptive ML Engine | Machine learning signal filter |
| HTF Bias | 4H SMA 50 for trend direction |
| PDH/PDL | Previous Day High/Low sweep confirmation |
| Loss Streak Kill Switch | Auto-disables after consecutive losses |
| Dual TP | 50% partial exit at TP1, remainder at TP2 |
| Power of 3 labels | Off by default |

---

## Visual Color Palette
```pine
color_long    = #00E676   // Bright green — long signals
color_short   = #FF1744   // Bright red — short signals
color_info    = #00E5FF   // Cyan — info labels
color_accent1 = #76FF03   // Lime — secondary longs
color_accent2 = #E040FB   // Purple — ML signals
color_accent3 = #FF6B35   // Orange — alerts/sweeps
```
Dashboard background: dark navy
OBs, FVGs, Power of 3 labels: **off by default**

---

## Key Rules Learned
- Ertan prefers **full rewritten code** after each fix — no partial snippets
- Chart layouts must keep price bars clearly readable with proper price scale
- "c dgrt" was removed in v2.2 — do not re-add
- Always test on USDJPY 15m as baseline

---

## Ichimoku/Hosoda Unified Strategy
- Built separately in Pine Script v6
- Incorporates Price/Wave/Time theory
- ATR-based Stop Loss
- Dual TP exits (same as main strategy)
- Hosoda Time Theory cycles
- Tested successfully on USDJPY 15m

---

## Methodologies Used
- **ICT (Inner Circle Trader):** Order Blocks, FVGs, Kill Zones, Liquidity, PDH/PDL
- **SMC (Smart Money Concepts):** BOS, CHoCH, OB validation
- **Ichimoku Kinko Hyo:** Cloud, Tenkan/Kijun, Chikou
- **Hosoda Time Theory:** N, V, E, NT wave targets + time cycles
- **Adaptive ML:** Dynamic threshold learning from recent bar data

---

## Ertan's Trading Preferences
- Platforms: TradingView
- Primary pairs: USDJPY (confirmed), others likely forex/crypto
- Style: ICT/SMC + Ichimoku hybrid
- Approach: Algorithmic, iterative strategy development
