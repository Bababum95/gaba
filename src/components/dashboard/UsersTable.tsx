"use client";

import type { ReactElement } from "react";

import { SkeletonRow } from "@/components/ui/Skeleton";
import type { User } from "@/lib/types";

import { UserRow } from "./UserRow";
import { EmptyState } from "./EmptyState";

type Props = {
  users: User[];
  isLoading: boolean;
  query?: string;
};

export function UsersTable({ users, isLoading, query }: Props): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-sm border-collapse overflow-hidden"
        aria-label="Users list"
      >
        <thead>
          <tr className="border-b-2 border-hair text-left">
            <th className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute font-medium">
              User
            </th>
            <th className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute font-medium hidden md:table-cell">
              Department
            </th>
            <th className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute font-medium hidden lg:table-cell">
              Title
            </th>
            <th className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute font-medium hidden xl:table-cell">
              Location
            </th>
            <th className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute font-medium hidden xl:table-cell">
              Age
            </th>
            <th className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute font-medium">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <SkeletonRow key={i} columns={6} />
            ))
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <EmptyState query={query} />
              </td>
            </tr>
          ) : (
            users.map((user, i) => (
              <UserRow key={user.id} user={user} index={i} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
