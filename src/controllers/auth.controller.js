const authService = require('../services/auth.service');
const userService = require('../services/user.service');

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body);
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await userService.getUser(req.user.id);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
  me,
};
