const express = require('express');
const cors = require('cors');

const { frontendOrigin } = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const venuesRoutes = require('./routes/venue.routes');
const matchRoutes = require('./routes/match.routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

const allowedOrigins = new Set([
  frontendOrigin,
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://192.168.100.8:4200',
  'https://ponto-server-front.vercel.app'
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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/venues', venuesRoutes);
app.use('/api/matches', matchRoutes);

app.use(errorHandler);

module.exports = app;
