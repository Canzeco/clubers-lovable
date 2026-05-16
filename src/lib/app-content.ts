import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export function useAppContent<T>(contentKey: string, fallback: T): T {
  const { data } = useQuery<T>({
    queryKey: ["app-content", contentKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_content")
        .select("payload")
        .eq("content_key", contentKey)
        .maybeSingle();

      if (error) throw error;

      return (data?.payload as T | null) ?? fallback;
    },
    staleTime: 60_000,
  });

  return data ?? fallback;
}