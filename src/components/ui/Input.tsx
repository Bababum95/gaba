import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ icon, trailing, className = "", ...props }, ref) => {
    return (
      <span className="relative inline-flex items-center w-full">
        {icon && (
          <span className="absolute left-3 text-ink-mute pointer-events-none flex items-center">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-bg-raised text-ink placeholder:text-ink-mute",
            "border border-hair rounded-(--radius)",
            "py-2 text-sm transition-colors duration-150",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus:border-accent",
            icon ? "pl-9 pr-3" : "px-3",
            trailing && "pr-9",
            className,
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute right-3 text-ink-mute flex items-center">
            {trailing}
          </span>
        )}
      </span>
    );
  },
);
Input.displayName = "Input";
