import { describe, it, expect, vi, beforeEach } from "vitest";
import { ZodError } from "zod";

import { ApiError, fetchUsers, fetchUsersClient } from "@/lib/api";
import { makeTestUser } from "./fixtures/user";

beforeEach(() => {
  vi.unstubAllGlobals();
});

function jsonResponse(body: unknown, ok = true, status = 200) {
  const text = JSON.stringify(body);
  return {
    ok,
    status,
    text: () => Promise.resolve(text),
  };
}

describe("fetchUsers (server)", () => {
  it("returns parsed users on success", async () => {
    const payload = {
      users: [makeTestUser()],
      total: 1,
      skip: 0,
      limit: 15,
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(payload)),
    );
    const result = await fetchUsers({ limit: 15, skip: 0 });
    expect(result.total).toBe(1);
    expect(result.users).toHaveLength(1);
  });

  it("throws ApiError on HTTP error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve(""),
      }),
    );
    await expect(fetchUsers({ limit: 15, skip: 0 })).rejects.toMatchObject({
      name: "ApiError",
      status: 500,
    });
  });


  it("throws ApiError on 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve(""),
      }),
    );
    await expect(fetchUsers({ limit: 15, skip: 0 })).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
    });
  });

  it("throws ApiError when JSON is invalid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve("not-json"),
      }),
    );
    await expect(fetchUsers({ limit: 15, skip: 0 })).rejects.toBeInstanceOf(
      ApiError,
    );
  });

  it("throws ApiError when schema fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ users: "bad", total: 1, skip: 0, limit: 15 }),
      ),
    );
    const err: unknown = await fetchUsers({ limit: 15, skip: 0 }).catch(
      (e: unknown) => e,
    );
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).cause).toBeInstanceOf(ZodError);
  });
});

describe("fetchUsersClient", () => {
  it("uses same parsing path", async () => {
    const payload = {
      users: [makeTestUser()],
      total: 1,
      skip: 0,
      limit: 15,
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(payload)),
    );
    const result = await fetchUsersClient({ limit: 15, skip: 0 });
    expect(result.users).toHaveLength(1);
  });
});
