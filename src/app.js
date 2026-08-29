const express = require('express');
const cors = require('cors');

const { frontendOrigin } = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const diceRoutes = require('./routes/dice.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

const allowedOrigins = new Set([
  frontendOrigin,
  'http://localhost:4200',
  'http://127.0.0.1:4200',
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origem nao permitida pelo CORS.'));
  },
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/dice', diceRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
