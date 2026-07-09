import { PrismaClient } from "@prisma/client";

// Prevents exhausting the database connection pool in development,
// where Next.js hot-reloads modules and would otherwise instantiate
// a brand new PrismaClient on every save.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
