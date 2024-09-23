const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller');  // Check path

// Define routes
router.get('/', authController.getHomePage);
router.get('/signup', authController.getSignupPage);
router.get('/login', authController.getLoginPage);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/profile',authController.profile);

module.exports = router;
