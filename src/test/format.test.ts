import { describe, it, expect } from "vitest";
import {
  formatBirthDate,
  maskCardNumber,
  truncateWallet,
} from "@/lib/format";

describe("formatBirthDate", () => {
  it("formats valid ISO date", () => {
    const s = formatBirthDate("1994-01-15");
    expect(s).toContain("1994");
    expect(s).toContain("January");
  });

  it("returns em dash for invalid date", () => {
    expect(formatBirthDate("not-a-date")).toBe("—");
  });
});

describe("maskCardNumber", () => {
  it("masks standard card", () => {
    expect(maskCardNumber("1234567890123456")).toBe("•••• •••• •••• 3456");
  });

  it("handles short string", () => {
    expect(maskCardNumber("12")).toBe("•••• •••• •••• 12");
  });
});

describe("truncateWallet", () => {
  it("returns short wallet unchanged", () => {
    expect(truncateWallet("0xabc", 8)).toBe("0xabc");
  });

  it("truncates long wallet", () => {
    const w = "0x" + "a".repeat(40);
    const out = truncateWallet(w, 4);
    expect(out).toContain("…");
    expect(out.length).toBeLessThan(w.length);
  });
});
