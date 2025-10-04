# Database Seeds

This directory contains SQL files that seed the database with initial or test data.

## Quick Start

Run all seeds:

```bash
npm run db:seed
```

Run a specific seed:

```bash
npm run db:seed:file 001_users.sql
```

## Files

- `001_users.sql` - Example user accounts
- `002_avg_sick_leave_duration.sql` - County sick leave statistics
- `003_retirement_data_example.sql` - Sample retirement calculation records

## Adding New Seeds

1. Create a new `.sql` file with a numbered prefix (e.g., `004_my_seed.sql`)
2. Write your SQL statements
3. Use `ON CONFLICT` clauses to make seeds idempotent
4. Test with: `npm run db:seed:file 004_my_seed.sql`

See [../SEEDING.md](../SEEDING.md) for detailed documentation.
