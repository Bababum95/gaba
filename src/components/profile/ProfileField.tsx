import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ProfileFieldProps = {
  label: string;
  value: ReactNode;
  mono?: boolean;
  breakAll?: boolean;
  valueClassName?: string;
  className?: string;
};

export function ProfileField({
  label,
  value,
  mono = false,
  breakAll = false,
  valueClassName,
  className,
}: ProfileFieldProps) {
  return (
    <div className={className}>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-0.5">
        {label}
      </dt>
      <dd
        className={cn(
          "text-sm text-ink-soft",
          mono && "font-mono",
          breakAll && "break-all",
          valueClassName,
        )}
      >
        {value}
      </dd>
    </div>
  );
}
