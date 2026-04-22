import { BASE_URL } from "./constants";
import type { ListParams } from "./types";

export function resolveEndpoint(p: ListParams): string {
  const base = BASE_URL;
  const pagination = new URLSearchParams({
    limit: String(p.limit),
    skip: String(p.skip),
  });

  if (p.sortBy) {
    pagination.set("sortBy", p.sortBy);
    pagination.set("order", p.order ?? "asc");
  }

  // Search endpoint — text query takes priority
  if (p.q && p.q.trim()) {
    const sp = new URLSearchParams({ q: p.q.trim() });
    // search doesn't support sortBy natively, but we attach for completeness
    pagination.forEach((v, k) => sp.set(k, v));
    return `${base}/users/search?${sp.toString()}`;
  }

  // Filter endpoint — single key/value filter
  if (p.filterKey && p.filterValue) {
    const sp = new URLSearchParams({
      key: p.filterKey,
      value: p.filterValue,
    });
    pagination.forEach((v, k) => sp.set(k, v));
    return `${base}/users/filter?${sp.toString()}`;
  }

  // Base endpoint — full list with pagination + sort
  return `${base}/users?${pagination.toString()}`;
}

export function userByIdUrl(id: number): string {
  return `${BASE_URL}/users/${id}`;
}

export function allUsersUrl(): string {
  return `${BASE_URL}/users?limit=0`;
}
