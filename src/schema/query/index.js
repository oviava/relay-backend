import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { resolver } from 'graphql-sequelize';
import { Room, Schedule, Speaker, Presentation, nodeTypeMapper, nodeField } from '../../models';

import speakerType from '../types/speakerType';
import presentationType from '../types/presentationType';
import scheduleType from '../types/scheduleType';
import roomType from '../types/roomType';
import viewerType from '../types/viewerType';

nodeTypeMapper.mapTypes({
  [Speaker.name]: speakerType,
  [Presentation.name]: presentationType,
  [Room.name]: roomType,
  [Schedule.name]: scheduleType,
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
      resolve: resolver(Speaker),
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
    room: {
      type: roomType,
      args: {
        id: {
          description: 'id of room',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: resolver(Room),
    },
    rooms: {
      type: new GraphQLList(roomType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        order: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Room),
    },
    schedule: {
      type: scheduleType,
      args: {
        id: {
          description: 'id of schedule',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: resolver(Schedule),
    },
    schedules: {
      type: new GraphQLList(scheduleType),
      args: {
        limit: {
          type: GraphQLInt,
        },
        order: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Schedule),
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
