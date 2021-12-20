const express = require('express');

const authController = require('../../controllers/v1/authController');

const router = express.Router();

router.post('/signup', authController.signup);

module.exports = router;
