import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
} from 'graphql-relay';

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
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      // by default resolver doesn't use globalId - small workaround
      // courtesy of @mhansen
      resolve: resolver(Speaker, {
        before: (options, args, root) => {
          options.where = options.where || {};
          if (args.id) {
            options.where.id = fromGlobalId(args.id).id;
          } else {
            throw new Error('Can only query a by id');
          }
          return options;
        },
      }),
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
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: resolver(Presentation, {
        before: (options, args, root) => {
          options.where = options.where || {};
          if (args.id) {
            options.where.id = fromGlobalId(args.id).id;
          } else {
            throw new Error('Can only query a by id');
          }
          return options;
        },
      }),
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
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: resolver(Room, {
        before: (options, args, root) => {
          options.where = options.where || {};
          if (args.id) {
            options.where.id = fromGlobalId(args.id).id;
          } else {
            throw new Error('Can only query a by id');
          }
          return options;
        },
      }),
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
          type: new GraphQLNonNull(GraphQLID, {
            before: (options, args, root) => {
              options.where = options.where || {};
              if (args.id) {
                options.where.id = fromGlobalId(args.id).id;
              } else {
                throw new Error('Can only query a by id');
              }
              return options;
            },
          }),
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
