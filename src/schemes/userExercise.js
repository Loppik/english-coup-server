const { INTEGER } = require('sequelize');
const sequelize = require('../sequelize');
const { primaryColumn, notEmptyInteger, defaultExercisesNames } = require("./constants");

const UserExercise = sequelize.define('userExercises', {
  'userExerciseId': primaryColumn(),
  'userId': notEmptyInteger(),
  'exerciseId': notEmptyInteger(),
  'position': {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: defaultExercisesNames.length
    }
  }
}, { timestamps: false });

module.exports = UserExercise;
