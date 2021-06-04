const express = require('express');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

router.get('/', resumeController.get);
router.post('/', resumeController.create_post);
router.put('/', resumeController.update_put);
router.delete('/', resumeController.remove_delete);

module.exports = router;