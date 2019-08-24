const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users'; 
  }

  static get idColumn() {
    return 'userId';
  }
}

module.exports = User;