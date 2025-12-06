import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  const postgresUser = process.env.POSTGRES_USER || 'postgres';
  const postgresPassword = process.env.POSTGRES_PASSWORD || 'postgres';
  const postgresDb = process.env.POSTGRES_DB || 'oly_portfolio';
  const postgresPort = process.env.POSTGRES_PORT || '5432';
  const postgresHost = process.env.POSTGRES_HOST || 'localhost';
  
  return `postgresql://${postgresUser}:${postgresPassword}@${postgresHost}:${postgresPort}/${postgresDb}?schema=public`;
};

const databaseUrl = getDatabaseUrl();
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

