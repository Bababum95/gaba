import { describe, it, expect } from "vitest";
import { computeStats } from "@/lib/stats";
import type { User } from "@/lib/types";

const makeUser = (overrides: Partial<User>): User => ({
  id: 1,
  firstName: "Test",
  lastName: "User",
  maidenName: "",
  age: 30,
  gender: "male",
  email: "test@example.com",
  phone: "+1 000-000-0000",
  username: "testuser",
  password: "pass",
  birthDate: "1994-01-01",
  image: "https://example.com/img.png",
  bloodGroup: "A+",
  height: 175,
  weight: 70,
  eyeColor: "Blue",
  hair: { color: "Black", type: "Straight" },
  ip: "0.0.0.0",
  address: {
    address: "1 Main St",
    city: "City",
    state: "State",
    stateCode: "ST",
    postalCode: "00000",
    coordinates: { lat: 0, lng: 0 },
    country: "Country",
  },
  macAddress: "00:00:00:00:00:00",
  university: "Test Uni",
  bank: {
    cardExpire: "01/30",
    cardNumber: "1234567890123456",
    cardType: "Visa",
    currency: "USD",
    iban: "US00TEST",
  },
  company: {
    department: "Engineering",
    name: "ACME",
    title: "Engineer",
    address: {
      address: "1 Corp St",
      city: "City",
      state: "State",
      stateCode: "ST",
      postalCode: "00000",
      coordinates: { lat: 0, lng: 0 },
      country: "Country",
    },
  },
  ein: "000-000",
  ssn: "000-00-0000",
  userAgent: "Mozilla/5.0",
  crypto: { coin: "Bitcoin", wallet: "0x000", network: "ERC20" },
  role: "user",
  ...overrides,
});

describe("computeStats", () => {
  it("handles empty array", () => {
    const stats = computeStats([]);
    expect(stats.total).toBe(0);
    expect(stats.avgAge).toBe(0);
  });

  it("counts genders correctly", () => {
    const users = [
      makeUser({ gender: "male" }),
      makeUser({ gender: "female" }),
      makeUser({ gender: "female" }),
    ];
    const stats = computeStats(users);
    expect(stats.maleCount).toBe(1);
    expect(stats.femaleCount).toBe(2);
  });

  it("calculates average age", () => {
    const users = [makeUser({ age: 20 }), makeUser({ age: 40 })];
    const stats = computeStats(users);
    expect(stats.avgAge).toBe(30);
  });

  it("ranks departments by count", () => {
    const users = [
      makeUser({ company: { ...makeUser({}).company, department: "Eng" } }),
      makeUser({ company: { ...makeUser({}).company, department: "Eng" } }),
      makeUser({ company: { ...makeUser({}).company, department: "HR" } }),
    ];
    const stats = computeStats(users);
    expect(stats.topDepartments[0].name).toBe("Eng");
    expect(stats.topDepartments[0].count).toBe(2);
  });
});
