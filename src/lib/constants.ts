const DEFAULT_BASE_URL = "https://dummyjson.com";

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_URL;
  if (!raw) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[constants] NEXT_PUBLIC_BASE_URL is not set; using https://dummyjson.com",
      );
    }
    return DEFAULT_BASE_URL;
  }
  return raw;
}

export const BASE_URL = getBaseUrl();

export const DEFAULT_LIMIT = 15;
export const PAGE_SIZE_OPTIONS = [15, 30, 60] as const;

export const SORT_KEYS = [
  "firstName",
  "lastName",
  "age",
  "height",
  "weight",
] as const;

export type SortKey = (typeof SORT_KEYS)[number];

export const FILTER_KEYS = [
  "gender",
  "role",
  "bloodGroup",
  "hair.color",
  "eyeColor",
] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];

/** Values accepted by nuqs for `filterKey` (includes empty default). */
export const FILTER_KEY_URL_VALUES = [...FILTER_KEYS, ""] as const;

const SORT_LABELS: Record<SortKey, string> = {
  firstName: "First name",
  lastName: "Last name",
  age: "Age",
  height: "Height",
  weight: "Weight",
};

export const SORT_OPTIONS = SORT_KEYS.map((value) => ({
  value,
  label: SORT_LABELS[value],
})) satisfies readonly { value: SortKey; label: string }[];

const FILTER_LABELS: Record<FilterKey, string> = {
  gender: "Gender",
  role: "Role",
  bloodGroup: "Blood",
  "hair.color": "Hair",
  eyeColor: "Eyes",
};

export const FILTER_KEY_OPTIONS: { key: FilterKey; label: string }[] =
  FILTER_KEYS.map((key) => ({
    key,
    label: FILTER_LABELS[key],
  }));
