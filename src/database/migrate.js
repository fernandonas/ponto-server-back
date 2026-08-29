const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { databaseUrl } = require('../config/env');

const pool = new Pool({ connectionString: databaseUrl });

async function migrate() {
  const migrationPath = path.join(__dirname, 'migrations', '001_create_users.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  await pool.query(sql);
  await pool.end();

  console.log('Migrations executadas com sucesso.');
}

migrate().catch(async (error) => {
  await pool.end();
  console.error('Erro ao executar migrations:', error.message);
  process.exit(1);
});
