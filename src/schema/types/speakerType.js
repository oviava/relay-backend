import { resolver, attributeFields } from 'graphql-sequelize';

import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { Speaker, nodeInterface } from '../../models/index';
import presentationType from './presentationType';


const speakerType = new GraphQLObjectType({
  name: Speaker.name,
  description: 'A Speaker',
  fields: () => ({
    ...attributeFields(Speaker),
    presentations: {
      type: new GraphQLList(presentationType),
      resolve: resolver(Speaker.Presentations),
    },
    id: globalIdField(Speaker.name),
  }),
  interfaces: [nodeInterface],
});

export default speakerType;
