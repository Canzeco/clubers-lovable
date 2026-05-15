## Goal

Make Web-Listed venues sourcing functional in AdminWeb, backed by a real database. Mesita team logs in, runs a sourcing job for a city, and the catalog fills with auto-enriched venue profiles pulled from Google Places + Firecrawl + AI.

## Scope (v1)

- Backend: Lovable Cloud (Supabase) — `venues`, `cities`, `sourcing_jobs`, `user_roles` tables with RLS.
- Auth: email/password for Mesita admins, gated by an `admin` role.
- AdminWeb venues section becomes functional: list, filter by city/status/type, view detail, edit, delete, manual add.
- Sourcing pipeline: pick a city → Google Places nearby search seeds rows as `web_listed` → background enrichment via Firecrawl + Lovable AI fills socials, vibe tags, hours, photos, mentions.
- Sourcing jobs visible in admin with status (queued / running / done / failed), counts, and per-venue logs.
- GuestApp / ManagerWeb stay on mock data for now.

## Stack pieces

- Lovable Cloud for DB, auth, and storage.
- Firecrawl connector (search + scrape) for venue websites, IG/FB/TikTok pages, press, Reddit threads.
- Google Places API (Places API New) — requires `GOOGLE_PLACES_API_KEY` secret from you.
- Lovable AI Gateway (`google/gemini-2.5-flash`) to turn raw scraped content into a structured venue profile.

## Schema

```text
cities
  id uuid pk, name text, country text, lat numeric, lng numeric,
  is_live boolean default false, created_at

venues
  id uuid pk
  city_id uuid fk → cities
  name text, slug text unique
  type text  -- restaurant | cafe | bar | nightlife | other
  status text  -- web_listed | verified_partner
  google_place_id text unique
  address text, lat numeric, lng numeric, neighborhood text
  phone text, website text
  instagram text, facebook text, tiktok text
  cuisine text[], price_tier int, vibe_tags text[]
  hours jsonb, photos text[], cover_image text
  rating_google numeric, rating_count int
  mentions jsonb  -- press / reddit / blogs
  enrichment jsonb  -- raw signals, last sources, scores
  enriched_at timestamptz, created_at, updated_at

sourcing_jobs
  id uuid pk, city_id uuid fk, kind text, status text,
  stats jsonb  -- {seeded, enriched, failed}
  error text, created_by uuid, created_at, finished_at

user_roles  (separate table per security rule)
  id uuid pk, user_id uuid fk → auth.users, role app_role
```

RLS: only users with `has_role(auth.uid(), 'admin')` can read/write `venues`, `cities`, `sourcing_jobs`. `user_roles` self-readable; admin-only writable.

## Server functions (TanStack `createServerFn`)

- `listVenues({ cityId?, status?, type?, q?, page })` — admin-gated.
- `getVenue({ id })`, `updateVenue({ id, patch })`, `deleteVenue({ id })`, `createVenue(...)`.
- `listCities()`, `createCity({ name, country, lat, lng })`.
- `runSourcingJob({ cityId, radiusMeters, types })` — creates job row, calls Google Places nearby search via REST, upserts venues with status `web_listed`, then kicks enrichment loop (sequential, capped) using Firecrawl + Lovable AI; updates `stats` as it goes.
- `enrichVenue({ id })` — manual re-enrich for a single venue.
- `listSourcingJobs()` / `getSourcingJob({ id })`.

All gated by `requireSupabaseAuth` + admin role check inside handler.

## AdminWeb UI

- New `/admin/login` route (email/password); protected layout for the rest of admin.
- Replace existing static "Venues" tab in `AdminWeb.tsx` with:
  - city selector + filters + search
  - paginated venues table (name, status, type, IG, rating, last enriched)
  - row → venue detail drawer with all enriched fields, edit + re-enrich buttons
  - "Source venues" button → modal to pick city + radius → fires `runSourcingJob`
  - Sourcing jobs panel showing recent jobs and live progress

## Secrets needed

- Lovable Cloud — enabled by me.
- Firecrawl — connected via connector picker.
- `GOOGLE_PLACES_API_KEY` — added via secrets prompt; you create it in Google Cloud Console (enable "Places API (New)").

## Out of scope (next iterations)

- Verified Partner conversion flow + ManagerWeb rewiring.
- GuestApp reading real venues.
- Cron-based recurring re-enrichment.
- Per-source quality scoring / dedupe across sources beyond `google_place_id`.
