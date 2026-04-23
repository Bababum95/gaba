import type { ReactElement } from "react";

import { Avatar } from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

const roleColors: Record<string, string> = {
  admin: "text-accent border-accent",
  moderator: "text-ok border-ok",
  user: "text-ink-mute border-hair-strong",
};

type Props = {
  user: User;
};

export function ProfileHeader({ user }: Props): ReactElement {
  const roleClass = roleColors[user.role] ?? "text-ink-mute border-hair-strong";

  return (
    <div className="border-b border-hair py-10 px-6 bg-bg-raised">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          size={96}
          className="shrink-0"
        />
        <div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-ink leading-none">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-2 font-mono text-sm text-ink-mute flex flex-wrap items-center gap-3">
            <span>@{user.username}</span>
            <span className="text-hair-strong">·</span>
            <span>{user.age} years old</span>
            <span className="text-hair-strong">·</span>
            <span
              className={`border rounded-sm px-2 py-0.5 text-[11px] ${roleClass}`}
            >
              {user.role}
            </span>
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {user.company.title} · {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
}
