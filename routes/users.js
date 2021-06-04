const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authorization');

const router = express.Router();

router.get('/:id', authMiddleware.requireAuth, userController.get);
router.post('/', userController.create_post);
router.put('/', authMiddleware.requireAuth, userController.update_put);
router.delete('/:id', authMiddleware.requireAuth, userController.remove_delete);

module.exports = router;