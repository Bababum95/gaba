import type { User } from "@/lib/types";

import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function VitalsBlock({ user }: Props) {
  return (
    <ProfileSection title="Vitals" headingId="vitals-heading">
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <ProfileField
          label="Height"
          value={
            <>
              {user.height}
              <span className="font-mono text-xs text-ink-mute ml-1">cm</span>
            </>
          }
          valueClassName="font-display text-2xl font-semibold text-ink"
        />
        <ProfileField
          label="Weight"
          value={
            <>
              {user.weight}
              <span className="font-mono text-xs text-ink-mute ml-1">kg</span>
            </>
          }
          valueClassName="font-display text-2xl font-semibold text-ink"
        />
        <ProfileField
          label="Blood group"
          value={user.bloodGroup}
          valueClassName="font-display text-2xl font-semibold text-accent"
        />
        <ProfileField label="Eye color" value={user.eyeColor} />
        <ProfileField
          label="Hair"
          value={`${user.hair.color}, ${user.hair.type}`}
        />
      </dl>
    </ProfileSection>
  );
}
