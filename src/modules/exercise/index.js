const router = require('express').Router();
const exerciseController = require('./controllers/exercise-controller');

router.get('/', exerciseController.getAllExercises);

module.exports = router;