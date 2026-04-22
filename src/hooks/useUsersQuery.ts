"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsersClient } from "@/lib/api";
import type { FilterKey, SortKey, SortOrder } from "@/lib/types";
import { useDebouncedValue } from "./useDebouncedValue";

type UseUsersQueryParams = {
  q: string;
  filterKey: string;
  filterValue: string;
  sortBy: SortKey;
  order: SortOrder;
  page: number;
  limit: number;
};

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

  return useQuery({
    queryKey,
    queryFn: () =>
      fetchUsersClient({
        q: debouncedQ || undefined,
        filterKey: (params.filterKey as FilterKey) || undefined,
        filterValue: params.filterValue || undefined,
        sortBy: params.sortBy,
        order: params.order,
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
      }),
    placeholderData: (prev) => prev,
  });
}
