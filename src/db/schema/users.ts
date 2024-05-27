import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cryptoAddress: text('crypto_address').notNull().unique(),
  nickname: text('nickname').notNull(),
  description: text('description'),
  avatarImage: text('avatar_image'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
