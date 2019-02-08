const app = require('express')();

app.use('/translation', require('./translation'));
app.use('/userword', require('./userWord'))

module.exports = app;
