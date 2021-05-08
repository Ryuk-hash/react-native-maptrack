const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);

module.exports = router;
