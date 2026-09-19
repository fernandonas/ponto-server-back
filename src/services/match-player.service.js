const matchPlayerRepository = require('../repositories/match-player.repository');
const matchRepository = require('../repositories/match.repository');
const userRepository = require('../repositories/user.repository');

function createError(message, statusCode) {
  const error = new Error(message);
  error.status = statusCode;
  return error;
}

async function validateMatch(matchId) {
  const match = await matchRepository.findById(matchId);

  if (!match) {
    throw createError('Match not found', 404);
  }
}

async function list(matchId) {
  await validateMatch(matchId);
  return matchPlayerRepository.findByMatchId(matchId);
}

async function add(matchId, userId) {
  await validateMatch(matchId);

  if (!userId) {
    throw createError('User is required', 400);
  }

  const user = await userRepository.findById(userId);
  if (!user) {
    throw createError('User not found', 404);
  }

  const existingPlayer = await matchPlayerRepository.findByMatchAndUser(matchId, userId);
  if (existingPlayer) {
    throw createError('User is already assigned to this match', 409);
  }

  return matchPlayerRepository.create(matchId, userId);
}

async function remove(matchId, userId) {
  await validateMatch(matchId);

  const removedPlayer = await matchPlayerRepository.remove(matchId, userId);
  if (!removedPlayer) {
    throw createError('User is not assigned to this match', 404);
  }
}

module.exports = {
  list,
  add,
  remove,
};