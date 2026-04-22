import { UserSchema, UsersResponseSchema } from "./schema";
import type { ListParams, User, UsersResponse } from "./types";
import { allUsersUrl, resolveEndpoint, userByIdUrl } from "./endpoints";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
  ) {
    super(`API error ${status} fetching ${url}`);
    this.name = "ApiError";
  }
}

export async function fetchUsers(p: ListParams): Promise<UsersResponse> {
  const url = resolveEndpoint(p);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new ApiError(res.status, url);
  return UsersResponseSchema.parse(await res.json());
}

export async function fetchUserById(id: number): Promise<User> {
  const url = userByIdUrl(id);
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new ApiError(res.status, url);
  return UserSchema.parse(await res.json());
}

export async function fetchAllUsers(): Promise<UsersResponse> {
  const url = allUsersUrl();
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new ApiError(res.status, url);
  return UsersResponseSchema.parse(await res.json());
}

// Client-side fetch (no Next.js cache)
export async function fetchUsersClient(p: ListParams): Promise<UsersResponse> {
  const url = resolveEndpoint(p);
  const res = await fetch(url);
  if (!res.ok) throw new ApiError(res.status, url);
  return UsersResponseSchema.parse(await res.json());
}
