const userRequest = require('../../user/db/user-db');
const tokenRequest = require('../../jwt/db/jwt-db');
const regValidation = require('../../../validation/registration');
const loginValidation = require('../../../validation/login')
const bcrypt = require('bcrypt');
const jwtService = require('../../jwt/services/jwt-service');

exports.registration = (data) => {
  return regValidation.isInvalidRegData(data).then(() => {
    return userRequest.getUserByEmail(data.email).then(async (user) => user ? (
      Promise.reject('This email already exist')
    ) : (
      userRequest.addUser({ ...data, password: await bcrypt.hash(data.password, 10) })
      ));
  }, (err) => {
    return Promise.reject(err);
  });
};

exports.login = (data) => {
  return loginValidation.isInvalidLoginData(data).then(() => {
    return userRequest.getUserByEmail(data.email).then((user) => user ? (
      bcrypt.compare(data.password, user.password).then((res) => res ? (
        jwtService.generateAcsRefTokens({ userId: user.user_id }).then(({ accessToken, refreshToken }) => {
          return tokenRequest.updateRefreshToken(user.user_id, refreshToken).then(res => ({ accessToken, refreshToken }));
        })
      ) : (
          Promise.reject('Incorrect password')
        ))
    ) : (
        Promise.reject('No such email')
      ));
  }, (err) => {
    return Promise.reject(err);
  })
};
