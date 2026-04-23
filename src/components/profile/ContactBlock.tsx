import type { User } from "@/lib/types";

import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function ContactBlock({ user }: Props) {
  return (
    <ProfileSection title="Contact" headingId="contact-heading">
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <ProfileField label="Email" value={user.email} mono breakAll />
        <ProfileField label="Phone" value={user.phone} mono breakAll />
        <ProfileField
          label="IP address"
          value={user.ip ?? "—"}
          mono
          breakAll
        />
        <ProfileField
          label="MAC address"
          value={user.macAddress ?? "—"}
          mono
          breakAll
        />
        <div className="sm:col-span-2">
          <ProfileField label="User agent" value={user.userAgent} mono breakAll />
        </div>
      </dl>
    </ProfileSection>
  );
}
