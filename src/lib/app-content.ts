// Frontend-only content hook. All content lives in the components as
// fallback values — no backend, no Supabase, no network calls.
export function useAppContent<T>(_contentKey: string, fallback: T): T {
  return fallback;
}