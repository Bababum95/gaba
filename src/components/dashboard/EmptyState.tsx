export default function EmptyState({ query }: { query?: string }) {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-2xl font-semibold text-[var(--ink-soft)] italic">
        Nothing filed under these criteria.
      </p>
      {query && (
        <p className="mt-2 font-mono text-sm text-[var(--ink-mute)]">
          No results for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
