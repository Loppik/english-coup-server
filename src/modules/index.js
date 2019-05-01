const app = require('express')();

app.use('/translations', require('./translation'));
app.use('/userwords', require('./userword'))

module.exports = app;
