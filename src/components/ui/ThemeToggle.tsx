"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={[
        "w-8 h-8 flex items-center justify-center",
        "rounded-[var(--radius)] border border-[var(--hair)]",
        "text-[var(--ink-soft)] hover:text-[var(--ink)]",
        "hover:border-[var(--hair-strong)] transition-colors duration-150",
        "text-base",
      ].join(" ")}
    >
      {theme === "light" ? "○" : "●"}
    </button>
  );
}
