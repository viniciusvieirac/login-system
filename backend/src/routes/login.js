const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { validateUser, validateEmail } = require('../middlewares/userMiddleware');

router.get('/profile', authMiddleware, UserController.getUser);
router.post('/register', validateUser, validateEmail, UserController.create);
router.post('/login', UserController.login);

module.exports = router;