const authService = require('../services/auth-service');
const jwtService = require('../../jwt/services/jwt-service');

const tokenRequest = require('../../jwt/db/jwt-db');

exports.registration = async (req, res) => {
  try {
    await authService.registration(req.body);
    res.send({ msg: 'Successful registration' })
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'У сервера есть дела поважнее чем Ваша регистрация. Предлагаем Вам скрестить пальцы и попробовать ещё раз / ' + err }) // FIXME: real error reason send
  }
};

exports.login = async (req, res) => {
  try {
    const tokens = await authService.login(req.body);
    res.send(tokens);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.get('Authorization');
  const userId = req.body.userId;
  const userRefreshToken = await tokenRequest.getRefreshTokenByUserId(userId);
  if (userRefreshToken.refreshToken === refreshToken) {
    const { accessToken, refreshToken } = await jwtService.generateAcsRefTokens({ userId });
    await tokenRequest.updateRefreshToken(userId, refreshToken);
    res.send({
      accessToken,
      refreshToken,
    })
  }
  await tokenRequest.updateRefreshToken(userId, "");
  res.send({ err: 'Relogin with login and password' })
};

