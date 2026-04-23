import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces value updates", () => {
    const { result, rerender } = renderHook(
      ({ v }: { v: string }) => useDebouncedValue(v, 350),
      { initialProps: { v: "a" } },
    );
    expect(result.current).toBe("a");
    rerender({ v: "b" });
    expect(result.current).toBe("a");
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(result.current).toBe("b");
  });
});
