const Sequelize = require('sequelize');
const config = require('./configs/db')[process.env.NODE_ENV || require('./constants').NODE_ENVS.DEVELOPMENT];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: process.env.NODE_ENV === require('./constants').NODE_ENVS.DEVELOPMENT
});

module.exports = sequelize;
