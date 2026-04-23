"use client";

import type { ReactElement } from "react";

import { SkeletonCard } from "@/components/ui/Skeleton";
import type { User } from "@/lib/types";

import { UserCard } from "./UserCard";
import { EmptyState } from "./EmptyState";

type Props = {
  users: User[];
  isLoading: boolean;
  query?: string;
};

export function UsersGrid({
  users,
  isLoading,
  query,
}: Props): ReactElement {
  if (!isLoading && users.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div
      role="list"
      aria-label="Users gallery"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0"
    >
      {isLoading
        ? Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="p-4" role="listitem">
              <SkeletonCard />
            </div>
          ))
        : users.map((user, i) => (
            <div key={user.id} role="listitem" className="min-w-0">
              <UserCard user={user} index={i} />
            </div>
          ))}
    </div>
  );
}
