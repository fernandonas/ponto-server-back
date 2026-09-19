const matchPlayerService = require('../services/match-player.service');

async function list(req, res, next) {
  try {
    return res.status(200).json(await matchPlayerService.list(req.params.matchId));
  } catch (error) {
    return next(error);
  }
}

async function add(req, res, next) {
  try {
    return res.status(201).json(
      await matchPlayerService.add(req.params.matchId, req.body.userId)
    );
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await matchPlayerService.remove(req.params.matchId, req.params.userId);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  add,
  remove,
};