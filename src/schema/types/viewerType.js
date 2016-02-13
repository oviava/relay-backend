import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';


import presentationType from '../types/presentationType';
import speakerType from '../types/speakerType';
import roomType from '../types/roomType';
import scheduleType from '../types/scheduleType';
import { Presentation, Speaker, Room, Schedule } from '../../models';

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

const viewerRoomsConnection = sequelizeConnection({
  name: 'viewerRooms',
  target: Room,
  nodeType: roomType,
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: () => Room.count(),
    },
  },
});

const viewerSchedulesConnection = sequelizeConnection({
  name: 'viewerSchedules',
  target: Schedule,
  nodeType: scheduleType,
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: () => Schedule.count(),
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
    rooms: {
      type: viewerRoomsConnection.connectionType,
      args: viewerRoomsConnection.connectionArgs,
      resolve: viewerRoomsConnection.resolve,
    },
    schedules: {
      type: viewerSchedulesConnection.connectionType,
      args: viewerSchedulesConnection.connectionArgs,
      resolve: viewerRoomsConnection.resolve,
    },
  }),
});

export default viewerType;
