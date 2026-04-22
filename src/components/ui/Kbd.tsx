export default function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className={[
        "inline-flex items-center justify-center px-1.5 py-0.5",
        "text-[10px] font-mono text-[var(--ink-mute)]",
        "border border-[var(--hair)] rounded-[var(--radius-sm)]",
        "bg-[var(--bg)]",
      ].join(" ")}
    >
      {children}
    </kbd>
  );
}
