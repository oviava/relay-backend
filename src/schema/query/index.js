import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { resolver } from 'graphql-sequelize';
import { Speaker, Presentation, nodeTypeMapper, nodeField } from '../../models';

import speakerType from '../types/speakerType';
import presentationType from '../types/presentationType';
import viewerType from '../types/viewerType';

nodeTypeMapper.mapTypes({
  [Speaker.name]: speakerType,
  [Presentation.name]: presentationType,
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    speaker: {
      type: speakerType,
      args: {
        id: {
          description: 'id of speaker',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: resolver(Speaker, { filterAttributes: false }),
    },
    speakers: {
      type: new GraphQLList(speakerType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        order: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Speaker),
    },
    presentation: {
      type: presentationType,
      args: {
        id: {
          description: 'id of presentation',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: resolver(Presentation),
    },
    presentations: {
      type: new GraphQLList(presentationType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        order: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Presentation),
    },
    viewer: {
      type: viewerType,
      // resolve: (source, args, info) => {
      //   return info.rootValue.viewer;
      // },
      resolve: () => { // eslint-disable-line
        return { id: 'viewer' };
      },
    },
    node: nodeField,
  }),
});


export default query;
