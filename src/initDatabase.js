const { Client } = require('pg');
const { INVALID_CATALOG_NAME_ERROR_CODE } = require('./constants');
const config = require('./configs/db')[process.env.NODE_ENV || require('./constants').DEVELOPMENT_NODE_ENV];
const statusTypes = require('./configs/statusTypes');

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  ssl: config.ssl,
});

client.connect((err) => {
  if (err) {
    if (err && err.code === INVALID_CATALOG_NAME_ERROR_CODE) {
      // TODO: do something with reconnection when database doesn't exist
    }
  } else {
    console.log(`Connect to the database: ${config.database}`)
  }
});

const initDatabase = async () => {
  try {
    await initDatabaseTables();
    await initTablesData();
    console.log('Database initialized');
  } catch (err) {
    console.log('Connection to database terminated');
  }
};

const createDatabase = async () => {
  try {
    await client.query(`SELECT 'CREATE DATABASE ${config.database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${config.database}')\\gexec`)
  } catch (err) {
    console.log(err); // FIXME: best error handler in the world
  }
};

const initDatabaseTables = async () => {
  try {
    await Promise.all([
      client.query(CREATE_USERS_TABLE_REQUEST),
      client.query(CREATE_STATUSES_TABLE_REQUEST),
      client.query(CREATE_USERWORDS_TABLE_REQUEST),
      client.query(CREATE_WORDS_TABLE_REQUEST)
  ]);
  } catch(err) {
    throw new Error('Tables didn\'t create');
  }
};

const initStatusesTableData = async () => {
  try {
    const isTableEmpty = (await client.query("SELECT * FROM statuses")).rows.length === 0;
    if (isTableEmpty) {
      const statusNames = Object.keys(statusTypes).reduce((prev, status) => `${prev} ('${statusTypes[status].name}'),`, '');
      client.query("INSERT INTO statuses (name) VALUES " + statusNames.slice(0, statusNames.length - 1));
    }
  } catch (err) {
    console.log(err); // FIXME: best error handler in the world
  }
};

const initTablesData = async () => {
  await initStatusesTableData();
};

CREATE_USERS_TABLE_REQUEST = 'CREATE TABLE IF NOT EXISTS users ( userId SERIAL PRIMARY KEY, email VARCHAR(30), password VARCHAR(200), refreshToken VARCHAR(200) )';
CREATE_STATUSES_TABLE_REQUEST = 'CREATE TABLE IF NOT EXISTS statuses ( statusId SERIAL PRIMARY KEY, name VARCHAR(30) )';
CREATE_USERWORDS_TABLE_REQUEST = "CREATE TABLE IF NOT EXISTS userwords ( userwordId SERIAL PRIMARY KEY, userId INT, wordId INT, statusId INT, dateOfLearned DATE )";
CREATE_WORDS_TABLE_REQUEST = "CREATE TABLE IF NOT EXISTS words ( wordId SERIAL PRIMARY KEY, original VARCHAR(50), translation VARCHAR(50), custom BOOLEAN )";

module.exports = initDatabase;
