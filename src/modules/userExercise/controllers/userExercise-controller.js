const userExerciseService = require('../services/userExercise-service');

exports.changeUserExercises = async (req, res) => {
  try {
    const userId = req.body.userId;
    await userExerciseService.changeUserExercises(userId, req.exercises);
  } catch(error) {
    res.status(500).send(error);
  }
};