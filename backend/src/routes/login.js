const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { validateUser, validateEmail } = require('../middlewares/userMiddleware');

router.get('/profile', authMiddleware, UserController.getUser);
router.post('/register', validateUser, validateEmail, UserController.create);
router.post('/login', validateUser, UserController.login);

module.exports = router;