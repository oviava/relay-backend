import { resolver, attributeFields } from 'graphql-sequelize';

import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { Schedule, nodeInterface } from '../../models';
import presentationType from './presentationType';

const scheduleType = new GraphQLObjectType({
  name: Schedule.name,
  description: 'A Schedule',
  fields: () => ({
    ...attributeFields(Schedule),
    presentations: {
      type: new GraphQLList(presentationType),
      resolve: resolver(Schedule.Presentations),
    },
    id: globalIdField(Schedule.name),
  }),
  interfaces: [nodeInterface],
});

export default scheduleType;
