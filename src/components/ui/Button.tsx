import { forwardRef } from "react";

type ButtonVariant = "default" | "ghost" | "accent" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[var(--bg-raised)] text-[var(--ink)] border border-[var(--hair)] hover:border-[var(--hair-strong)]",
  ghost:
    "bg-transparent text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--accent-muted)]",
  accent:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]",
  outline:
    "bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-muted)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-1.5 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "md", className = "", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center gap-1.5 font-medium rounded-[var(--radius)] transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
