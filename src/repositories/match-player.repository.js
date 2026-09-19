const pool = require('../database/pool');

function mapMatchPlayer(row) {
  return {
    id: row.id,
    matchId: row.match_id,
    userId: row.user_id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
  };
}

async function findByMatchId(matchId) {
  const result = await pool.query(
    `SELECT mp.id, mp.match_id, mp.user_id, u.name, u.email, u.role, mp.created_at
     FROM match_players mp
     INNER JOIN users u ON u.id = mp.user_id
     WHERE mp.match_id = $1
     ORDER BY u.name ASC`,
    [matchId]
  );

  return result.rows.map(mapMatchPlayer);
}

async function findByMatchAndUser(matchId, userId) {
  const result = await pool.query(
    `SELECT mp.id, mp.match_id, mp.user_id, u.name, u.email, u.role, mp.created_at
     FROM match_players mp
     INNER JOIN users u ON u.id = mp.user_id
     WHERE mp.match_id = $1 AND mp.user_id = $2`,
    [matchId, userId]
  );

  return result.rows[0] ? mapMatchPlayer(result.rows[0]) : null;
}

async function create(matchId, userId) {
  const result = await pool.query(
    `INSERT INTO match_players (match_id, user_id)
     VALUES ($1, $2)
     RETURNING id, match_id, user_id, created_at`,
    [matchId, userId]
  );

  return findByMatchAndUser(result.rows[0].match_id, result.rows[0].user_id);
}

async function remove(matchId, userId) {
  const result = await pool.query(
    `DELETE FROM match_players
     WHERE match_id = $1 AND user_id = $2
     RETURNING id`,
    [matchId, userId]
  );

  return result.rows[0] || null;
}

module.exports = {
  findByMatchId,
  findByMatchAndUser,
  create,
  remove,
};