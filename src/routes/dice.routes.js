const express = require('express');
const diceController = require('../controllers/dice.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, diceController.roll);

module.exports = router;
