import { Skeleton } from "@/components/ui/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-[var(--hair)] px-6 py-3">
        <Skeleton width={80} height={14} />
      </div>
      <div className="border-b border-[var(--hair)] py-10 px-6 bg-[var(--bg-raised)]">
        <div className="max-w-screen-xl mx-auto flex items-center gap-6">
          <Skeleton width={96} height={96} className="rounded-full shrink-0" />
          <div className="flex-1">
            <Skeleton width="40%" height={48} className="mb-3" />
            <Skeleton width="25%" height={14} />
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 divide-x divide-[var(--hair)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="py-8 px-6 border-b border-[var(--hair)] space-y-4">
            <Skeleton width="30%" height={20} className="mb-4" />
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} width={`${40 + j * 10}%`} height={13} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
