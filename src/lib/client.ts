import { PrismaClient } from '@prisma/client'

// FYI: In the development mode, whenever this prima is used, it will create a new DB connection, but for teh produciton, there will be only one connection, basically, if it is connected don't create another clients, otherwise, there will be 1000's of clients in teh productions, which may cause some issues

// Create a global variable of the current DB connection
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma =
    // If a connection already exists, use that or create a new one
    globalForPrisma.prisma || new PrismaClient()

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma