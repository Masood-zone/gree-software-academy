import { PrismaClient } from "@prisma/client";

// Regular Node.js Prisma Client instance for environments where edge/accelerate is not required
// This is suitable for NextAuth's PrismaAdapter which expects a standard PrismaClient
export const prismaNode = new PrismaClient();
