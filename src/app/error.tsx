"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="font-mono text-xs text-[var(--ink-mute)] mb-3 uppercase tracking-widest">
          Error
        </p>
        <h2 className="font-display text-3xl font-semibold text-[var(--ink)] mb-2">
          Something went wrong.
        </h2>
        <p className="text-sm text-[var(--ink-soft)] font-mono mb-6">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-medium rounded-[var(--radius)] hover:bg-[var(--accent-hover)] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
