const { Router } = require('express');

const matchPlayerController = require('../controllers/match-player.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = Router({ mergeParams: true });

router.get('/', auth, authorize('admin'), matchPlayerController.list);
router.post('/', auth, authorize('admin'), matchPlayerController.add);
router.delete('/:userId', auth, authorize('admin'), matchPlayerController.remove);

module.exports = router;