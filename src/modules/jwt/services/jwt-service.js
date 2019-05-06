const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const config = require('../../../configs/jwt');

const generateAccessToken = (data) => {
  return new Promise((response, reject) => {
      jwt.sign(data, config.secret, { expiresIn: config.accessTokenLifetime }, (err, token) => err ? (
          reject('Token generation error')
      ) : (
          response(token)
      ));
  });
}

const generateRefreshToken = () => {
    return uuid();
}

exports.generateAcsRefTokens = async (data) => {
    const accessToken = await generateAccessToken(data);
    const refreshToken = generateRefreshToken();
    return { accessToken, refreshToken };
}