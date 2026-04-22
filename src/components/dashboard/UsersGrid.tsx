"use client";

import { SkeletonCard } from "@/components/ui/Skeleton";
import type { User } from "@/lib/types";
import UserCard from "./UserCard";
import EmptyState from "./EmptyState";

type UsersGridProps = {
  users: User[];
  isLoading: boolean;
  query?: string;
};

export default function UsersGrid({ users, isLoading, query }: UsersGridProps) {
  if (!isLoading && users.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0">
      {isLoading
        ? Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="p-4">
              <SkeletonCard />
            </div>
          ))
        : users.map((user, i) => <UserCard key={user.id} user={user} index={i} />)}
    </div>
  );
}
