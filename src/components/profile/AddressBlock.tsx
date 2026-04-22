import type { User } from "@/lib/types";

export default function AddressBlock({ user }: { user: User }) {
  const { address } = user;
  const { lat, lng } = address.coordinates;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <section aria-labelledby="address-heading">
      <h2 id="address-heading" className="font-display text-xl font-semibold text-[var(--ink)] mb-4">
        Address
      </h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-[var(--ink-soft)]">{address.address}</p>
          <p className="text-sm text-[var(--ink-soft)]">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-sm text-[var(--ink-soft)]">{address.country}</p>
        </div>
        <p className="font-mono text-[11px] text-[var(--ink-mute)]">
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--hair)] mt-3">
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
    </section>
  );
}
