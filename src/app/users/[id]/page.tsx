import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchUserById } from "@/lib/api";
import { ApiError } from "@/lib/api";
import BackLink from "@/components/profile/BackLink";
import ProfileHeader from "@/components/profile/ProfileHeader";
import IdentityBlock from "@/components/profile/IdentityBlock";
import ContactBlock from "@/components/profile/ContactBlock";
import AddressBlock from "@/components/profile/AddressBlock";
import CompanyBlock from "@/components/profile/CompanyBlock";
import FinanceBlock from "@/components/profile/FinanceBlock";
import VitalsBlock from "@/components/profile/VitalsBlock";
import CryptoBlock from "@/components/profile/CryptoBlock";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const uid = parseInt(id, 10);
  if (isNaN(uid)) return { title: "User not found" };
  try {
    const user = await fetchUserById(uid);
    return {
      title: `${user.firstName} ${user.lastName} — Users Dashboard`,
      description: `${user.company.title} at ${user.company.name}`,
    };
  } catch {
    return { title: "User not found" };
  }
}

const sectionClass = "py-8 px-6 border-b border-[var(--hair)]";
const innerClass = "max-w-screen-xl mx-auto";

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;
  const uid = parseInt(id, 10);

  if (isNaN(uid)) notFound();

  let user;
  try {
    user = await fetchUserById(uid);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <div className="border-b border-[var(--hair)] px-6 py-3 bg-[var(--bg)]">
        <div className="max-w-screen-xl mx-auto">
          <BackLink />
        </div>
      </div>

      <ProfileHeader user={user} />

      {/* Two-column grid on desktop */}
      <div className="max-w-screen-xl mx-auto">

        {/* Identity + Contact */}
        <div className="grid lg:grid-cols-2 gap-0 lg:divide-x divide-[var(--hair)]">
          <div className={sectionClass}>
            <div className={innerClass}>
              <IdentityBlock user={user} />
            </div>
          </div>
          <div className={sectionClass}>
            <div className={innerClass}>
              <ContactBlock user={user} />
            </div>
          </div>
        </div>

        {/* Address + Company */}
        <div className="grid lg:grid-cols-2 gap-0 lg:divide-x divide-[var(--hair)]">
          <div className={sectionClass}>
            <div className={innerClass}>
              <AddressBlock user={user} />
            </div>
          </div>
          <div className={sectionClass}>
            <div className={innerClass}>
              <CompanyBlock user={user} />
            </div>
          </div>
        </div>

        {/* Finance + Vitals + Crypto */}
        <div className="grid lg:grid-cols-3 gap-0 lg:divide-x divide-[var(--hair)]">
          <div className={sectionClass}>
            <div className={innerClass}>
              <FinanceBlock user={user} />
            </div>
          </div>
          <div className={sectionClass}>
            <div className={innerClass}>
              <VitalsBlock user={user} />
            </div>
          </div>
          <div className={sectionClass}>
            <div className={innerClass}>
              <CryptoBlock user={user} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
