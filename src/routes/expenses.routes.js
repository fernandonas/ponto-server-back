const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.post('/add', auth, authorize('basic', 'admin'), expensesController.create);

module.exports = router;