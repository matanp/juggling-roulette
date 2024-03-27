import { Prisma, PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// User model type
export type User = Prisma.UserGetPayload<{
  include: {
    accounts: true;
    sessions: true;
  };
}>;

// Account model type
export type Account = Prisma.AccountGetPayload<{
  include: {
    user: true;
  };
}>;

// Session model type
export type Session = Prisma.SessionGetPayload<{
  include: {
    user: true;
  };
}>;

// VerificationRequest model type
export type VerificationRequest = Prisma.VerificationRequestGetPayload<{}>;

// RouletteCard model type
export type RouletteCard = Prisma.RouletteCardGetPayload<{}>;
