"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactElement } from "react";

import { Avatar } from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

type Props = {
  user: User;
  index: number;
};

const roleColors: Record<string, string> = {
  admin: "text-accent border-accent",
  moderator: "text-ok border-ok",
  user: "text-ink-mute border-hair-strong",
};

export function UserRow({ user, index }: Props): ReactElement {
  const roleClass = roleColors[user.role] ?? "text-ink-mute border-hair-strong";
  const profileLabel = `View ${user.firstName} ${user.lastName}'s profile`;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.25 }}
      className="group border-b border-hair hover:bg-accent-muted transition-colors"
    >
      <td className="py-3 px-4">
        <Link
          href={`/users/${user.id}`}
          className="flex items-center gap-3 w-full min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
          aria-label={profileLabel}
        >
          <Avatar
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            size={36}
          />
          <span className="flex flex-col min-w-0 flex-1 text-left">
            <span className="font-display font-semibold text-ink leading-tight group-hover:text-accent transition-colors truncate">
              {user.firstName} {user.lastName}
            </span>
            <span className="font-mono text-[11px] text-ink-mute truncate">
              @{user.username}
            </span>
          </span>
        </Link>
      </td>

      <td className="py-3 px-4 hidden md:table-cell">
        <span className="text-sm text-ink-soft">{user.company.department}</span>
      </td>

      <td className="py-3 px-4 hidden lg:table-cell">
        <span className="text-sm text-ink-soft">{user.company.title}</span>
      </td>

      <td className="py-3 px-4 hidden xl:table-cell">
        <span className="font-mono text-xs text-ink-mute">
          {user.address.city}, {user.address.stateCode}
        </span>
      </td>

      <td className="py-3 px-4 hidden xl:table-cell">
        <span className="font-mono text-xs text-ink-mute">{user.age} y</span>
      </td>

      <td className="py-3 px-4">
        <span
          className={`inline-block px-2 py-0.5 text-[10px] font-mono border rounded-sm ${roleClass}`}
        >
          {user.role}
        </span>
      </td>
    </motion.tr>
  );
}
