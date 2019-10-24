const { BOOLEAN } = require('sequelize');
const sequelize = require('../sequelize');
const { primaryColumn, notEmptyString } = require("./constants");

const Word = sequelize.define('words', {
  'wordId': primaryColumn(),
  'original': notEmptyString(),
  'translation': notEmptyString(),
  'custom': {
    type: BOOLEAN,
    defaultValue: false
  }
}, { timestamps: false });

module.exports = Word;
