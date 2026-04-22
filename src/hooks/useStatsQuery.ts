"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "@/lib/api";
import { computeStats } from "@/lib/stats";

export function useStatsQuery() {
  return useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => {
      const data = await fetchAllUsers();
      return computeStats(data.users);
    },
    staleTime: Infinity,
  });
}
