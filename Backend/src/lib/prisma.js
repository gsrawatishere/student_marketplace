import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
  });

// Prevent multiple Prisma instances during hot reload (important for dev)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;