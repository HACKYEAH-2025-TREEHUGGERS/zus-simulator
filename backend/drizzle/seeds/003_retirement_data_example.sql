-- Seed data for retirement_data table
-- This file contains example retirement calculations for testing

INSERT INTO retirement_data (
  age, gender, gross_salary, work_start_year, planned_retirement_year,
  account_balance, subaccount_balance, usage_hour, expected_pension,
  used_age, used_gender, used_salary, included_sick_leave,
  used_account_balance, used_subaccount_balance, actual_pension,
  realistic_pension, postal_code, created_at
) VALUES
  (
    35, 'female', 6500.00, 2010, 2050,
    45000.00, 12000.00, 14, 2800.00,
    35, 'female', 6500.00, false,
    45000.00, 12000.00, 2800.00, 2650.00,
    '00-001', NOW() - INTERVAL '7 days'
  ),
  (
    42, 'male', 8200.00, 2005, 2045,
    78000.00, 18000.00, 10, 3500.00,
    42, 'male', 8200.00, false,
    78000.00, 18000.00, 3500.00, 3300.00,
    '00-950', NOW() - INTERVAL '5 days'
  ),
  (
    50, 'female', 7800.00, 1998, 2038,
    125000.00, 28000.00, 16, 3200.00,
    50, 'female', 7800.00, true,
    125000.00, 28000.00, 3200.00, 2950.00,
    '31-008', NOW() - INTERVAL '3 days'
  ),
  (
    28, 'male', 5500.00, 2018, 2058,
    18000.00, 5000.00, 9, 2200.00,
    28, 'male', 5500.00, false,
    18000.00, 5000.00, 2200.00, 2100.00,
    '80-001', NOW() - INTERVAL '1 day'
  );
