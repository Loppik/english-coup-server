const userExerciseRequest = require('../db/userExercise-db');

exports.changeUserExercises = async (userId, newExercises) => {
  await userExerciseRequest.removeAllUserExercises(userId);
  await Promise.all(newExercises.map((exercise) => userExerciseRequest.addUserExercise(userId, exercise.id, exercise.position)))
};