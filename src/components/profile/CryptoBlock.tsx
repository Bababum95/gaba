import { truncateWallet } from "@/lib/format";
import type { User } from "@/lib/types";

import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function CryptoBlock({ user }: Props) {
  const crypto = user.crypto;
  return (
    <ProfileSection title="Crypto" headingId="crypto-heading">
      {!crypto ? (
        <p className="text-sm text-ink-mute font-mono">No wallet on file.</p>
      ) : (
        <dl className="space-y-4">
          <ProfileField label="Coin" value={crypto.coin} />
          <ProfileField label="Network" value={crypto.network} />
          <ProfileField
            label="Wallet"
            value={truncateWallet(crypto.wallet, 10)}
            mono
            breakAll
            valueClassName="text-[11px]"
          />
        </dl>
      )}
    </ProfileSection>
  );
}
