const production = {
  client: 'pg',
  host: 'ec2-46-137-187-23.eu-west-1.compute.amazonaws.com',
  user: 'vmbwkpriyellxo',
  password: '8d9c45d4354150e727d327080fc315a7c1f16ca4e69aa50933f5675bba6bbc2a',
  database: 'ddrs56l1d0vt09',
  ssl: true
};

const development = {
  client: 'pg',
  host: '127.0.0.1',
  user: 'postgres',
  password: '123',
  database: 'english_coup',
  ssl: false
};

module.exports = {
  production,
  development
};
