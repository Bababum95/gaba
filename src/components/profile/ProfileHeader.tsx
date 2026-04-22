import Avatar from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

const roleColors: Record<string, string> = {
  admin: "text-[var(--accent)] border-[var(--accent)]",
  moderator: "text-[var(--ok)] border-[var(--ok)]",
  user: "text-[var(--ink-mute)] border-[var(--hair-strong)]",
};

export default function ProfileHeader({ user }: { user: User }) {
  const roleClass =
    roleColors[user.role] ?? "text-[var(--ink-mute)] border-[var(--hair-strong)]";

  return (
    <div className="border-b border-[var(--hair)] py-10 px-6 bg-[var(--bg-raised)]">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          size={96}
          className="shrink-0"
        />
        <div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-[var(--ink)] leading-none">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-2 font-mono text-sm text-[var(--ink-mute)] flex flex-wrap items-center gap-3">
            <span>@{user.username}</span>
            <span className="text-[var(--hair-strong)]">·</span>
            <span>{user.age} years old</span>
            <span className="text-[var(--hair-strong)]">·</span>
            <span className={`border rounded-[var(--radius-sm)] px-2 py-0.5 text-[11px] ${roleClass}`}>
              {user.role}
            </span>
          </p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            {user.company.title} · {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
}
