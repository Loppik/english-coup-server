const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class Statuses extends Model {
  static get tableName() {
    return 'statuses';
  }

  static get idColumn() {
    return 'statusId'
  }
}

module.exports = Statuses;