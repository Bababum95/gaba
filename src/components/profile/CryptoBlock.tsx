import type { User } from "@/lib/types";
import { truncateWallet } from "@/lib/format";

export default function CryptoBlock({ user }: { user: User }) {
  const { crypto } = user;
  return (
    <section aria-labelledby="crypto-heading">
      <h2 id="crypto-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Crypto
      </h2>
      <dl className="space-y-4">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Coin
          </dt>
          <dd className="text-sm text-[var(--ink-soft)]">{crypto.coin}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Network
          </dt>
          <dd className="text-sm text-[var(--ink-soft)]">{crypto.network}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-mute)] mb-0.5">
            Wallet
          </dt>
          <dd
            className="font-mono text-[11px] text-[var(--ink-soft)] break-all"
            title={crypto.wallet}
          >
            {truncateWallet(crypto.wallet, 10)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
