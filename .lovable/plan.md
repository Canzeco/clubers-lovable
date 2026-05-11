## Update tier rules

Drop the sex/female condition entirely — followers count is the only signal.

### New thresholds
- **Bronze** — Everyone (sign up & go)
- **Silver** — 1,000+ Instagram followers
- **Gold** — 10,000+ Instagram followers
- **Diamond** — Invitation only (curated manual list)

### Changes in `src/components/emulators/GuestApp.tsx`
Inside the **Profile → General** view, in the Tier Ladder block:
- **Silver row**: replace `"Female · or 1k+ IG followers"` with `"1k+ Instagram followers"`.
- **Gold row**: replace `"5k+ Instagram followers"` with `"10k+ Instagram followers"`.
- **Bronze** and **Diamond** rows: unchanged.
- Footer helper text under the ladder: replace the existing line with:
  *"Silver and Gold are auto-assigned from your Instagram follower count. Diamond is a curated, invite-only list."*

No other files affected. No logic / business rules to change beyond copy in the ladder.