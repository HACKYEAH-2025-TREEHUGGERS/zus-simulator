import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  varchar,
  numeric,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

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

export const avgSickLeaveDuration = pgTable(
  'avg_sick_leave_duration',
  {
    id: serial('id').primaryKey(),
    county_name: varchar('county_name', { length: 255 }).notNull(),
    avg_female_sick_leave_days: numeric('avg_female_sick_leave_days', {
      precision: 5,
      scale: 2,
    }).notNull(),
    avg_male_sick_leave_days: numeric('avg_male_sick_leave_days', {
      precision: 5,
      scale: 2,
    }).notNull(),
  },
  table => {
    return {
      nameIndex: uniqueIndex('county_name_idx').on(table.county_name),
    };
  }
);
export const retirementProjectionParams = pgTable('retirement_projection_params', {
  year: integer('year').primaryKey(),
  avg_annual_cpi: numeric('avg_annual_cpi', { precision: 7, scale: 5 }).notNull(),
  real_wage_growth_rate: numeric('real_wage_growth_rate', { precision: 7, scale: 5 }).notNull(),
  avg_monthly_wage: numeric('avg_monthly_wage', { precision: 10, scale: 2 }).notNull(),
  employee_contrib_rate: numeric('employee_contrib_rate', { precision: 5, scale: 2 }).notNull(), // %
  employer_contrib_rate: numeric('employer_contrib_rate', { precision: 5, scale: 2 }).notNull(), // %
  ofe_contrib_rate: numeric('ofe_contrib_rate', { precision: 5, scale: 2 }).notNull(), // %
  subaccount_contrib_rate: numeric('subaccount_contrib_rate', { precision: 5, scale: 2 }).notNull(), // %
  total_ofe_subaccount_rate: numeric('total_ofe_subaccount_rate', {
    precision: 5,
    scale: 2,
  }).notNull(), // %
  account_contrib_reval_rate: numeric('account_contrib_reval_rate', {
    precision: 6,
    scale: 4,
  }).notNull(), // Wskaźnik (%)
  subaccount_contrib_reval_rate: numeric('subaccount_contrib_reval_rate', {
    precision: 6,
    scale: 4,
  }).notNull(), // Wskaźnik (%)
  max_contrib_base_limit_percent: numeric('max_contrib_base_limit_percent', {
    precision: 5,
    scale: 2,
  }).notNull(), // %
  min_pension_amount: numeric('min_pension_amount', { precision: 8, scale: 2 }), // W PLN (dozwolone NULL)
});

// Typy pomocnicze
export type RetirementProjectionParam = typeof retirementProjectionParams.$inferSelect;
export type NewRetirementProjectionParam = typeof retirementProjectionParams.$inferInsert;
