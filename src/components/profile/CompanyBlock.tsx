import type { User } from "@/lib/types";

import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function CompanyBlock({ user }: Props) {
  const { company } = user;
  return (
    <ProfileSection title="Company" headingId="company-heading">
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <ProfileField label="Company" value={company.name} />
        <ProfileField label="Department" value={company.department} />
        <ProfileField label="Title" value={company.title} />
        <ProfileField label="EIN" value={user.ein ?? "—"} mono />
        <ProfileField
          className="col-span-2 sm:col-span-3"
          label="Office"
          value={`${company.address.address}, ${company.address.city}, ${company.address.state}, ${company.address.country}`}
        />
      </dl>
    </ProfileSection>
  );
}
