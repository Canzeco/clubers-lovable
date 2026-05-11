## Trim bottom nav to 3 items + fold Wallet into Profile

### New bottom nav
`Discover · Coupons · Profile` — three items only. Remove Share and Wallet from the tab bar.

### Changes in `src/components/emulators/GuestApp.tsx`

1. **Bottom nav array** (`GuestApp` component): keep only Discover, Coupons, Profile. Remove the `share` and `wallet` entries. Drop the share onClick branch.

2. **Tab type & routing**: update the `Tab` union to `"discover" | "coupons" | "profile"`. Remove the `tab === "wallet"` render branch.

3. **Profile view (`ProfileView`)**: surface the wallet at the top.
   - Add a "Balance" card showing the current credit total and a primary "Top up" / "Withdraw" action row (taken from `CreditsView`).
   - Below the balance, render the full `CreditsView` content (transactions / history) inline so nothing is lost.
   - Order inside Profile: Header → Balance card → Wallet history → existing Tier ladder / general profile sections.

4. **Cleanup**: keep `CreditsView` exported/usable; just call it from inside `ProfileView`. No other files affected.

### Out of scope
- No changes to Discover or Coupons.
- Share button is fully removed from the menu (it can be reintroduced later on the venue detail sheet if needed).
