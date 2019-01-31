const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class Status extends Model {
  static get tableName() {
    return 'status';
  }

  static get idColumn() {
    return 'status_id'
  }
}

module.exports = Status;