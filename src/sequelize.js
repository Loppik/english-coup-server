const Sequelize = require('sequelize');
const { NODE_ENVS } = require('./constants');
const config = require('./configs/db')[process.env.NODE_ENV || NODE_ENVS.DEVELOPMENT];

if (process.env.NODE_ENV === NODE_ENVS.PRODUCTION) {
  const pg = require('pg');
  pg.defaults.ssl = true;
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: process.env.NODE_ENV === require('./constants').NODE_ENVS.DEVELOPMENT
});

module.exports = sequelize;
