const { Router } = require('express');

const venueController = require('../controllers/venue.controller');

const auth = require('../middlewares/auth');

const authorize = require('../middlewares/authorize');

const router = Router();

router.post('/', auth, authorize('admin'), venueController.create);

router.get('/', auth, authorize('admin', 'basic'), venueController.findAll);

router.get('/all-simple', auth, authorize('admin'), venueController.findAllSimple);

router.get('/:id', auth, authorize('admin', 'basic'), venueController.findById);

router.put('/:id', auth, authorize('admin'), venueController.update);

router.delete('/:id', auth, authorize('admin'), venueController.remove);

module.exports = router;