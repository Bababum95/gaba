"use client";

import { useCallback, useEffect, useRef } from "react";
import Input from "@/components/ui/Input";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Kbd from "@/components/ui/Kbd";
import FilterChips from "./FilterChips";
import SortMenu from "./SortMenu";
import ViewToggle from "./ViewToggle";
import type { FilterKey, SortKey, SortOrder, ViewMode } from "@/lib/types";

type ToolbarProps = {
  q: string;
  filterKey: string;
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

export default function Toolbar({
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
}: ToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusSearch = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const inInput =
        tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if ((e.key === "/" || (e.metaKey && e.key === "k")) && !inInput) {
        e.preventDefault();
        focusSearch();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [focusSearch]);

  return (
    <div className="border-b border-[var(--hair)] bg-[var(--bg)]">
      <div className="max-w-screen-2xl mx-auto px-6 py-3 space-y-3">

        {/* Row 1: search + controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] max-w-sm">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search users…"
              value={q}
              onChange={(e) => onQChange(e.target.value)}
              icon={
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              trailing={
                q ? (
                  <button
                    type="button"
                    onClick={() => onQChange("")}
                    className="text-[var(--ink-mute)] hover:text-[var(--ink)] text-base leading-none"
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

          <div className="flex items-center gap-2 ml-auto">
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

        {/* Row 2: filter chips */}
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
