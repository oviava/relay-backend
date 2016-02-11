import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { relay } from 'graphql-sequelize';

const { sequelizeNodeInterface } = relay;

const sequelize = new Sequelize('graphql', 'sfuser', 'sfpass', {
  host: 'localhost',
  dialect: 'mariadb',
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.nodeField = nodeField;
db.nodeTypeMapper = nodeTypeMapper;
db.nodeInterface = nodeInterface;

module.exports = db;
