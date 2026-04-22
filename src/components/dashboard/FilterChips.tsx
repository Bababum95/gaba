"use client";

import { useQuery } from "@tanstack/react-query";
import Chip from "@/components/ui/Chip";
import type { FilterKey } from "@/lib/types";
import { fetchAllUsers } from "@/lib/api";

const FILTER_DEFS: { key: FilterKey; label: string; getValue: (u: { gender: string; role: string; bloodGroup: string; hair: { color: string }; eyeColor: string }) => string }[] = [
  { key: "gender", label: "Gender", getValue: (u) => u.gender },
  { key: "role", label: "Role", getValue: (u) => u.role },
  { key: "bloodGroup", label: "Blood", getValue: (u) => u.bloodGroup },
  { key: "hair.color", label: "Hair", getValue: (u) => u.hair.color },
  { key: "eyeColor", label: "Eyes", getValue: (u) => u.eyeColor },
];

type FilterChipsProps = {
  activeKey: string;
  activeValue: string;
  searchActive: boolean;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export default function FilterChips({
  activeKey,
  activeValue,
  searchActive,
  onChange,
  onClear,
}: FilterChipsProps) {
  const { data } = useQuery({
    queryKey: ["users-all-for-filters"],
    queryFn: async () => {
      const d = await fetchAllUsers();
      return d.users;
    },
    staleTime: Infinity,
  });

  const getValues = (key: FilterKey): string[] => {
    if (!data) return [];
    const def = FILTER_DEFS.find((d) => d.key === key);
    if (!def) return [];
    const set = new Set(data.map(def.getValue));
    return Array.from(set).sort();
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {FILTER_DEFS.map((def) => {
        const values = getValues(def.key);
        const isThisActive = activeKey === def.key;

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
              className="text-xs text-[var(--ink-mute)] font-mono px-2 py-1 border border-[var(--hair)] rounded-[var(--radius-sm)] opacity-60"
            >
              {def.label}
            </span>
          );
        }

        return (
          <div key={def.key} className="relative group">
            <Chip
              label={def.label}
              disabled={searchActive}
              onClick={() => {}}
            />
            {!searchActive && (
              <div className="absolute top-full left-0 mt-1 z-50 hidden group-hover:flex flex-col bg-[var(--bg-raised)] border border-[var(--hair)] rounded-[var(--radius-md)] shadow-lg min-w-[120px] py-1 max-h-52 overflow-y-auto">
                {values.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onChange(def.key, v)}
                    className="px-3 py-1.5 text-xs text-left text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--accent-muted)] transition-colors font-mono"
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
        <span className="text-[10px] text-[var(--ink-mute)] font-mono">
          Clear search to use filters
        </span>
      )}
    </div>
  );
}
