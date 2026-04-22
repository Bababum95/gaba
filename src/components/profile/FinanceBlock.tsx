import type { User } from "@/lib/types";
import { maskCardNumber } from "@/lib/format";

export default function FinanceBlock({ user }: { user: User }) {
  const { bank } = user;
  return (
    <section aria-labelledby="finance-heading">
      <h2 id="finance-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Finance
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Card type
          </dt>
          <dd className="text-sm text-[var(--ink-soft)]">{bank.cardType}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Currency
          </dt>
          <dd className="font-mono text-sm text-[var(--ink-soft)]">{bank.currency}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Card number
          </dt>
          <dd className="font-mono text-sm text-[var(--ink-soft)]">
            {maskCardNumber(bank.cardNumber)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Expires
          </dt>
          <dd className="font-mono text-sm text-[var(--ink-soft)]">{bank.cardExpire}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            IBAN
          </dt>
          <dd className="font-mono text-sm text-[var(--ink-soft)] break-all">{bank.iban}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            SSN
          </dt>
          <dd className="font-mono text-sm text-[var(--ink-soft)]">{user.ssn}</dd>
        </div>
      </dl>
    </section>
  );
}
