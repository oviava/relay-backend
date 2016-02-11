import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';


import presentationType from '../types/presentationType';
import speakerType from '../types/speakerType';
import { Presentation, Speaker } from '../../models';

import { relay } from 'graphql-sequelize';

const { sequelizeConnection } = relay;

const viewerPresentationsConnection = sequelizeConnection({
  name: 'viewerPresentations',
  target: Presentation,
  nodeType: presentationType,
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: () => Presentation.count(),
    },
  },
});

const viewerSpeakersConnection = sequelizeConnection({
  name: 'viewerSpeakers',
  target: Speaker,
  nodeType: speakerType,
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: () => Speaker.count(),
    },
  },
});

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    presentations: {
      type: viewerPresentationsConnection.connectionType,
      args: viewerPresentationsConnection.connectionArgs,
      resolve: viewerPresentationsConnection.resolve,
    },
    speakers: {
      type: viewerSpeakersConnection.connectionType,
      args: viewerSpeakersConnection.connectionArgs,
      resolve: viewerSpeakersConnection.resolve,
    },
  }),
});

export default viewerType;
