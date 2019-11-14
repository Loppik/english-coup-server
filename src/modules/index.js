const app = require('express')();
const jwt = require('jsonwebtoken');
const config = require('../configs/jwt');

app.use('', require('./auth'));

app.use((req, res, next) => {
  const accessToken = req.get('Authorization');
  if (accessToken) {
    jwt.verify(accessToken, config.secret, (err, decoded) => { // create verify in jwtService
      if (err) {
        res.status(401).send({ err:  err.name })
      }
      req.body.userId = decoded.userId;
    })
  }
  next();
});

app.use('/translation', require('./translation'));
app.use('/userwords', require('./userword'));
app.use('/users', require('./user'));
app.use('/stat', require('./stat'));
app.use('/exercises', require('./exercise'));

module.exports = app;
