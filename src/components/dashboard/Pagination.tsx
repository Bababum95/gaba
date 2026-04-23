"use client";

import { useState, type ReactElement, type SyntheticEvent } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { PAGE_SIZE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: Props): ReactElement {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  const from = total === 0 ? 0 : Math.min((page - 1) * limit + 1, total);
  const to = total === 0 ? 0 : Math.min(page * limit, total);
  const [jumpValue, setJumpValue] = useState("");

  const handleJump = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (totalPages === 0) return;
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onPageChange(n);
      setJumpValue("");
    }
  };

  const pageLabel = totalPages === 0 ? `0 / 0` : `${page} / ${totalPages}`;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between flex-wrap gap-4 px-6 py-4 border-t border-hair"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-ink-mute">
          {total === 0 ? "0" : `${from}–${to}`} of {total}
        </span>
        <Select
          value={String(limit)}
          options={PAGE_SIZE_OPTIONS.map((v) => ({
            value: String(v),
            label: `${v} / page`,
          }))}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          aria-label="Page size"
          className="text-xs py-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          disabled={total === 0 || page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span className="font-mono text-xs text-ink-mute px-1">
          {pageLabel}
        </span>

        <Button
          size="sm"
          variant="ghost"
          disabled={total === 0 || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ArrowRightIcon size={16} />
        </Button>

        <form onSubmit={handleJump} className="flex items-center gap-1 ml-2">
          <input
            type="number"
            min={totalPages > 0 ? 1 : 0}
            max={totalPages > 0 ? totalPages : 0}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            placeholder="Go to"
            aria-label="Jump to page"
            disabled={totalPages === 0}
            className={cn(
              "w-16 text-xs font-mono py-1 px-2",
              "bg-bg-raised border border-hair rounded-(--radius)",
              "text-ink placeholder:text-ink-mute",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-accent",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              totalPages === 0 && "opacity-50 cursor-not-allowed",
            )}
          />
          <Button
            size="sm"
            variant="outline"
            type="submit"
            disabled={totalPages === 0}
          >
            Go
          </Button>
        </form>
      </div>
    </nav>
  );
}
