const { fn, col } = require('sequelize');

exports.getTableEntitiesCount = async (table) => {
  const response = await table.findOne({ attributes: [[fn('COUNT', col('*')), 'count']] });
  return Number(response.dataValues.count);
};
