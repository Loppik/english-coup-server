const moment = require('module');
const UserWord = require('../../../schemes/userWords');
const statusTypes = require('../../../configs/statusTypes');

exports.addUserWord = (userId, wordId) => UserWord.query().insert({userId, wordId, statusId: statusTypes.LEARNING.statusId});
exports.getLearningWords = userId => UserWord.query().where('userId', userId).andWhere('statusId', statusTypes.LEARNING.statusId);
exports.getLearnedWords = userId => UserWord.query().where('userId', userId).andWhere('statusId', statusTypes.LEARNED.statusId);
exports.setLearnedStatus = (userId, wordId) => UserWord.query().update({statusId: statusTypes.LEARNED.statusId, dateOfLearned: moment.format('DD/MM/YYYY')}).where('userId', userId).andWhere('wordId', wordId);