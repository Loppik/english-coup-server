const UserWord = require('../../../schemes/userWords');
const statusTypes = require('../../../configs/statusTypes');

exports.addUserWord = (user_id, word_id) => UserWord.query().insert({user_id, word_id, status_id: statusTypes.LEARNING.status_id});
exports.getLearningWords = user_id => UserWord.query().where('user_id', user_id).andWhere('status_id', statusTypes.LEARNING.status_id);
exports.getLearnedWords = user_id => UserWord.query().where('user_id', user_id).andWhere('status_id', statusTypes.LEARNED.status_id);
exports.setLearnedStatus = (user_id, word_id) => UserWord.query().update({status_id: statusTypes.LEARNED.status_id}).where('user_id', user_id).andWhere('word_id', word_id);
