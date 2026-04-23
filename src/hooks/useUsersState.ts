"use client";

import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

import {
  DEFAULT_LIMIT,
  FILTER_KEY_URL_VALUES,
  SORT_KEYS,
} from "@/lib/constants";
import type { SortKey, SortOrder, ViewMode } from "@/lib/types";

const sortOrders = ["asc", "desc"] as const;
const viewModes = ["table", "gallery"] as const;

export function useUsersState() {
  const [state, setState] = useQueryStates({
    q: parseAsString.withDefault(""),
    filterKey: parseAsStringLiteral(FILTER_KEY_URL_VALUES).withDefault(""),
    filterValue: parseAsString.withDefault(""),
    sortBy: parseAsStringLiteral(SORT_KEYS).withDefault("firstName" as SortKey),
    order: parseAsStringLiteral(sortOrders).withDefault("asc" as SortOrder),
    view: parseAsStringLiteral(viewModes).withDefault("table" as ViewMode),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
  });

  // Action-based API (mini-store)
  const actions = {
    setQuery(q: string) {
      setState({ q, page: 1 });
    },
    setFilter(key: typeof state.filterKey, value: string) {
      setState({ filterKey: key, filterValue: value, page: 1 });
    },
    clearFilter() {
      setState({ filterKey: "", filterValue: "", page: 1 });
    },
    setSort(sortBy: SortKey) {
      setState({ sortBy, page: 1 });
    },
    setOrder(order: SortOrder) {
      setState({ order, page: 1 });
    },
    setView(view: ViewMode) {
      setState({ view });
    },
    setPage(page: number) {
      setState({ page });
    },
    setLimit(limit: number) {
      setState({ limit, page: 1 });
    },
  };

  return [state, actions] as const;
}

export type UsersState = ReturnType<typeof useUsersState>[0];
export type UsersStateActions = ReturnType<typeof useUsersState>[1];
