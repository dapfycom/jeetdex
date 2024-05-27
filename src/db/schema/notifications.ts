import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const notifications = sqliteTable('notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(), // e.g., 'reply', 'follow', 'like', 'other'
  relatedUserId: integer('related_user_id').references(() => users.id),
  message: text('message'),
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
