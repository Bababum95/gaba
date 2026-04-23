import { z } from "zod";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const AddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  coordinates: CoordinatesSchema,
  country: z.string(),
});

const HairSchema = z.object({
  color: z.string(),
  type: z.string(),
});

const BankSchema = z.object({
  cardExpire: z.string(),
  cardNumber: z.string(),
  cardType: z.string(),
  currency: z.string(),
  iban: z.string(),
});

const CompanyAddressSchema = AddressSchema;

const CompanySchema = z.object({
  department: z.string(),
  name: z.string(),
  title: z.string(),
  address: CompanyAddressSchema,
});

const CryptoSchema = z.object({
  coin: z.string(),
  wallet: z.string(),
  network: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: HairSchema,
  ip: z.string().optional(),
  address: AddressSchema,
  macAddress: z.string().optional(),
  university: z.string().optional(),
  bank: BankSchema,
  company: CompanySchema,
  ein: z.string().optional(),
  ssn: z.string().optional(),
  userAgent: z.string(),
  crypto: CryptoSchema.optional(),
  role: z.string(),
});

export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
