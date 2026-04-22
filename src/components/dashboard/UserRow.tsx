"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

type UserRowProps = {
  user: User;
  index: number;
};

const roleColors: Record<string, string> = {
  admin: "text-[var(--accent)] border-[var(--accent)]",
  moderator: "text-[var(--ok)] border-[var(--ok)]",
  user: "text-[var(--ink-mute)] border-[var(--hair-strong)]",
};

export default function UserRow({ user, index }: UserRowProps) {
  const roleClass =
    roleColors[user.role] ?? "text-[var(--ink-mute)] border-[var(--hair-strong)]";

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.25 }}
      className="group border-b border-[var(--hair)] hover:bg-[var(--accent-muted)] transition-colors"
    >
      <td className="py-3 px-4">
        <Link
          href={`/users/${user.id}`}
          className="flex items-center gap-3 focus:outline-none"
          tabIndex={-1}
        >
          <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} size={36} />
          <span className="flex flex-col">
            <span className="font-display font-semibold text-[var(--ink)] leading-tight group-hover:text-[var(--accent)] transition-colors">
              {user.firstName} {user.lastName}
            </span>
            <span className="font-mono text-[11px] text-[var(--ink-mute)]">
              @{user.username}
            </span>
          </span>
        </Link>
      </td>

      <td className="py-3 px-4 hidden md:table-cell">
        <span className="text-sm text-[var(--ink-soft)]">
          {user.company.department}
        </span>
      </td>

      <td className="py-3 px-4 hidden lg:table-cell">
        <span className="text-sm text-[var(--ink-soft)]">
          {user.company.title}
        </span>
      </td>

      <td className="py-3 px-4 hidden xl:table-cell">
        <span className="font-mono text-xs text-[var(--ink-mute)]">
          {user.address.city}, {user.address.stateCode}
        </span>
      </td>

      <td className="py-3 px-4 hidden xl:table-cell">
        <span className="font-mono text-xs text-[var(--ink-mute)]">
          {user.age} y
        </span>
      </td>

      <td className="py-3 px-4">
        <span
          className={`inline-block px-2 py-0.5 text-[10px] font-mono border rounded-[var(--radius-sm)] ${roleClass}`}
        >
          {user.role}
        </span>
      </td>

      <td className="py-3 px-4 w-8">
        <Link
          href={`/users/${user.id}`}
          className="text-[var(--ink-mute)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-0.5 inline-block"
          aria-label={`View ${user.firstName} ${user.lastName}'s profile`}
        >
          →
        </Link>
      </td>
    </motion.tr>
  );
}
