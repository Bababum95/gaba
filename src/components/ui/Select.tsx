import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type SelectOption = { value: string; label: string };

type Props = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ options, placeholder, className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "bg-bg-raised text-ink text-sm",
          "border border-hair rounded-(--radius)",
          "px-3 py-2 pr-8 appearance-none cursor-pointer",
          "transition-colors duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus:border-accent",
          "bg-no-repeat",
          className,
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238a8a90' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 10px center",
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
);
Select.displayName = "Select";
