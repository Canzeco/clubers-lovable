Rename "Manager" → "Business" across the app (UI labels, route paths, file names, component names, types, and copy).

## Scope

### 1. Route files (rename + update paths)
Rename all `src/routes/manager.*.tsx` → `src/routes/business.*.tsx`:
- `manager.index.tsx` → `business.index.tsx` (path `/business`)
- `manager.central.tsx` → `business.central.tsx`
- `manager.add.tsx` → `business.add.tsx`
- `manager.unit.$type.$id.tsx` → `business.unit.$type.$id.tsx`

Update all `<Link to="/manager/...">` and `useNavigate({ to: "/manager/..." })` calls inside these files to `/business/...`. Update `createFileRoute("/manager/...")` strings. Update page `<title>` metadata (e.g. "Mesita — Manager workspace" → "Business workspace").

### 2. Components
- `src/components/manager/Shell.tsx` → `src/components/business/Shell.tsx`
  - Rename exports `ManagerShell` → `BusinessShell`, `ManagerSignOutLink` → `BusinessSignOutLink`.
  - Update internal links to `/business/*`.
- `src/components/emulators/ManagerWeb.tsx` → `src/components/emulators/BusinessWeb.tsx`
  - Rename export `ManagerWeb` → `BusinessWeb`. Update any user-facing copy that says "Manager".

### 3. Lib
- `src/lib/manager/units.ts` → `src/lib/business/units.ts` (no symbol rename needed unless types reference "manager"). Update imports.

### 4. Update all importers
Search for `from "@/components/manager/Shell"`, `from "@/components/emulators/ManagerWeb"`, `from "@/lib/manager/units"`, `ManagerShell`, `ManagerWeb`, `ManagerSignOutLink`, and any `/manager` link strings across the codebase (landing page, admin, consumer, root) and update them.

### 5. User-facing copy
Replace visible labels like "Manager workspace", "Sign in to your Mesita manager workspace", any nav/CTA text saying "Manager" → "Business". Keep the word "manage"/"manager" only where it refers to the verb action (e.g. "manage capacity") unless it specifically labels the persona.

### 6. Out of scope
- No DB / schema changes.
- The `MY_UNITS` mock data and `UnitType` values stay the same.
- The `findUnit`, `UNIT_TYPE_META` API stays the same (just file path moves).
- `routeTree.gen.ts` regenerates automatically.

## Verification
After edits, grep for remaining `manager` / `Manager` references and confirm only intentional ones remain (e.g. the verb "manage").
