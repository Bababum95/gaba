import type { User } from "@/lib/types";

export default function VitalsBlock({ user }: { user: User }) {
  return (
    <section aria-labelledby="vitals-heading">
      <h2 id="vitals-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Vitals
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Height
          </dt>
          <dd className="font-display text-2xl font-semibold text-[var(--ink)]">
            {user.height}
            <span className="font-mono text-xs text-[var(--ink-mute)] ml-1">cm</span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Weight
          </dt>
          <dd className="font-display text-2xl font-semibold text-[var(--ink)]">
            {user.weight}
            <span className="font-mono text-xs text-[var(--ink-mute)] ml-1">kg</span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Blood group
          </dt>
          <dd className="font-display text-2xl font-semibold text-[var(--accent)]">
            {user.bloodGroup}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Eye color
          </dt>
          <dd className="text-sm text-[var(--ink-soft)]">{user.eyeColor}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Hair
          </dt>
          <dd className="text-sm text-[var(--ink-soft)]">
            {user.hair.color}, {user.hair.type}
          </dd>
        </div>
      </dl>
    </section>
  );
}
