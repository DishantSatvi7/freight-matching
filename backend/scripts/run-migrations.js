// backend/scripts/run-migrations.js
// Run: node scripts/run-migrations.js
require('dotenv').config({ path: '.env' });
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function runMigration() {
  const connectionString = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL_DIRECT or DATABASE_URL is not set in backend/.env');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected to database. Executing migrations...');

    const migrationPath = path.join(__dirname, '..', 'migrations', '001_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    await client.query(sql);
    console.log('✅ Migration 001_initial_schema.sql applied successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
