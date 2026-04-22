"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { PAGE_SIZE_OPTIONS } from "@/lib/constants";

type PaginationProps = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = Math.min((page - 1) * limit + 1, total);
  const to = Math.min(page * limit, total);
  const [jumpValue, setJumpValue] = useState("");

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onPageChange(n);
      setJumpValue("");
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between flex-wrap gap-4 px-6 py-4 border-t border-[var(--hair)]"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--ink-mute)]">
          {total === 0 ? "0" : `${from}–${to}`} of {total}
        </span>
        <Select
          value={String(limit)}
          options={PAGE_SIZE_OPTIONS.map((v) => ({
            value: String(v),
            label: `${v} / page`,
          }))}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
            onPageChange(1);
          }}
          aria-label="Page size"
          className="text-xs py-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ← Prev
        </Button>

        <span className="font-mono text-xs text-[var(--ink-mute)] px-1">
          {page} / {totalPages}
        </span>

        <Button
          size="sm"
          variant="ghost"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          Next →
        </Button>

        <form onSubmit={handleJump} className="flex items-center gap-1 ml-2">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            placeholder="Go to"
            aria-label="Jump to page"
            className={[
              "w-16 text-xs font-mono py-1 px-2",
              "bg-[var(--bg-raised)] border border-[var(--hair)] rounded-[var(--radius)]",
              "text-[var(--ink)] placeholder:text-[var(--ink-mute)]",
              "focus:outline-none focus:border-[var(--accent)]",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            ].join(" ")}
          />
          <Button size="sm" variant="outline" type="submit">
            Go
          </Button>
        </form>
      </div>
    </nav>
  );
}
