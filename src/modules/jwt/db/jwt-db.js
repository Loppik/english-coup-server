const User = require('../../../schemes/users');

exports.updateRefreshToken = (userId, token) => User.query().update({ refresh_token: token }).where('user_id', userId);
exports.getRefreshTokenByUserId = (userId) => User.query().findById(userId).column('refresh_token');
