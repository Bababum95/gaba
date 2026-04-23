import type { ReactNode } from "react";

type ProfileSectionProps = {
  title: string;
  headingId: string;
  children: ReactNode;
  className?: string;
};

export function ProfileSection({
  title,
  headingId,
  children,
  className,
}: ProfileSectionProps) {
  return (
    <section aria-labelledby={headingId} className={className}>
      <h2
        id={headingId}
        className="font-display text-xl font-semibold text-ink mb-4"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
