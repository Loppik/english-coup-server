const sequelize = require('../sequelize');
const { primaryColumn, notEmptyString } = require("./constants");

const Exercise = sequelize.define('exercises', {
    'exerciseId': primaryColumn(),
    'name': notEmptyString()
}, { timestamps: false });

module.exports = Exercise;
