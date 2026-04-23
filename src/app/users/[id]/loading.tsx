import { Skeleton } from "@/components/ui/Skeleton";

export default function ProfileLoading() {
  const sectionSkeleton = (rows: number) => (
    <div className="py-8 px-6 border-b border-hair space-y-4">
      <Skeleton width="30%" height={20} className="mb-4" />
      {Array.from({ length: rows }).map((_, j) => (
        <Skeleton key={j} width={`${40 + j * 10}%`} height={13} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="border-b border-hair py-10 px-6 bg-bg-raised">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <Skeleton width={96} height={96} className="rounded-full shrink-0" />
          <div className="flex-1">
            <Skeleton width="40%" height={48} className="mb-3" />
            <Skeleton width="25%" height={14} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 divide-x divide-hair">
          {sectionSkeleton(4)}
          {sectionSkeleton(4)}
        </div>
        <div className="grid lg:grid-cols-2 divide-x divide-hair">
          {sectionSkeleton(3)}
          {sectionSkeleton(3)}
        </div>
        <div className="grid lg:grid-cols-3 divide-x divide-hair">
          {sectionSkeleton(4)}
          {sectionSkeleton(3)}
          {sectionSkeleton(3)}
        </div>
      </div>
    </div>
  );
}
