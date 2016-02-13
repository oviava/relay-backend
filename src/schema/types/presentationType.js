import { resolver, attributeFields } from 'graphql-sequelize';

import {
  GraphQLObjectType,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { Presentation, nodeInterface } from '../../models';
import speakerType from './speakerType';
import roomType from './roomType';
import scheduleType from './scheduleType';


const presentationType = new GraphQLObjectType({
  name: Presentation.name,
  description: 'A Presentation',
  fields: () => ({
    ...attributeFields(Presentation, {
      // we remove the default foreignKey and use 'speaker'
      exclude: ['speakerId', 'roomId', 'scheduleId'],
    }),
    speaker: {
      type: speakerType,
      resolve: resolver(Presentation.Speaker),
    },
    room: {
      type: roomType,
      resolve: resolver(Presentation.Room),
    },
    schedule: {
      type: scheduleType,
      resolve: resolver(Presentation.Schedule),
    },
    id: globalIdField(Presentation.name),
  }),
  interfaces: [nodeInterface],
});

export default presentationType;
