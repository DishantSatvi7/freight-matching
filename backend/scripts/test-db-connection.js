// backend/scripts/test-db-connection.js
// Run: node scripts/test-db-connection.js
require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase/Neon
});

async function testConnection() {
  console.log('Testing connection to database...');
  const client = await pool.connect();
  console.log('✅ Connected to cloud database\n');

  try {
    // 1. PostGIS version
    const { rows: [postgis] } = await client.query('SELECT PostGIS_Version() AS version');
    console.log('PostGIS version:', postgis ? postgis.version : 'Not enabled');

    // 2. List tables
    const { rows: tables } = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('\nTables found:');
    tables.forEach(t => console.log(' ·', t.table_name));

    // 3. Geometry columns
    const { rows: geoCols } = await client.query(`
      SELECT f_table_name, f_geometry_column, type, srid
      FROM geometry_columns
      ORDER BY f_table_name
    `);
    console.log('\nGeometry columns:');
    geoCols.forEach(g =>
      console.log(` · ${g.f_table_name}.${g.f_geometry_column} → ${g.type} (SRID ${g.srid})`)
    );

    // 4. Proximity test query (trucks within 50km of Mumbai)
    const { rows: nearby } = await client.query(`
      SELECT COUNT(*) AS truck_count
      FROM trucks
      WHERE ST_DWithin(
        current_location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
    `, [72.8777, 19.0760, 50000]);
    console.log(`\nTrucks within 50km of Mumbai: ${nearby[0].truck_count}`);

    console.log('\n✅ All checks passed — cloud database is ready for production!\n');
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection().catch(err => {
  console.error('❌ Connection failed:', err.message);
  process.exit(1);
});
