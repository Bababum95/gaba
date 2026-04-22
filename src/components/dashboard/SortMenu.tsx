"use client";

import Select from "@/components/ui/Select";
import type { SortKey, SortOrder } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/constants";

type SortMenuProps = {
  sortBy: SortKey;
  order: SortOrder;
  onSortChange: (sortBy: SortKey) => void;
  onOrderChange: (order: SortOrder) => void;
};

export default function SortMenu({
  sortBy,
  order,
  onSortChange,
  onOrderChange,
}: SortMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortBy}
        options={SORT_OPTIONS}
        onChange={(e) => onSortChange(e.target.value as SortKey)}
        aria-label="Sort by"
      />
      <button
        type="button"
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
        aria-label={`Order: ${order === "asc" ? "ascending" : "descending"}`}
        title={`Toggle sort order (currently ${order}ending)`}
        className={[
          "h-[36px] w-[36px] flex items-center justify-center shrink-0",
          "border border-[var(--hair)] rounded-[var(--radius)]",
          "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--hair-strong)]",
          "transition-colors text-sm font-mono",
        ].join(" ")}
      >
        {order === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
