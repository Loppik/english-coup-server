const User = require('../../../schemes/user');
const { getTableEntitiesCount } = require('../../db-helpers');

exports.getUserByEmail = (email) => User.findOne({ where: {email} });
exports.getUserById = (userId) => User.findOne({ where: {userId} });
exports.addUser = (user) => User.create(user);
exports.getUsersCount = () => getTableEntitiesCount(User);
