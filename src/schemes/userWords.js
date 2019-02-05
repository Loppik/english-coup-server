const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class UserWords extends Model {
  static get tableName() {
    return 'userWords';
  }

  static get idColumn() {
    return 'user_id'
  }
}

module.exports = UserWords;