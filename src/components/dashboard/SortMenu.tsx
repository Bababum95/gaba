"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import type { ReactElement, ChangeEvent } from "react";

import { Select } from "@/components/ui/Select";
import { SORT_KEYS, SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SortKey, SortOrder } from "@/lib/types";

type Props = {
  sortBy: SortKey;
  order: SortOrder;
  onSortChange: (sortBy: SortKey) => void;
  onOrderChange: (order: SortOrder) => void;
};

function isSortKey(v: string): v is SortKey {
  return (SORT_KEYS as readonly string[]).includes(v);
}

export function SortMenu({
  sortBy,
  order,
  onSortChange,
  onOrderChange,
}: Props): ReactElement {
  const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (isSortKey(v)) onSortChange(v);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortBy}
        options={SORT_OPTIONS}
        onChange={handleSortSelect}
        aria-label="Sort by"
      />
      <button
        type="button"
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
        aria-label={`Order: ${order === "asc" ? "ascending" : "descending"}`}
        title={`Toggle sort order (currently ${order}ending)`}
        className={cn(
          "h-[38px] w-[38px] flex items-center justify-center shrink-0",
          "border border-hair rounded-(--radius)",
          "text-ink-soft hover:text-ink hover:border-hair-strong",
          "transition-colors text-sm font-mono",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        <span aria-hidden>
          {order === "asc" ? (
            <ArrowUpIcon size={16} />
          ) : (
            <ArrowDownIcon size={16} />
          )}
        </span>
      </button>
    </div>
  );
}
