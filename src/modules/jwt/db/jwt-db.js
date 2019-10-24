const User = require('../../../schemes/user');

exports.updateRefreshToken = (userId, token) => User.update(
  { refreshToken: token },
  { where: {userId} }
);

exports.getRefreshTokenByUserId = (userId) => User.findAll({
  attributes: ['refreshToken'] ,
  where: {userId}
});
