import {
  pgTable,
  serial,
  text,
  timestamp, integer, real,
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
  averageAnnualCpiIndex: real('average_annual_cpi_index').notNull(), // średnioroczny wskaźnik cen towarów i usług konsumpcyjnych ogółem
  realWageGrowthIndex: real('real_wage_growth_index').notNull(), // wskaźnik realnego wzrostu przeciętnego wynagrodzenia
  averageMonthlyWage: real('average_monthly_wage').notNull(), // przeciętne miesięczne wynagrodzenie w gospodarce narodowej
  employeePensionContributionRate: real('employee_pension_contribution_rate').notNull(), // stopa składki na ubezpieczenie emerytalne finansowanej przez pracownika
  employerPensionContributionRate: real('employer_pension_contribution_rate').notNull(), // stopa składki na ubezpieczenie emerytalne finansowanej przez pracodawcę
  ofeContributionRate: real('ofe_contribution_rate').notNull(), // stopa składki na ubezpieczenie emerytalne odprowadzana do OFE
  subaccountContributionRate: real('subaccount_contribution_rate').notNull(), // stopa składki na ubezpieczenie emerytalne odprowadzana na subkonto
  totalOfeSubaccountRate: real('total_ofe_subaccount_rate').notNull(), // łączna stopa składki odprowadzanej do OFE i składki ewidencjonowanej na subkoncie
  accountValorizationIndex: real('account_valorization_index').notNull(), // wskaźnik waloryzacji składek zewidencjonowanych na koncie oraz kapitału początkowego za dany rok
  subaccountValorizationIndex: real('subaccount_valorization_index').notNull(), // wskaźnik waloryzacji składek zewidencjonowanych na subkoncie za dany rok
  contributionBaseUpperLimit: real('contribution_base_upper_limit').notNull(), // ograniczenie górne miesięcznej podstawy wymiaru składek na ubezpieczenie emerytalne w danym roku, wyrażone w procencie przeciętnego miesięcznego wynagrodzenia
  minimumPensionAmount: real('minimum_pension_amount').notNull(), // kwota najniższej emerytury obowiązująca od marca danego roku do lutego następnego roku
  averageYear: real('average_year').notNull(), // średnia rok
});

// Typy pomocnicze
export type RetirementProjectionParam = typeof retirementProjectionParams.$inferSelect;
export type NewRetirementProjectionParam = typeof retirementProjectionParams.$inferInsert;
