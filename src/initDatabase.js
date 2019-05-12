const { Client } = require('pg');
const config = require('./configs/db');
const statusTypes = require('./configs/statusTypes');

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
})
client.connect()

const initDatabaseTables = () => {
  try {
    client.query("CREATE TABLE IF NOT EXISTS users ( user_id SERIAL PRIMARY KEY, email VARCHAR(30), password VARCHAR(200), refresh_token VARCHAR(200) )");
    client.query("CREATE TABLE IF NOT EXISTS status ( status_id SERIAL PRIMARY KEY, name VARCHAR(30) )");
    client.query("CREATE TABLE IF NOT EXISTS userwords ( id SERIAL PRIMARY KEY, user_id INT, word_id INT, status_id INT, dateOfLearned DATE )");
    client.query("CREATE TABLE IF NOT EXISTS words ( word_id SERIAL PRIMARY KEY, original VARCHAR(50), translation VARCHAR(50), custom BOOLEAN )");
  } catch(err) {
    console.log(err); // FIXME: best error handler in the world
  }
}

const initStatusTableData = async () => {
  try {
    const isTableExist = (await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'status')")).rows[0].exists;
    if (isTableExist) {
      const isTableEmpty = (await client.query("SELECT * FROM status")).rows.length === 0;
      if (isTableEmpty) {
        const statusNames = statusTypes.types.reduce((prev, statusName) => `${prev} ('${statusName}'),`, '');
        client.query("INSERT INTO status (name) VALUES " + statusNames.slice(0, statusNames.length - 1));
      }
    }
  } catch (err) {
    console.log(err); // FIXME: best error handler in the world
  }
}

const initTablesData = async () => {
  await initStatusTableData();
}

module.exports = {
  initDatabaseTables,
  initStatusTableData,
  initTablesData
}
