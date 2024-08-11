import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare the type for the global object extension
declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

// Use an existing instance of PrismaClient if it exists, otherwise create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Ensure the instance is available globally in non-production environments to prevent new instances
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
