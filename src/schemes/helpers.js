const { notEmptyInteger } = require('./constants');

module.exports.foreignKey = (model, key) => ({
  ...notEmptyInteger(),
  references: {
    model,
    key
  }
});
