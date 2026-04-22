import type { User } from "@/lib/types";
import { formatBirthDate } from "@/lib/format";

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
        {label}
      </dt>
      <dd className={`text-sm text-[var(--ink-soft)] ${mono ? "font-mono" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

export default function IdentityBlock({ user }: { user: User }) {
  return (
    <section aria-labelledby="identity-heading">
      <h2 id="identity-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Identity
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <Field label="Full name" value={`${user.firstName} ${user.lastName}`} />
        {user.maidenName && <Field label="Maiden name" value={user.maidenName} />}
        <Field label="Username" value={`@${user.username}`} mono />
        <Field label="Gender" value={user.gender} />
        <Field label="Birth date" value={formatBirthDate(user.birthDate)} />
        <Field label="Age" value={`${user.age} years`} />
        <Field label="University" value={user.university} />
        <Field label="Blood group" value={user.bloodGroup} mono />
        <Field label="Eye color" value={user.eyeColor} />
        <Field label="Hair" value={`${user.hair.color}, ${user.hair.type}`} />
        <Field label="Height" value={`${user.height} cm`} mono />
        <Field label="Weight" value={`${user.weight} kg`} mono />
      </dl>
    </section>
  );
}
