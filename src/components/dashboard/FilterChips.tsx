"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { useAllUsersQuery } from "@/hooks/useAllUsersQuery";
import type { FilterKey, User } from "@/lib/types";

const FILTER_DEFS: {
  key: FilterKey;
  label: string;
  getValue: (u: User) => string;
}[] = [
  { key: "gender", label: "Gender", getValue: (u) => u.gender },
  { key: "role", label: "Role", getValue: (u) => u.role },
  { key: "bloodGroup", label: "Blood", getValue: (u) => u.bloodGroup },
  { key: "hair.color", label: "Hair", getValue: (u) => u.hair.color },
  { key: "eyeColor", label: "Eyes", getValue: (u) => u.eyeColor },
];

type Props = {
  activeKey: string;
  activeValue: string;
  searchActive: boolean;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function FilterChips({
  activeKey,
  activeValue,
  searchActive,
  onChange,
  onClear,
}: Props) {
  const { data } = useAllUsersQuery();
  const [openKey, setOpenKey] = useState<FilterKey | null>(null);
  const popoverRefs = useRef<Partial<Record<FilterKey, HTMLDivElement | null>>>(
    {},
  );

  const setPopoverEl = useCallback(
    (key: FilterKey) => (el: HTMLDivElement | null) => {
      popoverRefs.current[key] = el;
    },
    [],
  );

  useEffect(() => {
    if (openKey === null) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const root = popoverRefs.current[openKey];
      if (root && !root.contains(e.target as Node)) {
        setOpenKey(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  const valuesByKey = useMemo(() => {
    if (!data) return {} as Record<FilterKey, string[]>;
    const out = {} as Record<FilterKey, string[]>;
    for (const def of FILTER_DEFS) {
      const set = new Set(data.map((u) => def.getValue(u)));
      out[def.key] = Array.from(set).sort();
    }
    return out;
  }, [data]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {FILTER_DEFS.map((def) => {
        const values = valuesByKey[def.key] ?? [];
        const isThisActive = activeKey === def.key;
        const isOpen = openKey === def.key && !searchActive;

        if (isThisActive && activeValue) {
          return (
            <Chip
              key={def.key}
              label={`${def.label}: ${activeValue}`}
              active
              disabled={searchActive}
              onRemove={onClear}
              onClick={onClear}
            />
          );
        }

        if (values.length === 0) {
          return (
            <span
              key={def.key}
              className="text-xs text-ink-mute font-mono px-2 py-1 border border-hair rounded-sm opacity-60"
            >
              {def.label}
            </span>
          );
        }

        return (
          <div key={def.key} ref={setPopoverEl(def.key)} className="relative">
            <button
              type="button"
              disabled={searchActive}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenKey((k) => (k === def.key ? null : def.key))
              }
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-sm",
                "border transition-all duration-150 select-none",
                searchActive
                  ? "opacity-40 cursor-not-allowed border-hair text-ink-mute"
                  : "cursor-pointer bg-bg-raised text-ink-soft border-hair hover:border-hair-strong",
              )}
            >
              {def.label}
            </button>
            {isOpen && (
              <div
                className="absolute top-full left-0 mt-1 z-50 flex flex-col bg-bg-raised border border-hair rounded-md shadow-lg min-w-[120px] py-1 max-h-52 overflow-y-auto"
                role="listbox"
                aria-label={`${def.label} values`}
              >
                {values.map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="option"
                    onClick={() => {
                      onChange(def.key, v);
                      setOpenKey(null);
                    }}
                    className="px-3 py-1.5 text-xs text-left text-ink-soft hover:text-ink hover:bg-accent-muted transition-colors font-mono"
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {searchActive && (
        <span className="text-[10px] text-ink-mute font-mono">
          Clear search to use filters
        </span>
      )}
    </div>
  );
}
