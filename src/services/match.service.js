const matchRepository = require('../repositories/match.repository');
const venueRepository = require('../repositories/venue.repository');

const allowedStatuses = new Set([
  'open',
  'in_progress',
  'finished',
  'cancelled',
]);

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
}

function validateDate(value) {
  return typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function validateTime(value) {
  return typeof value === 'string' && /^\d{2}:\d{2}(:\d{2})?$/.test(value);
}

function validateTimeRange(startTime, endTime) {
  return startTime < endTime;
}

async function validateVenue(venueId) {
  if (!venueId) {
    throw createError('Venue is required', 400);
  }

  const venue = await venueRepository.findById(venueId);
  if (!venue || !venue.isActive) {
    throw createError('Venue not found', 404);
  }
}

function validateFields({ matchDate, startTime, endTime, hourlyRate, status }) {
  if (!validateDate(matchDate)) {
    throw createError('A valid match date is required', 400);
  }

  if (!validateTime(startTime) || !validateTime(endTime)) {
    throw createError('Valid start and end times are required', 400);
  }

  if (!validateTimeRange(startTime, endTime)) {
    throw createError('End time must be after start time', 400);
  }

  if (hourlyRate === undefined || hourlyRate === null || Number.isNaN(Number(hourlyRate))) {
    throw createError('Hourly rate is required', 400);
  }

  if (Number(hourlyRate) < 0) {
    throw createError('Hourly rate cannot be negative', 400);
  }

  if (!allowedStatuses.has(status)) {
    throw createError('Invalid match status', 400);
  }
}

async function create(data) {
  await validateVenue(data.venueId);

  const match = {
    venueId: data.venueId,
    matchDate: data.matchDate,
    startTime: data.startTime,
    endTime: data.endTime,
    hourlyRate: Number(data.hourlyRate),
    status: data.status || 'open',
  };

  validateFields(match);
  return matchRepository.create(match);
}

async function findAll() {
  return matchRepository.findAll();
}

async function findUpcomingByUserId(userId) {
  return matchRepository.findUpcomingByUserId(userId);
}

async function findById(id) {
  const match = await matchRepository.findById(id);

  if (!match) {
    throw createError('Match not found', 404);
  }

  return match;
}

async function update(id, data) {
  const currentMatch = await findById(id);
  const nextMatch = {
    venueId: data.venueId ?? currentMatch.venueId,
    matchDate: data.matchDate ?? currentMatch.matchDate,
    startTime: data.startTime ?? currentMatch.startTime,
    endTime: data.endTime ?? currentMatch.endTime,
    hourlyRate: data.hourlyRate !== undefined
      ? Number(data.hourlyRate)
      : Number(currentMatch.hourlyRate),
    status: data.status ?? currentMatch.status,
  };

  if (data.venueId !== undefined) {
    await validateVenue(nextMatch.venueId);
  }

  validateFields(nextMatch);
  return matchRepository.update(id, nextMatch);
}

async function remove(id) {
  await findById(id);
  return matchRepository.remove(id);
}

module.exports = {
  create,
  findAll,
  findUpcomingByUserId,
  findById,
  update,
  remove,
};