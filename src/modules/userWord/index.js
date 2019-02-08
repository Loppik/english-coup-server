const router = require('express').Router();
const userWordController = require('./controllers/userWord-controller');

router.post('/', userWordController.addUserWord);

module.exports = router;