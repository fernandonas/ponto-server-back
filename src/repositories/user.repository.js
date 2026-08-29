const pool = require('../database/pool');

function mapUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function create({ name, email, passwordHash, role }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, passwordHash, role]
  );

  return mapUser(result.rows[0]);
}

async function count() {
  const result = await pool.query('SELECT COUNT(*)::int AS total FROM users');

  return result.rows[0].total;
}

async function findAll() {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at
     FROM users
     ORDER BY created_at DESC`
  );

  return result.rows.map(mapUser);
}

async function findById(id) {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return mapUser(result.rows[0]);
}

async function findByEmailWithPassword(email) {
  const result = await pool.query(
    `SELECT id, name, email, role, password_hash, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0] || null;
}

async function update(id, { name, email, passwordHash, role }) {
  const result = await pool.query(
    `UPDATE users
     SET
       name = COALESCE($2, name),
       email = COALESCE($3, email),
       password_hash = COALESCE($4, password_hash),
       role = COALESCE($5, role)
     WHERE id = $1
     RETURNING id, name, email, role, created_at, updated_at`,
    [id, name, email, passwordHash, role]
  );

  return mapUser(result.rows[0]);
}

async function remove(id) {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id, name, email, role, created_at, updated_at`,
    [id]
  );

  return mapUser(result.rows[0]);
}

module.exports = {
  create,
  count,
  findAll,
  findById,
  findByEmailWithPassword,
  update,
  remove,
};
