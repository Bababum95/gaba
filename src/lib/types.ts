import { z } from "zod";
import { UserSchema, UsersResponseSchema } from "./schema";

export type User = z.infer<typeof UserSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;

export type SortKey = "age" | "firstName" | "lastName" | "height" | "weight";
export type SortOrder = "asc" | "desc";

export type FilterKey =
  | "gender"
  | "role"
  | "bloodGroup"
  | "hair.color"
  | "eyeColor";

export type ViewMode = "table" | "gallery";

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
