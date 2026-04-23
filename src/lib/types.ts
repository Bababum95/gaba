import { z } from "zod";

import type { FilterKey, SortKey } from "./constants";
import { UserSchema, UsersResponseSchema } from "./schema";

export type { FilterKey, SortKey } from "./constants";

export type SortOrder = "asc" | "desc";
export type ViewMode = "table" | "gallery";

export type User = z.infer<typeof UserSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;

export type ListParams = {
  q?: string;
  filterKey?: FilterKey;
  filterValue?: string;
  sortBy?: SortKey;
  order?: SortOrder;
  limit: number;
  skip: number;
};

export type FilterOption = {
  key: FilterKey;
  value: string;
};
