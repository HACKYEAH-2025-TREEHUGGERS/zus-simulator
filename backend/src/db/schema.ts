import { pgTable, serial, text, timestamp, integer, decimal, boolean } from 'drizzle-orm/pg-core';

// Example table schema - you can modify or add more tables as needed
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const retirementData = pgTable('retirement_data', {
  id: serial('id').primaryKey(),
  // User information
  age: integer('age').notNull(),
  gender: text('gender').notNull(), // 'male' or 'female'
  gross_salary: decimal('gross_salary', { precision: 10, scale: 2 }).notNull(),
  work_start_year: integer('work_start_year').notNull(),
  planned_retirement_year: integer('planned_retirement_year').notNull(),
  account_balance: decimal('account_balance', { precision: 12, scale: 2 }).notNull(),
  subaccount_balance: decimal('subaccount_balance', { precision: 12, scale: 2 }).notNull(),

  // Usage data
  usage_date: timestamp('usage_date').defaultNow().notNull(),
  usage_hour: integer('usage_hour').notNull(),
  expected_pension: decimal('expected_pension', { precision: 10, scale: 2 }),
  used_age: integer('used_age').notNull(),
  used_gender: text('used_gender').notNull(),
  used_salary: decimal('used_salary', { precision: 10, scale: 2 }).notNull(),
  included_sick_leave: boolean('included_sick_leave').notNull().default(false),
  used_account_balance: decimal('used_account_balance', { precision: 12, scale: 2 }).notNull(),
  used_subaccount_balance: decimal('used_subaccount_balance', {
    precision: 12,
    scale: 2,
  }).notNull(),
  actual_pension: decimal('actual_pension', { precision: 10, scale: 2 }).notNull(),
  realistic_pension: decimal('realistic_pension', { precision: 10, scale: 2 }).notNull(),
  postal_code: text('postal_code').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
