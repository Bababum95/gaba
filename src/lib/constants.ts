import type { FilterKey, SortKey } from "./types";

export const BASE_URL = "https://dummyjson.com";

export const DEFAULT_LIMIT = 15;
export const PAGE_SIZE_OPTIONS = [15, 30, 60] as const;

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "firstName", label: "First name" },
  { value: "lastName", label: "Last name" },
  { value: "age", label: "Age" },
  { value: "height", label: "Height" },
  { value: "weight", label: "Weight" },
];

export const FILTER_KEYS: { key: FilterKey; label: string }[] = [
  { key: "gender", label: "Gender" },
  { key: "role", label: "Role" },
  { key: "bloodGroup", label: "Blood" },
  { key: "hair.color", label: "Hair" },
  { key: "eyeColor", label: "Eyes" },
];
