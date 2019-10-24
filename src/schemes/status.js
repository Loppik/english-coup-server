const sequelize = require('../sequelize');
const { primaryColumn, notEmptyString } = require("./constants");

const Statuses = sequelize.define('statuses', {
  'statusId': primaryColumn(),
  'name': notEmptyString()
}, { timestamps: false });

module.exports = Statuses;
