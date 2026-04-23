import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"kbd"> & {
  children: React.ReactNode;
};

export function Kbd({
  children,
  className,
  ...props
}: Props): ReactElement {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center px-1.5 py-0.5",
        "text-[10px] font-mono text-ink-mute",
        "border border-hair rounded-sm",
        "bg-bg",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
