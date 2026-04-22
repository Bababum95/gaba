import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-mute)] hover:text-[var(--accent)] transition-colors group"
    >
      <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
      All users
    </Link>
  );
}
