"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import type { ReactElement } from "react";

import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "w-[38px] h-[38px] flex items-center justify-center",
        "rounded-(--radius) border border-hair",
        "text-ink-soft hover:text-ink",
        "hover:border-hair-strong transition-colors duration-150",
        "text-base",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
    >
      <span aria-hidden>
        {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
      </span>
    </button>
  );
}
