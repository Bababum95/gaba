"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "w-[38px] h-[38px] flex items-center justify-center",
        "rounded-(--radius) border border-hair",
        "text-ink-soft hover:text-ink",
        "hover:border-hair-strong transition-colors duration-150",
        "text-base",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
    >
      {mounted && (
        <span aria-hidden>
          {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </span>
      )}
    </button>
  );
}
