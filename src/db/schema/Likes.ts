import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core';
import { users } from './users';
export const likes = sqliteTable(
  'likes',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    likedById: integer('liked_by_id').references(() => users.id),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
  },
  (table) => {
    return {
      user_idx: uniqueIndex('l_user_id_idx').on(table.userId),
      liked_by_idx: index('liked_by_id').on(table.likedById)
    };
  }
);
