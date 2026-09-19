const matchService = require('../services/match.service');

async function create(req, res, next) {
  try {
    return res.status(201).json(await matchService.create(req.body));
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    return res.status(200).json(await matchService.findAll());
  } catch (error) {
    return next(error);
  }
}

async function findUpcomingByUser(req, res, next) {
  try {
    return res.status(200).json(
      await matchService.findUpcomingByUserId(req.user.id)
    );
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    return res.status(200).json(await matchService.findById(req.params.id));
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    return res.status(200).json(await matchService.update(req.params.id, req.body));
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await matchService.remove(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  findAll,
  findUpcomingByUser,
  findById,
  update,
  remove,
};