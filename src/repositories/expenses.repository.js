const pool = require('../database/pool');

async function create({ value, created_by }) {
  const result = await pool.query(
    `INSERT INTO expenses (value, created_by)
     VALUES ($1, $2)
     RETURNING id, value, created_at`,
    [value, created_by]
  );

  return mapExpense(result.rows[0]);
}

function mapExpense(row) {
  return {
    id: row.id,
    value: row.value,
    createdAt: row.created_at,
  };
}

module.exports = {
  create,
};