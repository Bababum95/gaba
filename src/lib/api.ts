import { cache } from "react";
import { ZodError } from "zod";

import { UserSchema, UsersResponseSchema } from "./schema";
import { allUsersUrl, resolveEndpoint, userByIdUrl } from "./endpoints";
import type { ListParams, User, UsersResponse } from "./types";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    options?: { cause?: unknown },
  ) {
    super(`API error ${status} fetching ${url}`, { cause: options?.cause });
    this.name = "ApiError";
  }
}

async function readJsonBody(res: Response, url: string): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch (err) {
    throw new ApiError(res.status, url, { cause: err });
  }
}

function parseUsersResponse(
  data: unknown,
  status: number,
  url: string,
): UsersResponse {
  try {
    return UsersResponseSchema.parse(data);
  } catch (err) {
    throw new ApiError(status, url, {
      cause: err instanceof ZodError ? err : err,
    });
  }
}

function parseUser(data: unknown, status: number, url: string): User {
  try {
    return UserSchema.parse(data);
  } catch (err) {
    throw new ApiError(status, url, {
      cause: err instanceof ZodError ? err : err,
    });
  }
}

export async function fetchUsers(p: ListParams): Promise<UsersResponse> {
  const url = resolveEndpoint(p);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new ApiError(res.status, url);
  const data = await readJsonBody(res, url);
  return parseUsersResponse(data, res.status, url);
}

export const fetchUserById = cache(async (id: number): Promise<User> => {
  const url = userByIdUrl(id);
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new ApiError(res.status, url);
  const data = await readJsonBody(res, url);
  return parseUser(data, res.status, url);
});

export async function fetchAllUsers(): Promise<UsersResponse> {
  const url = allUsersUrl();
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new ApiError(res.status, url);
  const data = await readJsonBody(res, url);
  return parseUsersResponse(data, res.status, url);
}

// Client-side fetch (no Next.js cache)
export async function fetchUsersClient(p: ListParams): Promise<UsersResponse> {
  const url = resolveEndpoint(p);
  const res = await fetch(url);
  if (!res.ok) throw new ApiError(res.status, url);
  const data = await readJsonBody(res, url);
  return parseUsersResponse(data, res.status, url);
}
