const moment = require('module');
const Userword = require('../../../schemes/userword');
const { statusesInTable } = require('../../../schemes/constants');

exports.addUserword = (userId, wordId) => Userword.create({ userId, wordId, statusId: statusesInTable.LEARNING.statusId });
exports.getLearningWords = (userId) => Userword.findAll({ where: { userId, statusId: statusesInTable.LEARNING.statusId } });
exports.getLearnedWords = (userId) => Userword.findAll({ where: { userId, statusId: statusesInTable.LEARNED.statusId } });

exports.setLearnedStatus = (userId, wordId) => Userword.update(
  { statusId: statusesInTable.LEARNED.statusId, dateOfLearned: moment.format('DD/MM/YYYY') },
  { where: { userId, wordId } }
);
