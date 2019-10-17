const Knex = require('knex');
const config = require('./configs/db')[process.env.NODE_ENV || require('./constants').DEVELOPMENT_NODE_ENV];

module.exports = Knex({
  client: config.client,
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
});
