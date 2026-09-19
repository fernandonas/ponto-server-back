const pool = require('../database/pool');

function mapMatch(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    venueId: row.venue_id,
    venueName: row.venue_name,
    matchDate: row.match_date,
    startTime: row.start_time,
    endTime: row.end_time,
    hourlyRate: row.hourly_rate,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const matchFields = `
  m.id,
  m.venue_id,
  v.name AS venue_name,
  m.match_date,
  m.start_time,
  m.end_time,
  m.hourly_rate,
  m.status,
  m.created_at,
  m.updated_at`;

async function create({ venueId, matchDate, startTime, endTime, hourlyRate, status }) {
  const result = await pool.query(
    `INSERT INTO matches (venue_id, match_date, start_time, end_time, hourly_rate, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, venue_id, match_date, start_time, end_time, hourly_rate, status, created_at, updated_at`,
    [venueId, matchDate, startTime, endTime, hourlyRate, status]
  );

  return findById(result.rows[0].id);
}

async function findAll() {
  const result = await pool.query(
    `SELECT ${matchFields}
     FROM matches m
     INNER JOIN venues v ON v.id = m.venue_id
     ORDER BY m.match_date DESC, m.start_time DESC`
  );

  return result.rows.map(mapMatch);
}

async function findUpcomingByUserId(userId) {
  const result = await pool.query(
    `SELECT ${matchFields}
     FROM matches m
     INNER JOIN venues v ON v.id = m.venue_id
     INNER JOIN match_players mp ON mp.match_id = m.id
     WHERE mp.user_id = $1
       AND m.status IN ('open', 'in_progress')
       AND (m.match_date > CURRENT_DATE
         OR (m.match_date = CURRENT_DATE AND m.start_time >= LOCALTIME))
     ORDER BY m.match_date ASC, m.start_time ASC`,
    [userId]
  );

  return result.rows.map(mapMatch);
}

async function findById(id) {
  const result = await pool.query(
    `SELECT ${matchFields}
     FROM matches m
     INNER JOIN venues v ON v.id = m.venue_id
     WHERE m.id = $1`,
    [id]
  );

  return mapMatch(result.rows[0]);
}

async function update(id, { venueId, matchDate, startTime, endTime, hourlyRate, status }) {
  const result = await pool.query(
    `UPDATE matches
     SET
       venue_id = COALESCE($2, venue_id),
       match_date = COALESCE($3, match_date),
       start_time = COALESCE($4, start_time),
       end_time = COALESCE($5, end_time),
       hourly_rate = COALESCE($6, hourly_rate),
       status = COALESCE($7, status),
       updated_at = NOW()
     WHERE id = $1
     RETURNING id`,
    [id, venueId, matchDate, startTime, endTime, hourlyRate, status]
  );

  return result.rows[0] ? findById(result.rows[0].id) : null;
}

async function remove(id) {
  const result = await pool.query(
    'DELETE FROM matches WHERE id = $1 RETURNING id',
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  create,
  findAll,
  findUpcomingByUserId,
  findById,
  update,
  remove,
};