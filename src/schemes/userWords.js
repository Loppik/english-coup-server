const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class UserWords extends Model {
  static get tableName() {
    return 'userWords';
  }

  static get idColumn() {
    return 'word_id'
  }
}

module.exports = UserWords;