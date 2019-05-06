const router = require('express').Router();

const authController = require('./controllers/auth-controller')

router.post('/signup', authController.registration);
router.post('/signin', authController.login);
router.post('/refresh', authController.refreshToken);

module.exports = router;