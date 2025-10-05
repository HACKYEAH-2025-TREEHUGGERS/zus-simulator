import {
  pgTable,
  serial,
  text,
  timestamp,
  real,
  integer,
  decimal,
  boolean,
  varchar,
  numeric,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Example table schema - you can modify or add more tables as needed
export const funFacts = pgTable('fun_facts', {
  id: serial('id').primaryKey(),
  fact: text('fact').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

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

// Tabela z parametrami III - dane demograficzne (liczba osób w danym wieku w poszczególnych latach)
export const averageLifetime = pgTable('average_lifetime', {
  age: integer('age').primaryKey(),
  y_2014: real('y_2014'),
  y_2015: real('y_2015'),
  y_2016: real('y_2016'),
  y_2017: real('y_2017'),
  y_2018: real('y_2018'),
  y_2019: real('y_2019'),
  y_2020: real('y_2020'),
  y_2021: real('y_2021'),
  y_2022: real('y_2022'),
  y_2023: real('y_2023'),
  y_2024: real('y_2024'),
  y_2025: real('y_2025'),
  y_2026: real('y_2026'),
  y_2027: real('y_2027'),
  y_2028: real('y_2028'),
  y_2029: real('y_2029'),
  y_2030: real('y_2030'),
  y_2031: real('y_2031'),
  y_2032: real('y_2032'),
  y_2033: real('y_2033'),
  y_2034: real('y_2034'),
  y_2035: real('y_2035'),
  y_2036: real('y_2036'),
  y_2037: real('y_2037'),
  y_2038: real('y_2038'),
  y_2039: real('y_2039'),
  y_2040: real('y_2040'),
  y_2041: real('y_2041'),
  y_2042: real('y_2042'),
  y_2043: real('y_2043'),
  y_2044: real('y_2044'),
  y_2045: real('y_2045'),
  y_2046: real('y_2046'),
  y_2047: real('y_2047'),
  y_2048: real('y_2048'),
  y_2049: real('y_2049'),
  y_2050: real('y_2050'),
  y_2051: real('y_2051'),
  y_2052: real('y_2052'),
  y_2053: real('y_2053'),
  y_2054: real('y_2054'),
  y_2055: real('y_2055'),
  y_2056: real('y_2056'),
  y_2057: real('y_2057'),
  y_2058: real('y_2058'),
  y_2059: real('y_2059'),
  y_2060: real('y_2060'),
  y_2061: real('y_2061'),
  y_2062: real('y_2062'),
  y_2063: real('y_2063'),
  y_2064: real('y_2064'),
  y_2065: real('y_2065'),
  y_2066: real('y_2066'),
  y_2067: real('y_2067'),
  y_2068: real('y_2068'),
  y_2069: real('y_2069'),
  y_2070: real('y_2070'),
  y_2071: real('y_2071'),
  y_2072: real('y_2072'),
  y_2073: real('y_2073'),
  y_2074: real('y_2074'),
  y_2075: real('y_2075'),
  y_2076: real('y_2076'),
  y_2077: real('y_2077'),
  y_2078: real('y_2078'),
  y_2079: real('y_2079'),
  y_2080: real('y_2080'),
  y_2081: real('y_2081'),
  y_2082: real('y_2082'),
  y_2083: real('y_2083'),
  y_2084: real('y_2084'),
  y_2085: real('y_2085'),
  y_2086: real('y_2086'),
  y_2087: real('y_2087'),
  y_2088: real('y_2088'),
  y_2089: real('y_2089'),
  y_2090: real('y_2090'),
  y_2091: real('y_2091'),
  y_2092: real('y_2092'),
  y_2093: real('y_2093'),
  y_2094: real('y_2094'),
  y_2095: real('y_2095'),
  y_2096: real('y_2096'),
  y_2097: real('y_2097'),
  y_2098: real('y_2098'),
  y_2099: real('y_2099'),
  y_2100: real('y_2100'),
});

// Typy pomocnicze
export type RetirementProjectionParam = typeof retirementProjectionParams.$inferSelect;
export type NewRetirementProjectionParam = typeof retirementProjectionParams.$inferInsert;

export type AverageLifetime = typeof averageLifetime.$inferSelect;
export type NewAverageLifetime = typeof averageLifetime.$inferInsert;
