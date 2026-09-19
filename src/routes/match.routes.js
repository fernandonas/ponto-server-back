const { Router } = require('express');

const matchController = require('../controllers/match.controller');
const matchPlayerRoutes = require('./match-player.routes');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = Router();

router.use('/:matchId/players', matchPlayerRoutes);
router.post('/', auth, authorize('admin'), matchController.create);
router.get('/', auth, authorize('admin', 'basic'), matchController.findAll);
router.get('/my-upcoming', auth, authorize('admin', 'basic'), matchController.findUpcomingByUser);
router.get('/:id', auth, authorize('admin', 'basic'), matchController.findById);
router.put('/:id', auth, authorize('admin'), matchController.update);
router.delete('/:id', auth, authorize('admin'), matchController.remove);

module.exports = router;