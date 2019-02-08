const UserWord = require('../../../schemes/userWords');
const statusTypes = require('../../../configs/statusTypes');

exports.addUserWord = (user_id, word_id) => UserWord.query().insert({user_id, word_id, status_id: statusTypes.default.status_id});