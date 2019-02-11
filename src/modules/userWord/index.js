const router = require('express').Router();
const userWordController = require('./controllers/userWord-controller');

router.route('/')
  .post(userWordController.addUserWord)
  .get(userWordController.getPortionLearningWords)

module.exports = router;