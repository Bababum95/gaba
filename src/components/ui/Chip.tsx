import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
};

export function Chip({
  label,
  active = false,
  disabled = false,
  onRemove,
  onClick,
}: Props) {
  if (active && onRemove && !disabled) {
    return (
      <span className="inline-flex items-stretch rounded-sm overflow-hidden border border-accent bg-accent text-accent-ink">
        <button
          type="button"
          onClick={onClick}
          aria-pressed
          className="px-2.5 py-1 text-xs font-medium hover:bg-accent-hover/20 transition-colors"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="px-2 text-xs font-medium border-l border-accent-ink/25 hover:bg-accent-hover/20 transition-colors leading-none"
          aria-label={`Remove filter ${label}`}
        >
          <XIcon size={14} />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onClick={disabled ? undefined : onClick}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-sm",
        "border transition-all duration-150 select-none",
        disabled
          ? "opacity-40 cursor-not-allowed border-hair text-ink-mute"
          : "cursor-pointer",
        active && !disabled
          ? "bg-accent text-accent-ink border-accent"
          : !disabled &&
              "bg-bg-raised text-ink-soft border-hair hover:border-hair-strong",
      )}
    >
      {label}
    </button>
  );
}
