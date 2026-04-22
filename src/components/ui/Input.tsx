import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, trailing, className = "", ...props }, ref) => {
    return (
      <span className="relative inline-flex items-center w-full">
        {icon && (
          <span className="absolute left-3 text-[var(--ink-mute)] pointer-events-none flex items-center">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={[
            "w-full bg-[var(--bg-raised)] text-[var(--ink)] placeholder:text-[var(--ink-mute)]",
            "border border-[var(--hair)] rounded-[var(--radius)]",
            "py-2 text-sm transition-colors duration-150",
            "focus:outline-none focus:border-[var(--accent)]",
            icon ? "pl-9 pr-3" : "px-3",
            trailing ? "pr-9" : "",
            className,
          ].join(" ")}
          {...props}
        />
        {trailing && (
          <span className="absolute right-3 text-[var(--ink-mute)] flex items-center">
            {trailing}
          </span>
        )}
      </span>
    );
  },
);
Input.displayName = "Input";

export default Input;
