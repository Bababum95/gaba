type ChipProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
};

export default function Chip({
  label,
  active = false,
  disabled = false,
  onRemove,
  onClick,
}: ChipProps) {
  return (
    <span
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={active}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) onClick?.();
      }}
      className={[
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-[var(--radius-sm)]",
        "border transition-all duration-150 select-none",
        disabled
          ? "opacity-40 cursor-not-allowed border-[var(--hair)] text-[var(--ink-mute)]"
          : "cursor-pointer",
        active && !disabled
          ? "bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]"
          : !disabled
            ? "bg-[var(--bg-raised)] text-[var(--ink-soft)] border-[var(--hair)] hover:border-[var(--hair-strong)]"
            : "",
      ].join(" ")}
    >
      {label}
      {active && onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 opacity-70 hover:opacity-100 leading-none"
          aria-label={`Remove filter ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
