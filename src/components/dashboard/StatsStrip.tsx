"use client";

import { useStatsQuery } from "@/hooks/useStatsQuery";

export default function StatsStrip() {
  const { data, isLoading } = useStatsQuery();

  if (isLoading || !data) {
    return (
      <div className="border-b border-[var(--hair)] py-6 px-6 shimmer h-[96px]" />
    );
  }

  const malePct = Math.round((data.maleCount / data.total) * 100);
  const femalePct = 100 - malePct;
  const ageRange = data.maxAge - data.minAge;
  const avgOffset = Math.round(((data.avgAge - data.minAge) / ageRange) * 100);

  return (
    <div className="border-b border-[var(--hair)] bg-[var(--bg-raised)]">
      <div className="max-w-screen-2xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Total */}
        <div>
          <p className="text-xs text-[var(--ink-mute)] uppercase tracking-widest mb-1 font-mono">
            Total
          </p>
          <p className="font-display text-4xl font-semibold text-[var(--ink)] leading-none">
            {data.total}
          </p>
          <p className="text-xs text-[var(--ink-mute)] mt-1 font-mono">users</p>
        </div>

        {/* Gender */}
        <div>
          <p className="text-xs text-[var(--ink-mute)] uppercase tracking-widest mb-2 font-mono">
            Gender
          </p>
          <div className="h-1.5 rounded-full overflow-hidden bg-[var(--hair)] flex">
            <div
              className="bg-[var(--accent)] h-full transition-all duration-500"
              style={{ width: `${malePct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] font-mono text-[var(--ink-mute)]">
            <span>
              <span className="text-[var(--accent)]">M</span> {malePct}%
            </span>
            <span>
              <span className="text-[var(--ok)]">F</span> {femalePct}%
            </span>
          </div>
        </div>

        {/* Avg Age */}
        <div>
          <p className="text-xs text-[var(--ink-mute)] uppercase tracking-widest mb-2 font-mono">
            Avg age
          </p>
          <div className="relative h-1.5 rounded-full bg-[var(--hair)]">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-raised)] shadow"
              style={{ left: `calc(${avgOffset}% - 5px)` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] font-mono text-[var(--ink-mute)]">
            <span>{data.minAge}</span>
            <span className="text-[var(--ink)] font-medium">{data.avgAge} avg</span>
            <span>{data.maxAge}</span>
          </div>
        </div>

        {/* Top Departments */}
        <div>
          <p className="text-xs text-[var(--ink-mute)] uppercase tracking-widest mb-2 font-mono">
            Departments
          </p>
          <div className="flex flex-col gap-1">
            {data.topDepartments.slice(0, 3).map((dept, i) => (
              <div key={dept.name} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[var(--ink-mute)] w-3">
                  {i + 1}
                </span>
                <span className="font-mono text-[11px] text-[var(--ink-soft)] truncate flex-1">
                  {dept.name}
                </span>
                <span className="font-mono text-[11px] text-[var(--accent)]">
                  {dept.count}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
