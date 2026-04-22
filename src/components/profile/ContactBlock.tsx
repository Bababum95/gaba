import type { User } from "@/lib/types";

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
        {label}
      </dt>
      <dd className={`text-sm text-[var(--ink-soft)] break-all ${mono ? "font-mono" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

export default function ContactBlock({ user }: { user: User }) {
  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Contact
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <Field label="Email" value={user.email} mono />
        <Field label="Phone" value={user.phone} mono />
        <Field label="IP address" value={user.ip} mono />
        <Field label="MAC address" value={user.macAddress} mono />
        <div className="sm:col-span-2">
          <Field label="User agent" value={user.userAgent} mono />
        </div>
      </dl>
    </section>
  );
}
