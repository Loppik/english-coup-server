const Knex = require('knex');
const config = require('./configs/db');

module.exports = Knex({
  client: config.client,
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
});
