import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Example table schema - you can modify or add more tables as needed
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
