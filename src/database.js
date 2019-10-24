const sequelize = require('./sequelize');
const statusRequest = require('./modules/status/db/status-db');
const userRequest = require('./modules/user/db/user-db');
const { adminUserData, statusesInTable } = require('./schemes/constants');
const { POSTGRESQL_ERROR_CODES } = require('./constants');
const { newError, DATABASE_ERRORS } = require('./errors');

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    switch (error.code) {
      case POSTGRESQL_ERROR_CODES.INVALID_CATALOG_NAME: newError(DATABASE_ERRORS.INVALID_CATALOG_NAME); break; // TODO: Add as second parameter(error) database name
      default: throw newError(DATABASE_ERRORS.UNABLE_TO_CONNECT, error);
    }
  }
};

const initDatabase = async () => {
  try {
    await initDatabaseTables();
    await initTablesData();
    console.log('Database initialized');
  } catch (error) {
    console.error('Error while database initialization', error);
  }
};

const connectAndInitDatabase = async () => {
  await connectToDatabase();
  await initDatabase();
};

const initDatabaseTables = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    throw new Error('Error while database tables synchronization');
  }
};

const isEmptyStatusesTable = async () => await statusRequest.getStatusesCount() === 0;
const initStatusesTableData = async () => {
  try {
    const keys = Object.keys(statusesInTable);
    for (let key of keys) {
      await statusRequest.addStatus(statusesInTable[key].name);
    }
  } catch (error) {
    console.error(error); // FIXME: best error handler in the world
  }
};

const isEmptyUsersTable = async () => await userRequest.getUsersCount() === 0;
const initUsersTableData = async () => {
  try {
    await userRequest.addUser(adminUserData);
  } catch (error) {
    console.error(error); // FIXME: best error handler in the world
  }
};

const initTablesData = async () => {
  if (await isEmptyStatusesTable()) await initStatusesTableData();
  if (await isEmptyUsersTable()) await initUsersTableData();
};

module.exports = {
  connectAndInitDatabase,
  connectToDatabase,
  initDatabase,
};


