import type { User } from "@/lib/types";

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

export default function CompanyBlock({ user }: { user: User }) {
  const { company } = user;
  return (
    <section aria-labelledby="company-heading">
      <h2 id="company-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Company
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <Field label="Company" value={company.name} />
        <Field label="Department" value={company.department} />
        <Field label="Title" value={company.title} />
        <Field label="EIN" value={user.ein} mono />
        <div className="col-span-2 sm:col-span-3">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Office
          </dt>
          <dd className="text-sm text-[var(--ink-soft)]">
            {company.address.address}, {company.address.city},{" "}
            {company.address.state}, {company.address.country}
          </dd>
        </div>
      </dl>
    </section>
  );
}
