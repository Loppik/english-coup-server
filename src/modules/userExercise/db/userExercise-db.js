const UserExercise = require('../../../schemes/userExercise');

exports.addUserExercise = (userId, exerciseId, position) => UserExercise.create({ userId, exerciseId, position });
exports.removeAllUserExercises = (userId) => UserExercise.destroy({ where: { userId } });
