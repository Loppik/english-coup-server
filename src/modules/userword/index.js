const router = require('express').Router();
const userwordController = require('./controllers/userword-controller');

router.route('/')
  .post(userwordController.addUserword)
  .get(userwordController.getPortionLearningWords)
  .put(userwordController.changeStatusToLearned)

router.route('/repeat')
  .get(userwordController.repeatWordsForAllTime);

router.get('/left', userwordController.countWordsLeft);
router.get('/learned', userwordController.countAllLearnedWords);
/*
router.route('/learned')
  .post(userwordController)
*/

module.exports = router;
