import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="font-mono text-xs text-[var(--ink-mute)] mb-3 uppercase tracking-widest">
          404
        </p>
        <h1 className="font-display text-4xl font-semibold text-[var(--ink)] mb-2 italic">
          User not found.
        </h1>
        <p className="text-sm text-[var(--ink-soft)] font-mono mb-6">
          No record exists for this ID.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-medium rounded-[var(--radius)] hover:bg-[var(--accent-hover)] transition-colors"
        >
          ← Back to all users
        </Link>
      </div>
    </div>
  );
}
