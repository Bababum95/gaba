"use client";

import { Grid2x2Icon, Rows3Icon } from "lucide-react";
import type { ReactElement } from "react";

import { cn } from "@/lib/utils";
import type { ViewMode } from "@/lib/types";

type Props = {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
};

const labels: Record<ViewMode, string> = {
  table: "Table view",
  gallery: "Gallery view",
};

export function ViewToggle({ view, onChange }: Props): ReactElement {
  return (
    <div
      role="group"
      aria-label="View mode"
      className="flex border border-hair rounded-(--radius) overflow-hidden hover:border-hair-strong"
    >
      {(["table", "gallery"] as const).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          aria-label={labels[v]}
          onClick={() => onChange(v)}
          className={cn(
            "px-2.5 py-1.5 text-xs font-mono transition-colors h-[38px] w-[38px] flex items-center justify-center shrink-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
            view === v
              ? "bg-accent text-accent-ink"
              : "text-ink-mute hover:text-ink",
          )}
        >
          <span aria-hidden>
            {v === "table" ? (
              <Rows3Icon size={16} />
            ) : (
              <Grid2x2Icon size={16} />
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
