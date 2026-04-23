import type { ReactElement } from "react";

import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export function Skeleton({
  className = "",
  width,
  height,
}: SkeletonProps): ReactElement {
  return (
    <span
      className={cn("block rounded-sm shimmer", className)}
      style={{ width, height: height ?? "1em" }}
      aria-hidden
    />
  );
}

type SkeletonRowProps = {
  /** Number of table cells (default 6, matches users table). */
  columns?: number;
};

export function SkeletonRow({ columns = 6 }: SkeletonRowProps): ReactElement {
  if (columns !== 6) {
    return (
      <tr className="border-b border-hair">
        {Array.from({ length: columns }).map((_, c) => (
          <td key={c} className="py-3 px-4">
            <Skeleton width="80%" height={13} />
          </td>
        ))}
      </tr>
    );
  }

  return (
    <tr className="border-b border-hair">
      <td className="py-3 px-4">
        <span className="flex items-center gap-3">
          <Skeleton width={36} height={36} className="rounded-full shrink-0" />
          <span className="flex flex-col gap-1.5 flex-1">
            <Skeleton width="60%" height={14} />
            <Skeleton width="40%" height={11} />
          </span>
        </span>
      </td>
      <td className="py-3 px-4 hidden md:table-cell">
        <Skeleton width="70%" height={13} />
      </td>
      <td className="py-3 px-4 hidden lg:table-cell">
        <Skeleton width="50%" height={13} />
      </td>
      <td className="py-3 px-4 hidden xl:table-cell">
        <Skeleton width="55%" height={13} />
      </td>
      <td className="py-3 px-4 hidden xl:table-cell">
        <Skeleton width="40%" height={13} />
      </td>
      <td className="py-3 px-4">
        <Skeleton width={48} height={22} className="rounded-sm" />
      </td>
    </tr>
  );
}

type SkeletonCardProps = {
  avatarSize?: number;
};

export function SkeletonCard({
  avatarSize = 80,
}: SkeletonCardProps): ReactElement {
  return (
    <div className="border-b border-hair pb-6">
      <Skeleton
        className="rounded-full mx-auto mb-4"
        width={avatarSize}
        height={avatarSize}
      />
      <Skeleton width="60%" height={16} className="mx-auto mb-2" />
      <Skeleton width="45%" height={12} className="mx-auto mb-1" />
      <Skeleton width="35%" height={11} className="mx-auto" />
    </div>
  );
}
