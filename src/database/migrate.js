const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { databaseUrl } = require('../config/env');

const pool = new Pool({
  connectionString: databaseUrl,
});

async function migrate() {
  try {
    const migrationsPath = path.join(__dirname, 'migrations');

    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const migrationFile of migrationFiles) {
      console.log(`Executando migration: ${migrationFile}`);

      const migrationPath = path.join(migrationsPath, migrationFile);
      const sql = fs.readFileSync(migrationPath, 'utf8');

      await pool.query(sql);

      console.log(`Migration ${migrationFile} executada com sucesso.`);
    }

    console.log('Todas as migrations foram executadas com sucesso.');
  } catch (error) {
    console.error('Erro ao executar migrations:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();