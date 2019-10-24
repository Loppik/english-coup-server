const { STRING } = require('sequelize');
const sequelize = require('../sequelize');
const { primaryColumn, notEmptyString } = require("./constants");

const User = sequelize.define('users', {
  'userId': primaryColumn(),
  'email': notEmptyString(),
  'password': notEmptyString(),
  'refreshToken': {
    type: STRING
  }
}, { timestamps: false });

module.exports = User;
