import { readdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { existsSync } from 'fs';
import postgres from 'postgres';
import dotenv from 'dotenv';

// Try to load .env from multiple possible locations
const possibleEnvPaths = [
  resolve(__dirname, '../../../.env'), // From src/scripts to project root
  resolve(__dirname, '../../.env'), // From src to backend parent
  resolve(process.cwd(), '../.env'), // From current working dir
  resolve(process.cwd(), '.env'), // Current working dir
];

for (const envPath of possibleEnvPaths) {
  if (existsSync(envPath)) {
    console.log(`📄 Loading environment from: ${envPath}`);
    dotenv.config({ path: envPath });
    break;
  }
}

// Get DATABASE_URL or construct it from individual variables
let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  // Try to construct from individual PostgreSQL variables
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

  if (POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_DB) {
    const port = POSTGRES_PORT || '5432';
    const host = process.env.POSTGRES_HOST || 'localhost';
    DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${host}:${port}/${POSTGRES_DB}`;
    console.log('🔧 Constructed DATABASE_URL from environment variables');
  }
}

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  console.error(
    '💡 Either set DATABASE_URL directly, or provide POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB'
  );
  console.error('💡 Checked paths:');
  possibleEnvPaths.forEach(p => console.error(`   - ${p} ${existsSync(p) ? '✓' : '✗'}`));
  process.exit(1);
}

interface SeedResult {
  file: string;
  success: boolean;
  error?: string;
}

async function runSeeds() {
  const sql = postgres(DATABASE_URL!);
  const seedsDir = join(__dirname, '../../drizzle/seeds');

  console.log('🌱 Starting database seeding...\n');

  try {
    // Read all SQL files from the seeds directory
    const files = await readdir(seedsDir);
    const sqlFiles = files.filter(file => file.endsWith('.sql')).sort(); // Sort to ensure consistent ordering

    if (sqlFiles.length === 0) {
      console.log('⚠️  No seed files found in drizzle/seeds/');
      return;
    }

    console.log(`📁 Found ${sqlFiles.length} seed file(s):\n`);

    const results: SeedResult[] = [];

    // Execute each seed file
    for (const file of sqlFiles) {
      const filePath = join(seedsDir, file);

      try {
        console.log(`   Running: ${file}...`);
        const sqlContent = await readFile(filePath, 'utf-8');

        // Execute the SQL file
        await sql.unsafe(sqlContent);

        results.push({ file, success: true });
        console.log(`   ✅ Success: ${file}\n`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.push({ file, success: false, error: errorMessage });
        console.error(`   ❌ Failed: ${file}`);
        console.error(`      Error: ${errorMessage}\n`);
      }
    }

    // Print summary
    console.log('\n📊 Seeding Summary:');
    console.log('─'.repeat(50));

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📝 Total: ${results.length}`);

    if (failed > 0) {
      console.log('\n❌ Failed files:');
      results.filter(r => !r.success).forEach(r => console.log(`   - ${r.file}: ${r.error}`));
      process.exit(1);
    }

    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during seeding:');
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

// Run specific seed file if provided as argument
async function runSpecificSeed(filename: string) {
  const sql = postgres(DATABASE_URL!);
  const seedsDir = join(__dirname, '../../drizzle/seeds');
  const filePath = join(seedsDir, filename);

  console.log(`🌱 Running specific seed: ${filename}\n`);

  try {
    const sqlContent = await readFile(filePath, 'utf-8');
    await sql.unsafe(sqlContent);

    console.log(`✅ Successfully executed: ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to execute: ${filename}`);
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length > 0) {
  const filename = args[0];
  runSpecificSeed(filename).catch(console.error);
} else {
  runSeeds().catch(console.error);
}
