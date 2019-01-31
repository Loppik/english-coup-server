const knex = require('../knex1');
const { Model } = require('objection');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users'; 
  }

  static get idColumn() {
    return 'user_id';
  }
}

module.exports = User;