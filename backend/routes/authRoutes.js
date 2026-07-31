const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');
const authenticate = require('../middlewares/authenticate');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', authenticate, authController.me);

module.exports = router;