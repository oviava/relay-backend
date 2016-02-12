import Hapi from 'hapi';
import graffiti from '@risingstack/graffiti';
import { sequelize } from './models';
import Schema from './schema';

const server = new Hapi.Server();

server.connection({
  port: 3000,
  routes: {
    cors: true,
  },
});

sequelize.sync().then(() => {
  server.register({
    register: graffiti.hapi,
    options: {
      schema: Schema,
    },
  }, () => {
    server.start(() => {
      console.log('Server Started'); // eslint-disable-line
    });
  });
});
