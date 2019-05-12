const router = require('express').Router();
const userWordController = require('./controllers/userword-controller');

router.route('/')
  .post(userWordController.addUserWord)
  .get(userWordController.getPortionLearningWords)
  .put(userWordController.changeStatusToLearned)

router.route('/repeat')
  .get(userWordController.repeatWordsForAllTime)

router.get('/left', userWordController.countWordsLeft)
/*
router.route('/learned')
  .post(userWordController)
*/

module.exports = router;