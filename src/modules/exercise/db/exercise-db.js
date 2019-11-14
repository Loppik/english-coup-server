const Exercise = require('../../../schemes/exercise');
const { getTableEntitiesCount } = require('../../db-helpers');

exports.getExerciseCount = () => getTableEntitiesCount(Exercise);
exports.addExercise = (exercise) => Exercise.create(exercise);
exports.getExercises = () => Exercise.findAll({});