const exercisesRequest = require('../db/exercise-db');

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await exercisesRequest.getExercises();
    res.send(exercises);
  } catch (error) {
    res.status(500).send(error);
  }
};