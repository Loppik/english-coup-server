const newError = (type, error) => new Error(`${type}: ${error}`);

const DATABASE_ERRORS = {
  UNABLE_TO_CONNECT: 'Unable to connect to the database',
  INVALID_CATALOG_NAME: 'There is no such database'
};

module.exports = {
  newError,
  DATABASE_ERRORS
};
