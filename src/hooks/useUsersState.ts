"use client";

import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import type { SortKey, SortOrder, ViewMode } from "@/lib/types";
import { DEFAULT_LIMIT } from "@/lib/constants";

const sortKeys = [
  "age",
  "firstName",
  "lastName",
  "height",
  "weight",
] as const;
const sortOrders = ["asc", "desc"] as const;
const viewModes = ["table", "gallery"] as const;

export function useUsersState() {
  return useQueryStates({
    q: parseAsString.withDefault(""),
    filterKey: parseAsString.withDefault(""),
    filterValue: parseAsString.withDefault(""),
    sortBy: parseAsStringLiteral(sortKeys).withDefault("firstName" as SortKey),
    order: parseAsStringLiteral(sortOrders).withDefault("asc" as SortOrder),
    view: parseAsStringLiteral(viewModes).withDefault("table" as ViewMode),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
  });
}

export type UsersState = ReturnType<typeof useUsersState>[0];
export type UsersStateSetter = ReturnType<typeof useUsersState>[1];
