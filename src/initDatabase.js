const { Client } = require('pg');
const config = require('./configs/db')[process.env.NODE_ENV || 'develop'];
const statusTypes = require('./configs/statusTypes');

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  ssl: true,
})
client.connect()

const initDatabaseTables = () => {
  try {
    client.query("CREATE TABLE IF NOT EXISTS users ( userId SERIAL PRIMARY KEY, email VARCHAR(30), password VARCHAR(200), refreshToken VARCHAR(200) )");
    client.query("CREATE TABLE IF NOT EXISTS statuses ( statusId SERIAL PRIMARY KEY, name VARCHAR(30) )");
    client.query("CREATE TABLE IF NOT EXISTS userwords ( userwordId SERIAL PRIMARY KEY, userId INT, wordId INT, statusId INT, dateOfLearned DATE )");
    client.query("CREATE TABLE IF NOT EXISTS words ( wordId SERIAL PRIMARY KEY, original VARCHAR(50), translation VARCHAR(50), custom BOOLEAN )");
  } catch(err) {
    console.log(err); // FIXME: best error handler in the world
  }
}

const initStatusesTableData = async () => {
  try {
    const isTableExist = (await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'statuses')")).rows[0].exists;
    if (isTableExist) {
      const isTableEmpty = (await client.query("SELECT * FROM statuses")).rows.length === 0;
      if (isTableEmpty) {
        const statusNames = Object.keys(statusTypes).reduce((prev, status) => `${prev} ('${statusTypes[status].name}'),`, '');
        client.query("INSERT INTO statuses (name) VALUES " + statusNames.slice(0, statusNames.length - 1));
      } else {
      }
    } else {
      initDatabaseTables();
    }
  } catch (err) {
    console.log(err); // FIXME: best error handler in the world
  }
}

const initTablesData = async () => {
  await initStatusesTableData();
}

module.exports = {
  initDatabaseTables,
  initTablesData
}
