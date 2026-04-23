"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div
        className="text-center max-w-sm"
        role="alert"
        aria-live="assertive"
      >
        <p className="font-mono text-xs text-ink-mute mb-3 uppercase tracking-widest">
          Error
        </p>
        <h2 className="font-display text-3xl font-semibold text-ink mb-2">
          Something went wrong.
        </h2>
        <p className="text-sm text-ink-soft font-mono mb-6">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-accent text-accent-ink text-sm font-medium rounded-(--radius) hover:bg-accent-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
