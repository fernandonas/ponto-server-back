const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const requiredEnv = ['DATABASE_URL', 'JWT_SECRET'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Variavel de ambiente obrigatoria ausente: ${key}`);
  }
}

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:4200',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  port: process.env.PORT || 3000,
};
