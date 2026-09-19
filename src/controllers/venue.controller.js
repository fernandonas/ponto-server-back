const venueService = require('../services/venue.service');

async function create(req, res, next) {
  try {
    const venue = await venueService.create(req.body);

    return res.status(201).json(venue);
  } catch (error) {
    next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const venues = await venueService.findAll();

    return res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
}

async function findAllSimple(req, res, next) {
  try {
    const venues = await venueService.findAllSimple();

    return res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
}

async function findById(req, res, next) {
  try {
    const venue = await venueService.findById(req.params.id);

    return res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const venue = await venueService.update(
      req.params.id,
      req.body
    );

    return res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await venueService.remove(req.params.id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  findAll,
  findAllSimple,
  findById,
  update,
  remove,
};