import type { ReactElement } from "react";

import type { User } from "@/lib/types";

import { ProfileSection } from "./ProfileSection";

type Props = {
  user: User;
};

export function AddressBlock({ user }: Props): ReactElement {
  const { address } = user;
  const { lat, lng } = address.coordinates;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <ProfileSection title="Address" headingId="address-heading">
      <div className="space-y-3">
        <div>
          <p className="text-sm text-ink-soft">{address.address}</p>
          <p className="text-sm text-ink-soft">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-sm text-ink-soft">{address.country}</p>
        </div>
        <p className="font-mono text-[11px] text-ink-mute">
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
        <div className="overflow-hidden rounded-md border border-hair mt-3">
          <iframe
            title={`Map location of ${user.firstName} ${user.lastName}`}
            src={mapSrc}
            width="100%"
            height="200"
            loading="lazy"
            className="block"
          />
        </div>
      </div>
    </ProfileSection>
  );
}
