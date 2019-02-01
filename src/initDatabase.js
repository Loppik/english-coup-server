const { Client } = require('pg');
const config = require('./configs/db');

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
})
client.connect()

exports.initDatabaseTables = () => {
  try {
    client.query("CREATE TABLE IF NOT EXISTS users ( user_id INT PRIMARY KEY, email VARCHAR(30), password VARCHAR(20) )");
    client.query("CREATE TABLE IF NOT EXISTS status ( status_id INT PRIMARY KEY, name VARCHAR(30) )");
    client.query("CREATE TABLE IF NOT EXISTS userWords ( word_id INT PRIMARY KEY, status_id INT, user_id INT )");
    client.query("CREATE TABLE IF NOT EXISTS words ( word_id SERIAL PRIMARY KEY, original VARCHAR(50), translation VARCHAR(50), custom BOOLEAN )");
  } catch(err) {
    console.log(err);
  }
}
