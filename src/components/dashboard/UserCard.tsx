"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

type UserCardProps = {
  user: User;
  index: number;
};

export default function UserCard({ user, index }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.25 }}
    >
      <Link
        href={`/users/${user.id}`}
        className="group block py-6 border-b border-[var(--hair)] text-center hover:bg-[var(--accent-muted)] transition-colors px-4 rounded-[var(--radius)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        aria-label={`View ${user.firstName} ${user.lastName}`}
      >
        <Avatar
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          size={72}
          className="mx-auto mb-3"
        />
        <p className="font-display font-semibold text-[var(--ink)] leading-tight group-hover:text-[var(--accent)] transition-colors">
          {user.firstName} {user.lastName}
        </p>
        <p className="font-mono text-[11px] text-[var(--ink-mute)] mt-0.5">
          @{user.username}
        </p>
        <p className="text-xs text-[var(--ink-soft)] mt-1.5">
          {user.company.title}
        </p>
        <p className="font-mono text-[10px] text-[var(--ink-mute)] mt-1">
          {user.company.department}
        </p>
      </Link>
    </motion.div>
  );
}
