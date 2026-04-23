"use client";

import Image from "next/image";
import { forwardRef, useState, type ReactElement } from "react";

import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

function initialsFromAlt(alt: string): string {
  const parts = alt.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, Props>(
  function Avatar(
    { src, alt, size = 36, className = "" },
    ref,
  ): ReactElement {
    const [failed, setFailed] = useState(false);
    const showImage = Boolean(src) && !failed;

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt}
        className={cn(
          "inline-flex shrink-0 overflow-hidden rounded-full bg-hair items-center justify-center",
          className,
        )}
        style={{ width: size, height: size }}
      >
        {showImage ? (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            unoptimized
            onError={() => setFailed(true)}
          />
        ) : (
          <span
            className="text-[10px] font-mono font-medium text-ink-mute select-none"
            aria-hidden
          >
            {initialsFromAlt(alt)}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";
