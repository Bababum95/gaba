import { describe, it, expect } from "vitest";
import { computeStats } from "@/lib/stats";
import { makeTestUser } from "./fixtures/user";

describe("computeStats", () => {
  it("handles empty array", () => {
    const stats = computeStats([]);
    expect(stats.total).toBe(0);
    expect(stats.avgAge).toBe(0);
    expect(stats.genderKnown).toBe(0);
  });

  it("counts genders correctly", () => {
    const users = [
      makeTestUser({ gender: "male" }),
      makeTestUser({ id: 2, gender: "female" }),
      makeTestUser({ id: 3, gender: "female" }),
    ];
    const stats = computeStats(users);
    expect(stats.maleCount).toBe(1);
    expect(stats.femaleCount).toBe(2);
    expect(stats.genderKnown).toBe(3);
  });

  it("uses genderKnown for bar denominator", () => {
    const users = [
      makeTestUser({ gender: "male" }),
      makeTestUser({ id: 2, gender: "female" }),
      makeTestUser({ id: 3, gender: "other" }),
    ];
    const stats = computeStats(users);
    expect(stats.total).toBe(3);
    expect(stats.genderKnown).toBe(2);
  });

  it("calculates average age", () => {
    const users = [makeTestUser({ age: 20 }), makeTestUser({ id: 2, age: 40 })];
    const stats = computeStats(users);
    expect(stats.avgAge).toBe(30);
    expect(stats.minAge).toBe(20);
    expect(stats.maxAge).toBe(40);
  });


  it("builds role breakdown", () => {
    const users = [
      makeTestUser({ role: "admin" }),
      makeTestUser({ id: 2, role: "user" }),
      makeTestUser({ id: 3, role: "user" }),
    ];
    const stats = computeStats(users);
    expect(stats.roleBreakdown[0]).toEqual({ role: "user", count: 2 });
    expect(stats.roleBreakdown[1]).toEqual({ role: "admin", count: 1 });
  });

  it("ranks departments by count", () => {
    const base = makeTestUser().company;
    const users = [
      makeTestUser({ company: { ...base, department: "Eng" } }),
      makeTestUser({ id: 2, company: { ...base, department: "Eng" } }),
      makeTestUser({ id: 3, company: { ...base, department: "HR" } }),
    ];
    const stats = computeStats(users);
    expect(stats.topDepartments[0].name).toBe("Eng");
    expect(stats.topDepartments[0].count).toBe(2);
  });
});
