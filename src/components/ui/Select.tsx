import { forwardRef } from "react";

type SelectOption = { value: string; label: string };

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  options: SelectOption[];
  placeholder?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={[
          "bg-[var(--bg-raised)] text-[var(--ink)] text-sm",
          "border border-[var(--hair)] rounded-[var(--radius)]",
          "px-3 py-2 pr-8 appearance-none cursor-pointer",
          "transition-colors duration-150",
          "focus:outline-none focus:border-[var(--accent)]",
          "bg-no-repeat",
          className,
        ].join(" ")}
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

export default Select;
