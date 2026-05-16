## Goal

No hardcoded business data in the client. Every list (venues, promos, units, sourcing pipeline, dashboard stats, etc.) is stored in Supabase and read at runtime, even when the rows are seed/fake data for the demo.

## Scope

Three emulators currently ship inline arrays:

- `ManagerWeb.tsx` — `UNITS`, dashboard stats, promos, analytics, wallet, team, FAQs.
- `AdminWeb.tsx` — sourcing stages, pipeline venues, bots, stack, portfolio, discover, promos, metrics, trust signals.
- `GuestApp.tsx` — discover venues, coupons, reservations, friends, transactions.

All of it goes into Supabase.

## Tables (new, all public-readable for the demo, write-gated)

```text
venues          one row per place (admin + guest + manager all read this)
venue_units     manager-side units (the dropdown in ManagerWeb)
promos          cashback campaigns (manager + guest)
coupons         per-user coupons (guest)
reservations    guest reservations
pipeline_stages admin sourcing pipeline columns
pipeline_items  rows inside each stage
bots            admin bots tab
stack_services  admin stack tab
metrics_kpis    admin metrics + manager dashboard stats
trust_flags     admin trust & safety
faqs            manager help center
```

Each table: `id uuid pk`, domain columns, `created_at`. RLS on; SELECT open to `anon`+`authenticated` for the demo, INSERT/UPDATE/DELETE only for users with the `admin` role (via `user_roles` + `has_role`).

`user_roles` + `app_role` enum + `has_role()` SECURITY DEFINER function go in this migration too (per the user-roles rule). Admin role gets seeded manually later via the SQL editor; not part of this pass.

## Seed

The migration seeds every table from the current hardcoded arrays so the UI looks identical on first load. No client-side fallback arrays remain.

## Server access

- Public reads use the browser supabase client directly (RLS-open SELECT). Simple, no server fn needed.
- Admin writes (later) will go through `createServerFn` + `requireSupabaseAuth` + admin role check.

## Client changes

For each emulator:

1. Replace inline `const UNITS = [...]` / `const stages = [...]` / etc. with a `useQuery` (react-query) hook that calls `supabase.from('<table>').select()`.
2. Render skeletons while loading.
3. Delete every hardcoded array and helper that fed those arrays.

The previously-added `venue_create` button in AdminWeb stays as a no-op for now; wiring it to an insert is a follow-up.

## What I'm doing now

1. Write one big migration: tables + RLS + `user_roles` + `has_role` + seeds.
2. After you approve, rewrite `ManagerWeb`, `AdminWeb`, and `GuestApp` to read from Supabase using react-query + the browser client.
3. Show skeletons during load and an inline error state on failure.

## Out of scope (next round)

- Admin auth gate + role assignment UI.
- Mutations (create/edit/delete venues, promos, etc.) — only reads in this pass.
- Real sourcing pipeline (Firecrawl / Places) — separate task.
- Per-user guest coupons writing back to DB on redeem.
