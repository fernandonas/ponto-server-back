const pool = require('../database/pool');

function mapVenue(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    address: row.address,
    hourlyRate: row.hourly_rate,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function create({ name, address, hourlyRate }) {
  const result = await pool.query(
    `INSERT INTO venues (name, address, hourly_rate)
     VALUES ($1, $2, $3)
     RETURNING
       id,
       name,
       address,
       hourly_rate,
       is_active,
       created_at,
       updated_at`,
    [name, address, hourlyRate]
  );

  return mapVenue(result.rows[0]);
}

async function findAll() {
  const result = await pool.query(
    `SELECT
       id,
       name,
       address,
       hourly_rate,
       is_active,
       created_at,
       updated_at
     FROM venues
     WHERE is_active = TRUE
     ORDER BY created_at DESC`
  );

  return result.rows.map(mapVenue);
}

async function findAllSimple() {
  const result = await pool.query(
    `SELECT
       id,
       name
     FROM venues
     WHERE is_active = TRUE
     ORDER BY name ASC`
  );

  return result.rows.map(mapVenue);
}

async function findById(id) {
  const result = await pool.query(
    `SELECT
       id,
       name,
       address,
       hourly_rate,
       is_active,
       created_at,
       updated_at
     FROM venues
     WHERE id = $1`,
    [id]
  );

  return mapVenue(result.rows[0]);
}

async function update(id, { name, address, hourlyRate, isActive }) {
  const result = await pool.query(
    `UPDATE venues
     SET
       name = COALESCE($2, name),
       address = COALESCE($3, address),
       hourly_rate = COALESCE($4, hourly_rate),
       is_active = COALESCE($5, is_active),
       updated_at = NOW()
     WHERE id = $1
     RETURNING
       id,
       name,
       address,
       hourly_rate,
       is_active,
       created_at,
       updated_at`,
    [id, name, address, hourlyRate, isActive]
  );

  return mapVenue(result.rows[0]);
}

async function remove(id) {
  const result = await pool.query(
    `UPDATE venues
     SET
       is_active = FALSE,
       updated_at = NOW()
     WHERE id = $1
     RETURNING
       id,
       name,
       address,
       hourly_rate,
       is_active,
       created_at,
       updated_at`,
    [id]
  );

  return mapVenue(result.rows[0]);
}

module.exports = {
  create,
  findAll,
  findAllSimple,
  findById,
  update,
  remove,
};