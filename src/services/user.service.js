const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateId(id) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id)) {
    const error = new Error('Id invalido.');
    error.status = 400;
    throw error;
  }
}

function validateRole(role) {
  if (!['admin', 'basic'].includes(role)) {
    const error = new Error('Role invalida.');
    error.status = 400;
    throw error;
  }
}

function validateCreateUser({ name, email, password }) {
  if (!name || !email || !password) {
    const error = new Error('Nome, email e senha sao obrigatorios.');
    error.status = 400;
    throw error;
  }

  if (!validateEmail(email)) {
    const error = new Error('Email invalido.');
    error.status = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error('A senha deve ter pelo menos 6 caracteres.');
    error.status = 400;
    throw error;
  }
}

async function createUser(data) {
  validateCreateUser(data);

  const passwordHash = await bcrypt.hash(data.password, 10);
  const usersCount = await userRepository.count();
  const role = usersCount === 0 ? 'admin' : 'basic';

  return userRepository.create({
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash,
    role,
  });
}

async function listUsers() {
  return userRepository.findAll();
}

async function getUser(id) {
  validateId(id);

  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error('Usuario nao encontrado.');
    error.status = 404;
    throw error;
  }

  return user;
}

async function updateUser(id, data) {
  validateId(id);

  const changes = {};

  if (data.name !== undefined) {
    changes.name = data.name;
  }

  if (data.email !== undefined) {
    if (!validateEmail(data.email)) {
      const error = new Error('Email invalido.');
      error.status = 400;
      throw error;
    }

    changes.email = data.email.toLowerCase();
  }

  if (data.password !== undefined) {
    if (data.password.length < 6) {
      const error = new Error('A senha deve ter pelo menos 6 caracteres.');
      error.status = 400;
      throw error;
    }

    changes.passwordHash = await bcrypt.hash(data.password, 10);
  }

  if (data.role !== undefined) {
    validateRole(data.role);
    changes.role = data.role;
  }

  const user = await userRepository.update(id, changes);

  if (!user) {
    const error = new Error('Usuario nao encontrado.');
    error.status = 404;
    throw error;
  }

  return user;
}

async function deleteUser(id) {
  validateId(id);

  const user = await userRepository.remove(id);

  if (!user) {
    const error = new Error('Usuario nao encontrado.');
    error.status = 404;
    throw error;
  }

  return user;
}

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
