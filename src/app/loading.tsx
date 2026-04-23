import { SkeletonRow } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-hair px-6 py-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="h-7 w-24 shimmer rounded" />
        </div>
      </header>
      <div className="border-b border-hair h-[96px] shimmer" />
      <div className="border-b border-hair h-[80px] shimmer" />
      <table className="w-full">
        <tbody>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
