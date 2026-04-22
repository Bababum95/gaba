"use client";

import type { ViewMode } from "@/lib/types";

type ViewToggleProps = {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
};

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className="flex border border-[var(--hair)] rounded-[var(--radius)] overflow-hidden"
    >
      {(["table", "gallery"] as ViewMode[]).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          aria-label={`${v} view`}
          onClick={() => onChange(v)}
          className={[
            "px-2.5 py-1.5 text-xs font-mono transition-colors",
            view === v
              ? "bg-[var(--accent)] text-[var(--accent-ink)]"
              : "text-[var(--ink-mute)] hover:text-[var(--ink)] hover:bg-[var(--accent-muted)]",
          ].join(" ")}
        >
          {v === "table" ? "≡" : "⊞"}
        </button>
      ))}
    </div>
  );
}
