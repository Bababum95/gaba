import { maskCardNumber } from "@/lib/format";
import type { User } from "@/lib/types";

import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function FinanceBlock({ user }: Props) {
  const { bank } = user;
  return (
    <ProfileSection title="Finance" headingId="finance-heading">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <ProfileField label="Card type" value={bank.cardType} />
        <ProfileField label="Currency" value={bank.currency} />
        <ProfileField
          label="Card number"
          value={maskCardNumber(bank.cardNumber)}
          mono
        />
        <ProfileField label="Expires" value={bank.cardExpire} mono />
        <ProfileField
          className="col-span-2"
          label="IBAN"
          value={bank.iban}
          mono
          breakAll
        />
        <ProfileField
          className="col-span-2"
          label="SSN"
          value={user.ssn ?? "—"}
          mono
        />
      </dl>
    </ProfileSection>
  );
}
