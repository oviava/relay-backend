import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { relay } from 'graphql-sequelize';

const { sequelizeNodeInterface } = relay;


// change these details to match your db config
const sequelize = new Sequelize('graphql', 'sfuser', 'sfpass', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // eslint-disable-line
});

let db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

const {
  nodeField,
  nodeTypeMapper,
  nodeInterface,
} = sequelizeNodeInterface(sequelize);

db = {
  ...db,
  sequelize,
  Sequelize,
  nodeField,
  nodeTypeMapper,
  nodeInterface,
};

module.exports = db;
