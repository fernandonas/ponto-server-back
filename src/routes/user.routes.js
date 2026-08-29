const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = Router();

router.post('/', userController.create);
router.get('/', auth, authorize('admin'), userController.findAll);
router.get('/:id', auth, authorize('admin'), userController.findById);
router.put('/:id', auth, authorize('admin'), userController.update);
router.delete('/:id', auth, authorize('admin'), userController.remove);

module.exports = router;
