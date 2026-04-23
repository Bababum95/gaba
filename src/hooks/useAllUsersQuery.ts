"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAllUsers } from "@/lib/api";

export const ALL_USERS_QUERY_KEY = ["users-all"] as const;

const STALE_MS = 5 * 60_000;
const GC_MS = 10 * 60_000;

export function useAllUsersQuery() {
  return useQuery({
    queryKey: ALL_USERS_QUERY_KEY,
    queryFn: async () => (await fetchAllUsers()).users,
    staleTime: STALE_MS,
    gcTime: GC_MS,
  });
}
