const User = require('../../../schemes/users');

exports.updateRefreshToken = (userId, token) => User.query().update({ refreshToken: token }).where('userId', userId);
exports.getRefreshTokenByUserId = (userId) => User.query().findById(userId).column('refreshToken');
