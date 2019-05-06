const User = require('../../../schemes/users');

exports.getUserByEmail = email => User.query().findOne({ email: email });
exports.getUserById = userId => User.query().findOne({ user_id: userId });
exports.addUser = user => User.query().insert(user);