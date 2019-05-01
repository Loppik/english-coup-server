const router = require('express').Router();
const userWordController = require('./controllers/userword-controller');

router.route('/')
  .post(userWordController.addUserWord)
  .get(userWordController.getPortionLearningWords)

/*
router.route('/learned')
  .post(userWordController)
*/

module.exports = router;