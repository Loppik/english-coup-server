const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class Userwords extends Model {
  static get tableName() {
    return 'userwords';
  }

  static get idColumn() {
    return 'userwordId';
  }
}

module.exports = Userwords;