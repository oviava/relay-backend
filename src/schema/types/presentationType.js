import { resolver, attributeFields } from 'graphql-sequelize';

import {
  GraphQLObjectType,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import { Presentation, nodeInterface } from '../../models';
import speakerType from './speakerType';


const presentationType = new GraphQLObjectType({
  name: Presentation.name,
  description: 'A Presentation',
  fields: () => ({
    ...attributeFields(Presentation, {
      exclude: ['speakerId'],
    }),
    speaker: {
      type: speakerType,
      resolve: resolver(Presentation.Speaker),
    },
    id: globalIdField(Presentation.name),
  }),
  interfaces: [nodeInterface],
});

export default presentationType;
