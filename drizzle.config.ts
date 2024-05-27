import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/db/schema',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  dialect: 'sqlite',
  out: './drizzle'
});
