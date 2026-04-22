import type { User } from "./types";

export type StatsData = {
  total: number;
  maleCount: number;
  femaleCount: number;
  avgAge: number;
  minAge: number;
  maxAge: number;
  topDepartments: { name: string; count: number }[];
  roleBreakdown: { role: string; count: number }[];
};

export function computeStats(users: User[]): StatsData {
  if (users.length === 0) {
    return {
      total: 0,
      maleCount: 0,
      femaleCount: 0,
      avgAge: 0,
      minAge: 0,
      maxAge: 0,
      topDepartments: [],
      roleBreakdown: [],
    };
  }

  const maleCount = users.filter((u) => u.gender === "male").length;
  const femaleCount = users.filter((u) => u.gender === "female").length;

  const ages = users.map((u) => u.age);
  const avgAge = Math.round(ages.reduce((s, a) => s + a, 0) / ages.length);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  const deptMap = new Map<string, number>();
  users.forEach((u) => {
    const d = u.company.department;
    deptMap.set(d, (deptMap.get(d) ?? 0) + 1);
  });
  const topDepartments = Array.from(deptMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const roleMap = new Map<string, number>();
  users.forEach((u) => {
    roleMap.set(u.role, (roleMap.get(u.role) ?? 0) + 1);
  });
  const roleBreakdown = Array.from(roleMap.entries())
    .map(([role, count]) => ({ role, count }))
    .sort((a, b) => b.count - a.count);

  return {
    total: users.length,
    maleCount,
    femaleCount,
    avgAge,
    minAge,
    maxAge,
    topDepartments,
    roleBreakdown,
  };
}
