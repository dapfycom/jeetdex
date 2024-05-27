import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { replies } from './replies';
import { users } from './users';

export const mentions = sqliteTable('mentions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  replyId: integer('reply_id').references(() => replies.id),
  mentionedUserId: integer('mentioned_user_id').references(() => users.id),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
