import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "ghost" | "accent" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-bg-raised text-ink border border-hair hover:border-hair-strong",
  ghost: "bg-transparent text-ink-soft hover:text-ink hover:bg-accent-muted",
  accent: "bg-accent text-accent-ink hover:bg-accent-hover",
  outline:
    "bg-transparent border border-accent text-accent hover:bg-accent-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-1.5 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { variant = "default", size = "md", className = "", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-(--radius) transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
