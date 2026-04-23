"use client";

import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useRef, type ReactElement } from "react";

import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Kbd } from "@/components/ui/Kbd";
import type { FilterKey, SortKey, SortOrder, ViewMode } from "@/lib/types";

import { FilterChips } from "./FilterChips";
import { SortMenu } from "./SortMenu";
import { ViewToggle } from "./ViewToggle";

type Props = {
  q: string;
  filterKey: FilterKey | "";
  filterValue: string;
  sortBy: SortKey;
  order: SortOrder;
  view: ViewMode;
  onQChange: (q: string) => void;
  onFilterChange: (key: FilterKey, value: string) => void;
  onFilterClear: () => void;
  onSortChange: (sortBy: SortKey) => void;
  onOrderChange: (order: SortOrder) => void;
  onViewChange: (view: ViewMode) => void;
};

export function Toolbar({
  q,
  filterKey,
  filterValue,
  sortBy,
  order,
  view,
  onQChange,
  onFilterChange,
  onFilterClear,
  onSortChange,
  onOrderChange,
  onViewChange,
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusSearch = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if ((e.key === "/" || (e.metaKey && e.key === "k")) && !inInput) {
        e.preventDefault();
        focusSearch();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [focusSearch]);

  return (
    <div className="border-b border-hair bg-bg">
      <div className="mx-auto px-6 py-3 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] max-w-sm">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search users…"
              value={q}
              onChange={(e) => onQChange(e.target.value)}
              icon={<SearchIcon size={16} />}
              trailing={
                q ? (
                  <button
                    type="button"
                    onClick={() => onQChange("")}
                    className="text-ink-mute hover:text-ink text-base leading-none"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                ) : (
                  <Kbd>/</Kbd>
                )
              }
              aria-label="Search users"
            />
          </div>

          <div className="flex items-center gap-2">
            <SortMenu
              sortBy={sortBy}
              order={order}
              onSortChange={onSortChange}
              onOrderChange={onOrderChange}
            />
            <ViewToggle view={view} onChange={onViewChange} />
            <ThemeToggle />
          </div>
        </div>

        <FilterChips
          activeKey={filterKey}
          activeValue={filterValue}
          searchActive={q.trim().length > 0}
          onChange={onFilterChange}
          onClear={onFilterClear}
        />
      </div>
    </div>
  );
}
