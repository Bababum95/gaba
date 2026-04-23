"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactElement } from "react";

import { Avatar } from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

const MAX_ANIM_INDEX = 20;

type Props = {
  user: User;
  index: number;
};

export function UserCard({ user, index }: Props): ReactElement {
  const delay = index < MAX_ANIM_INDEX ? index * 0.02 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      <Link
        href={`/users/${user.id}`}
        className="group block py-6 border-b border-hair text-center hover:bg-accent-muted transition-colors px-4 rounded-(--radius) focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`View ${user.firstName} ${user.lastName}`}
      >
        <Avatar
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          size={72}
          className="mx-auto mb-3"
        />
        <p className="font-display font-semibold text-ink leading-tight group-hover:text-accent transition-colors">
          {user.firstName} {user.lastName}
        </p>
        <p className="font-mono text-[11px] text-ink-mute mt-0.5">
          @{user.username}
        </p>
        <p className="text-xs text-ink-soft mt-1.5">{user.company.title}</p>
        <p className="font-mono text-[10px] text-ink-mute mt-1">
          {user.company.department}
        </p>
      </Link>
    </motion.div>
  );
}
