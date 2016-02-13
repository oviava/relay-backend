import { resolver, attributeFields } from 'graphql-sequelize';

import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { Room, nodeInterface } from '../../models';
import presentationType from './presentationType';

const roomType = new GraphQLObjectType({
  name: Room.name,
  description: 'A Room',
  fields: () => ({
    ...attributeFields(Room),
    presentations: {
      type: new GraphQLList(presentationType),
      resolve: resolver(Room.Presentations),
    },
    id: globalIdField(Room.name),
  }),
  interfaces: [nodeInterface],
});

export default roomType;
