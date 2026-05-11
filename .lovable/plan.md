## Goal

Simplify the coupon cards in the **Coupon Wallet** (the list preview in `WalletView`) so each card only shows, in small, pretty type:

`Name · Category · Distance · Cost ($ signs) · Mesita reviews · Google reviews · Cashback`

Strip out: the "Rooftop · weekends · …" note line, the AI-calling / Reserved pills, expiry text, and the QR thumbnail box. Same theme colors (tier-gold/silver/bronze stub, secondary teal accents, muted-foreground for meta).

## Data shape

Extend the `unused` and `used` arrays in `WalletView` with the missing fields:

```
{ name: "Casa Luminar", category: "Rooftop", distance: "0.4 km",
  cost: 3,                 // 1–4 → renders as $, $$, $$$, $$$$
  mesita: 4.8,             // Mesita rating
  google: 4.6,             // Google rating
  cb: 20, color: "tier-gold", ... }
```

Pick sensible categories/costs/ratings per venue (Casa Luminar = Rooftop $$$, Loto Café = Café $$, Neón Bar = Cocktails $$$, Mar Verde = Seafood $$$$).

## Card layout (both unused and used)

```
┌────┬─────────────────────────────────────┐
│20% │ Casa Luminar                        │
│ CB │ Rooftop · 0.4 km · $$$              │
│    │ ★ 4.8 Mesita   G 4.6 Google         │
└────┴─────────────────────────────────────┘
```

- Left tier stub: unchanged (cashback % on gold/silver/bronze).
- Right side, three lines, all small:
  1. **Name** — `font-display text-sm font-semibold`.
  2. **Meta row** — `text-[10px] text-muted-foreground`, dot-separated: category · distance · cost.
  3. **Ratings row** — `text-[10px]`: `★ {mesita} Mesita` in `text-secondary` (peacock), then `text-muted-foreground` divider, then a small "G" mark + `{google} Google` in `text-muted-foreground`.
- Cashback amount: keep the big % on the left stub; remove the duplicate text elsewhere.

## What gets removed

- Pending / Reserved / "AI calling…" pills.
- Expiry / "Expires tomorrow" / "+Story bonus" text.
- QR thumbnail square on the right.
- For used cards: replace the "Redeemed · date / Saved $X" block with the same name + meta + ratings, dimmed (keep the grayscale stub + check overlay so used state is still readable). The detail sheet (`CouponDetailSheet`) is unchanged and still owns the redeem flow, savings, dates, etc.

## Styling

- Reuse existing tokens only: `text-muted-foreground`, `text-secondary`, `text-foreground`, `border-border`, `bg-card-soft`, `bg-tier-*`. No new colors.
- Star icon: existing lucide `Star` (already imported) for Mesita rating.
- Google: a small `G` glyph in a rounded `bg-muted` chip, or the existing `BadgeCheck` icon — go with a tiny `G` letterform in a circle to keep it neutral.
- Tighten vertical padding to keep cards compact.

## Files

- `src/components/emulators/GuestApp.tsx` — only `WalletView` (lines ~1179–1300). No other components touched.

## Out of scope

- Discover/swipe card.
- `CouponDetailSheet` and `RedeemFlow`.
- Any backend / data layer.
