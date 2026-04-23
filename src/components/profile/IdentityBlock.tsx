import { formatBirthDate } from "@/lib/format";
import type { User } from "@/lib/types";

import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function IdentityBlock({ user }: Props) {
  return (
    <ProfileSection title="Identity" headingId="identity-heading">
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <ProfileField
          label="Full name"
          value={`${user.firstName} ${user.lastName}`}
        />
        {user.maidenName ? (
          <ProfileField label="Maiden name" value={user.maidenName} />
        ) : null}
        <ProfileField label="Username" value={`@${user.username}`} mono />
        <ProfileField label="Gender" value={user.gender} />
        <ProfileField
          label="Birth date"
          value={formatBirthDate(user.birthDate)}
        />
        <ProfileField label="Age" value={`${user.age} years`} />
        <ProfileField
          label="University"
          value={user.university ?? "—"}
        />
        <ProfileField label="Blood group" value={user.bloodGroup} mono />
        <ProfileField label="Eye color" value={user.eyeColor} />
        <ProfileField
          label="Hair"
          value={`${user.hair.color}, ${user.hair.type}`}
        />
        <ProfileField label="Height" value={`${user.height} cm`} mono />
        <ProfileField label="Weight" value={`${user.weight} kg`} mono />
      </dl>
    </ProfileSection>
  );
}
