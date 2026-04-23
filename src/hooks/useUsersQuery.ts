"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsersClient } from "@/lib/api";
import type { FilterKey, SortKey, SortOrder } from "@/lib/types";
import { useDebouncedValue } from "./useDebouncedValue";

type UseUsersQueryParams = {
  q: string;
  filterKey: FilterKey | "";
  filterValue: string;
  sortBy: SortKey;
  order: SortOrder;
  page: number;
  limit: number;
};

const STALE_MS = 30_000;
const GC_MS = 5 * 60_000;

export function useUsersQuery(params: UseUsersQueryParams) {
  const debouncedQ = useDebouncedValue(params.q, 350);

  const queryKey = [
    "users",
    debouncedQ,
    params.filterKey,
    params.filterValue,
    params.sortBy,
    params.order,
    params.page,
    params.limit,
  ] as const;

  const filterKey: FilterKey | undefined =
    params.filterKey === "" ? undefined : params.filterKey;
  const filterValue = params.filterValue || undefined;

  return useQuery({
    queryKey,
    queryFn: () =>
      fetchUsersClient({
        q: debouncedQ || undefined,
        filterKey,
        filterValue,
        sortBy: params.sortBy,
        order: params.order,
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
      }),
    placeholderData: (prev) => prev,
    staleTime: STALE_MS,
    gcTime: GC_MS,
  });
}
