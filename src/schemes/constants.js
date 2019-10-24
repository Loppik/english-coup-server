const { INTEGER, STRING } = require('sequelize');
const { copyObject } = require('../helpers');

const notEmptyString = {
  type: STRING,
  allowNull: false
};
module.exports.notEmptyString = () => copyObject(notEmptyString);

const notEmptyInteger = {
  type: INTEGER,
  allowNull: false
};
module.exports.notEmptyInteger= () => copyObject(notEmptyInteger);

const primaryColumn = {
  ...notEmptyInteger,
  primaryKey: true,
  autoIncrement: true,
};
module.exports.primaryColumn = () => copyObject(primaryColumn);

module.exports.adminUserData = {
  email: 'admin@gmail.com',
  password: '$2b$10$4CDqULkT8jAJEscII1egxu0Hkta9TlzJxDIufO.bK.aapDkq76D7K' // 123
};

module.exports.statusesInTable = {
  LEARNING: {
    statusId: 1,
    name: 'learning',
  },
  LEARNED: {
    statusId: 2,
    name: 'learned',
  },
};

