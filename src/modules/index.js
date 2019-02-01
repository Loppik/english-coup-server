const app = require('express')();
const translation = require('./translation');

app.use('/translation', translation);

module.exports = app;
