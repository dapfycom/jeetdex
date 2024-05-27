import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const followers = sqliteTable(
  'followers',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    followerId: integer('follower_id').references(() => users.id),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
  },
  (table) => {
    return {
      user_idx: uniqueIndex('f_user_id_idx').on(table.userId),
      follower_idx: index('follower_id_idx').on(table.followerId)
    };
  }
);
