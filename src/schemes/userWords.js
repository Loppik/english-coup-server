const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class UserWords extends Model {
  static get tableName() {
    return 'userwords';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = UserWords;