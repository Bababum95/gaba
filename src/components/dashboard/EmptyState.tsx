import type { ReactElement } from "react";

type Props = {
  query?: string;
};

export function EmptyState({ query }: Props): ReactElement {
  return (
    <div
      className="py-24 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="font-display text-2xl font-semibold text-ink-soft italic">
        Nothing filed under these criteria.
      </p>
      {query && (
        <p className="mt-2 font-mono text-sm text-ink-mute">
          No results for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
