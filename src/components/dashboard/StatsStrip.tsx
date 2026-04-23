"use client";

import { useMemo, type ReactElement } from "react";

import { useStatsQuery } from "@/hooks/useStatsQuery";

export function StatsStrip(): ReactElement {
  const { data, isLoading } = useStatsQuery();

  const derived = useMemo(() => {
    if (!data) return null;
    const { maleCount, genderKnown, minAge, maxAge, avgAge } = data;

    const malePct =
      genderKnown === 0 ? 0 : Math.round((maleCount / genderKnown) * 100);
    const femalePct = genderKnown === 0 ? 0 : 100 - malePct;

    const ageRange = maxAge - minAge;
    const avgOffset =
      ageRange === 0 ? 50 : Math.round(((avgAge - minAge) / ageRange) * 100);

    return { malePct, femalePct, avgOffset };
  }, [data]);

  if (isLoading || !data || !derived) {
    return <div className="border-b border-hair py-6 px-6 shimmer h-[96px]" />;
  }

  const { malePct, femalePct, avgOffset } = derived;

  return (
    <div className="border-b border-hair bg-bg-raised">
      <div className="mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-ink-mute uppercase tracking-widest mb-1 font-mono">
            Total
          </p>
          <p className="font-display text-4xl font-semibold text-ink leading-none">
            {data.total}
          </p>
          <p className="text-xs text-ink-mute mt-1 font-mono">users</p>
        </div>

        <div>
          <p className="text-xs text-ink-mute uppercase tracking-widest mb-2 font-mono">
            Gender
          </p>
          <div className="h-1.5 rounded-full overflow-hidden bg-hair flex">
            <div
              className="bg-accent h-full transition-all duration-500"
              style={{ width: `${malePct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] font-mono text-ink-mute">
            <span>
              <span className="text-accent">M</span> {malePct}%
            </span>
            <span>
              <span className="text-ok">F</span> {femalePct}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-ink-mute uppercase tracking-widest mb-2 font-mono">
            Avg age
          </p>
          <div className="relative h-1.5 rounded-full bg-hair">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-raised shadow"
              style={{ left: `calc(${avgOffset}% - 5px)` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] font-mono text-ink-mute">
            <span>{data.minAge}</span>
            <span className="text-ink font-medium">{data.avgAge} avg</span>
            <span>{data.maxAge}</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-ink-mute uppercase tracking-widest mb-2 font-mono">
            Departments
          </p>
          <div className="flex flex-col gap-1">
            {data.topDepartments.slice(0, 3).map((dept, i) => (
              <div
                key={`${dept.name}-${i}`}
                className="flex items-center gap-2"
              >
                <span className="font-mono text-[10px] text-ink-mute w-3">
                  {i + 1}
                </span>
                <span className="font-mono text-[11px] text-ink-soft truncate flex-1">
                  {dept.name}
                </span>
                <span className="font-mono text-[11px] text-accent">
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
