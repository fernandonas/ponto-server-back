const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const userRepository = require('../repositories/user.repository');

async function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email e senha sao obrigatorios.');
    error.status = 400;
    throw error;
  }

  const user = await userRepository.findByEmailWithPassword(email.toLowerCase());

  if (!user) {
    const error = new Error('Credenciais invalidas.');
    error.status = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    const error = new Error('Credenciais invalidas.');
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
  };
}

module.exports = {
  login,
};
