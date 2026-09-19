const venueRepository = require('../repositories/venue.repository');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
}

async function findAllSimple() {
  return venueRepository.findAllSimple();
}

async function create({ name, address, hourlyRate }) {
  if (!name?.trim()) {
    throw createError('Name is required', 400);
  }

  if (hourlyRate === undefined || hourlyRate === null) {
    throw createError('Hourly rate is required', 400);
  }

  if (Number(hourlyRate) < 0) {
    throw createError('Hourly rate cannot be negative', 400);
  }

  return venueRepository.create({
    name: name.trim(),
    address: address?.trim() || null,
    hourlyRate: Number(hourlyRate),
  });
}

async function findAll() {
  return venueRepository.findAll();
}

async function findById(id) {
  const venue = await venueRepository.findById(id);

  if (!venue) {
    throw createError('Venue not found', 404);
  }

  return venue;
}

async function update(id, data) {
  const venue = await venueRepository.findById(id);

  if (!venue) {
    throw createError('Venue not found', 404);
  }

  if (data.name !== undefined && !data.name?.trim()) {
    throw createError('Name cannot be empty', 400);
  }

  if (
    data.hourlyRate !== undefined &&
    Number(data.hourlyRate) < 0
  ) {
    throw createError('Hourly rate cannot be negative', 400);
  }

  return venueRepository.update(id, {
    name: data.name?.trim(),
    address: data.address?.trim(),
    hourlyRate:
      data.hourlyRate !== undefined
        ? Number(data.hourlyRate)
        : undefined,
    isActive: data.isActive,
  });
}

async function remove(id) {
  const venue = await venueRepository.findById(id);

  if (!venue) {
    throw createError('Venue not found', 404);
  }

  return venueRepository.remove(id);
}

module.exports = {
  create,
  findAll,
  findById,
  findAllSimple,
  update,
  remove,
};