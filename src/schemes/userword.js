const { DATEONLY } = require('sequelize');
const sequelize = require('../sequelize');
const Schemes = require('./index');
const { primaryColumn } = require('./constants');
const { foreignKey } = require('./helpers');

const Userword = sequelize.define('userwords', {
  'userwordId': primaryColumn(),
  'userId': foreignKey(Schemes.User, 'userId'),
  'wordId': foreignKey(Schemes.Word, 'wordId'),
  'statusId': foreignKey(Schemes.Status, 'statusId'),
  'dateOfLearned': {
    type: DATEONLY
  }
}, { timestamps: false });

module.exports = Userword;
