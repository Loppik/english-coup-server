const Status = require('../../../schemes/status');
const { getTableEntitiesCount } = require('../../db-helpers');

exports.getStatusesCount = () => getTableEntitiesCount(Status);
exports.addStatus = (name) => Status.create({ name });
