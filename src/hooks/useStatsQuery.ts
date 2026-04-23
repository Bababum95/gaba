"use client";

import { computeStats } from "@/lib/stats";

import { useAllUsersQuery } from "./useAllUsersQuery";

export function useStatsQuery() {
  const base = useAllUsersQuery();
  return {
    ...base,
    data: base.data !== undefined ? computeStats(base.data) : undefined,
  };
}
