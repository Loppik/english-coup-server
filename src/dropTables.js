const Schemes = require('./schemes');

const createSchemesArray = () => {
  const schemesArray = [];
  Object.keys(Schemes).forEach((key) => schemesArray.push(Schemes[key]));
  return schemesArray;
};

const schemesArray = createSchemesArray();
const dropTables = async () => {
  await Schemes.Userword.drop();
  await schemesArray.forEach((scheme) => scheme.drop());
};

dropTables();
