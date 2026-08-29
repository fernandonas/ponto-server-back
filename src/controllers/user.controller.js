const userService = require('../services/user.service');

async function create(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const users = await userService.listUsers();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const user = await userService.deleteUser(req.params.id);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
