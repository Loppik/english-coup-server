const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./configs/server');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

const route = require('./modules');
app.use(route);

const initDatabase = require('./initDatabase');
initDatabase.initDatabaseTables();
initDatabase.initTablesData();

app.listen(config.port, () => {
  console.log(`Server listening on http://${config.host}:${config.port}`)
})

module.exports = app;
