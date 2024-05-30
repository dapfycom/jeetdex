import { PrismaClient } from '@prisma/client';

import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

let prisma: PrismaClient;
const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`
});

const adapter = new PrismaLibSQL(libsql);

if (process.env.NODE_ENV === 'production') {
  prisma =
    process.env.USE_LOCAL_DB === 'true'
      ? new PrismaClient()
      : new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    global.prisma =
      process.env.USE_LOCAL_DB === 'true'
        ? new PrismaClient()
        : new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export default prisma;
