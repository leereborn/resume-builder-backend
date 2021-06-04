const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//login
router.post('/', authController.login);

//logout
router.delete('/', authController.logout);

module.exports = router;