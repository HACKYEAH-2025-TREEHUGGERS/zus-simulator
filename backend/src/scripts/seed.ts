import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

interface SeedResult {
  file: string;
  success: boolean;
  error?: string;
}

async function runSeeds() {
  const sql = postgres(DATABASE_URL!);
  const seedsDir = join(__dirname, '../drizzle/seeds');

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
  const seedsDir = join(__dirname, '../drizzle/seeds');
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
