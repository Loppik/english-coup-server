const knex = require('../knex');
const { Model } = require('objection');

Model.knex(knex);

class Words extends Model {
  static get tableName() {
    return 'words';
  }

  static get idColumn() {
    return 'wordId'
  }
}

module.exports = Words;