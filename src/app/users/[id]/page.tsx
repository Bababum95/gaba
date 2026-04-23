import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ApiError, fetchUserById } from "@/lib/api";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { IdentityBlock } from "@/components/profile/IdentityBlock";
import { ContactBlock } from "@/components/profile/ContactBlock";
import { AddressBlock } from "@/components/profile/AddressBlock";
import { CompanyBlock } from "@/components/profile/CompanyBlock";
import { FinanceBlock } from "@/components/profile/FinanceBlock";
import { VitalsBlock } from "@/components/profile/VitalsBlock";
import { CryptoBlock } from "@/components/profile/CryptoBlock";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const uid = parseInt(id, 10);
  if (Number.isNaN(uid)) return { title: "User not found" };
  try {
    const user = await fetchUserById(uid);
    return {
      title: `${user.firstName} ${user.lastName} — Users Dashboard`,
      description: `${user.company.title} at ${user.company.name}`,
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { title: "User not found" };
    }
    return { title: "Error loading user" };
  }
}

const sectionClass = "py-8 px-6 border-b border-hair";
const innerClass = "max-w-screen-xl mx-auto";

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;
  const uid = parseInt(id, 10);

  if (Number.isNaN(uid)) notFound();

  let user;
  try {
    user = await fetchUserById(uid);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="min-h-screen">
      <ProfileHeader user={user} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 lg:divide-x divide-hair">
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

        <div className="grid lg:grid-cols-2 gap-0 lg:divide-x divide-hair">
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

        <div className="grid lg:grid-cols-3 gap-0 lg:divide-x divide-hair">
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
