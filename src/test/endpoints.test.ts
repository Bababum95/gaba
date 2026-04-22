import { describe, it, expect } from "vitest";
import { resolveEndpoint } from "@/lib/endpoints";

describe("resolveEndpoint", () => {
  const base = { limit: 15, skip: 0 };

  it("returns base URL for plain pagination", () => {
    const url = resolveEndpoint(base);
    expect(url).toContain("/users?");
    expect(url).toContain("limit=15");
    expect(url).toContain("skip=0");
  });

  it("returns search URL when q is set", () => {
    const url = resolveEndpoint({ ...base, q: "Emily" });
    expect(url).toContain("/users/search");
    expect(url).toContain("q=Emily");
  });

  it("returns filter URL when filterKey and filterValue are set", () => {
    const url = resolveEndpoint({
      ...base,
      filterKey: "gender",
      filterValue: "female",
    });
    expect(url).toContain("/users/filter");
    expect(url).toContain("key=gender");
    expect(url).toContain("value=female");
  });

  it("prioritises search over filter when both are set", () => {
    const url = resolveEndpoint({
      ...base,
      q: "John",
      filterKey: "gender",
      filterValue: "male",
    });
    expect(url).toContain("/users/search");
    expect(url).not.toContain("/users/filter");
  });

  it("appends sortBy and order to base URL", () => {
    const url = resolveEndpoint({ ...base, sortBy: "age", order: "desc" });
    expect(url).toContain("sortBy=age");
    expect(url).toContain("order=desc");
  });
});
