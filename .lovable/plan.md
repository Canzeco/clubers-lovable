Refactor the discovery taxonomy. Canonical categories become **six**: Places, Events, Communities, People, **Products**, **Services**. Remove Experiences (reclassify the two seed entries as Events). Products and Services are first-class — they appear in Discover filters, Saved filter chips, Catalog, Swipe, Map pins, and have their own detail rendering. Events can also *offer* products and services inline (a concert with merch + valet service), but Products/Services are independently searchable as their own categories.

## Why two layers
- **Top-level category**: a Product or Service is a thing you can discover on its own (a barber, a bottle of mezcal-to-go, a personal trainer). It shows up in search.
- **Event offerings**: an Event can also expose products/services as add-ons (a festival selling merch + parking + VIP upgrade). These are inline on the event detail, not separate top-level listings.

## Data model — `src/lib/clubers/data.ts`

- `Category` becomes `"place" | "event" | "community" | "person" | "product" | "service"`. Remove `"experience"`.
- Extend `Listing` with optional product/service fields:
  ```ts
  // For products
  price?: number;            // MXN
  productKind?: string;      // "Bottle", "Merch", "Voucher"
  soldBy?: string;           // denormalized name of the place/person that sells it
  // For services
  serviceKind?: string;      // "Haircut", "Personal trainer", "Photographer"
  durationLabel?: string;    // already exists — reuse
  providedBy?: string;       // denormalized name of the place/person providing
  ```
- Add an `Offering` interface for inline event add-ons:
  ```ts
  export interface Offering {
    id: string;
    name: string;
    kind: "product" | "service";
    price: number;
    description?: string;
  }
  ```
  and `offerings?: Offering[]` on `Listing` (used by events).
- Reclassify the two `experience` seed entries (`exp-cata`, `exp-cook`) to `category: "event"` with `whenLabel` (drop `durationLabel` on these or keep, harmless).
- Add seed data:
  - **3 products** — e.g. `prod-mezcal` (bottle from the mezcal bar), `prod-koli-cookbook` (Koli signed cookbook), `prod-rooftop-merch` (Catarina branded tee). Each with `price`, `productKind`, `soldBy`, vibes, cover image.
  - **3 services** — e.g. `srv-barber` (premium barber in San Pedro), `srv-trainer` (personal trainer), `srv-photographer` (event photographer for hire). Each with `serviceKind`, `priceLevel`, `providedBy` where relevant.
- Add `offerings` to one event (Pa'l Norte): a couple of inline merch + VIP upgrade entries to demonstrate the pattern.
- Update `t.discover.cats`: remove `experience`, add `product: "Products"`, `service: "Services"`.

## Discover — `src/components/emulators/ConsumerApp.tsx`

- `CATS` array: `["place", "event", "community", "person", "product", "service"]`.
- Filter sheet (`What are you looking for`): now 6 chips. Layout already wraps — verify it still looks balanced (2 cols × 3 rows).
- Day/Time filter conditional: keep only for `event` and `place` (drop experience branch).
- Mode rendering branch: route `product` and `service` to a new `ProductList` / `ServiceList` view (or a single `OfferingList` reused for both). Keep swipe/map/catalog/AI working for them too — they're just listings.

## Saved — Filter chips

- Replace `experience` chip with `product` and `service` chips. Final order: All · Places · Events · Communities · People · Products · Services.

## Listing detail (`VenueDetail`)

- For `category === "product"`: render product hero (image, price big, soldBy, description, "Buy" CTA — non-functional placeholder).
- For `category === "service"`: render service hero (image, serviceKind, providedBy, priceLevel/duration, "Book" CTA — non-functional placeholder).
- For `category === "event"` with `offerings`: add an "Add to your night" section listing each offering with kind badge (Product/Service), price, and short description.
- Remove any experience-specific branches.

## Card list components

- `CatalogCard`, `SwipeCard`, `MapView` pins: work generically off `Listing`, so they already render products/services correctly once the data exists. Verify subcategory/price/zone display sensibly for product (`productKind` as subcategory fallback) and service (`serviceKind` as subcategory fallback). If not, surface those fields through the existing `subcategory` field on the seed entries to avoid extra rendering logic.

## Manager / admin — out of scope for this turn

- `UnitType` and admin counts still reference `experience`. Leaving them untouched would create drift. Minimum hygiene: also remove `experience` from `src/lib/manager/units.ts`, `src/routes/manager.unit.$type.$id.tsx`, `src/routes/manager.add.tsx`, `src/routes/manager.central.tsx`, `src/components/emulators/AdminWeb.tsx`. Do NOT add product/service to the manager surfaces this turn — consumer-side first; manager taxonomy can follow.

## Out of scope
- Real checkout / booking flow for products and services (CTAs are placeholders).
- Backend schema changes — pure frontend prototype.
- Adding product/service authoring to the manager app.
