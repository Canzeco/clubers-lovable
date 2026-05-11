## Goal

Rebuild the Share tab in `GuestApp.tsx` so the entire screen fits within the phone frame (no scrolling above the bottom nav), and replace the list-heavy layout with richer graphics.

Picking the **Premium Ticket Hero** direction — it puts the 8-character code on a real "gift card" graphic (with ticket perforations and a stacked-fan effect), reduces the 5 claim rows into a compact 5-slot avatar row, and ends with a single bold Share CTA. Best fit for the existing peacock + cream + gold palette.

## Layout (top → bottom)

```
┌────────────────────────────────────┐
│ Gift Cards            [GOLD chip]  │
│ Share the experience…              │
├────────────────────────────────────┤
│   ╭──────── HERO CARD ─────────╮   │
│   │ GIFT CARD          $100MXN│   │  ← peacock card,
│   │                            │   │    perforated edges,
│   │ INVITE CODE                │   │    stacked behind
│   │ 8F2K-9XQ7        [copy]   │   │
│   ╰────────────────────────────╯   │
├────────────────────────────────────┤
│ AVAILABILITY          3 of 5 left  │
│ [CV] [MF] [+] [+] [+]              │  ← 5 slots, claimed
│ Camila Mateo Open Open Open        │     show initials,
│ May 2  May 5                       │     open = dashed
├────────────────────────────────────┤
│ [        Share Gift Code  →      ] │
└────────────────────────────────────┘
```

## Changes in `ShareView` (src/components/emulators/GuestApp.tsx)

1. **Remove the vertical list** of 5 full-width claim rows and the separate code button — replace with the hero ticket card + 5-slot avatar grid.
2. **Hero gift card visual**:
   - Peacock teal background (`bg-secondary` / existing peacock token) with two ghosted cards behind it (rotated -3°/-6°) for the "stack of 5" feel.
   - Two circular cutouts (cream-colored) on the left/right edges for the ticket-perforation look.
   - Top-right: `$100 MXN` in display font.
   - Bottom: small "INVITE CODE" label + `8F2K-9XQ7` in mono, with a copy icon button.
   - Subtle radial pattern overlay for texture.
3. **Availability strip**: 5 equal columns. Claimed slots show initials chip (CV, MF) with a small green check + name + date underneath. Empty slots are dashed-border tiles with a `+` icon labeled "Open" (subtle opacity falloff for last two).
4. **Primary CTA**: Single dark pill button "Share Gift Code" that opens the existing share sheet (WhatsApp / Instagram / copy code) — sheet content unchanged.
5. **Fit-to-screen**: container becomes `h-full flex flex-col` with `overflow-hidden`, sections sized with `flex-1` / fixed paddings so everything lands above the bottom nav at standard mobile heights (375–414 wide, 667+ tall). Drop the long intro paragraph and the "A gift from you…" footer line; keep one short subtitle under the title.

## Tokens / styling

- Hero card uses peacock/secondary token; gold chip stays as-is.
- Background stays cream (`bg-background`).
- All colors via existing semantic tokens — no new globals.
- Copy/share behaviors and the share sheet remain identical (no business logic changes).

## Out of scope

- No backend / data changes.
- No new routes or icons beyond what's already imported (`Gift`, `Copy`, `Check`, `Share2`, `MessageCircle`, `Instagram`).
- Other tabs untouched.
