import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import VideoType from '../types/VideoType';
import ErrorType from '../types/ErrorType';
import OrderType from '../types/OrderType';
import { Video } from '../../mongoose/models';
import { ORDERS } from '../../constants';

const videosQuery = {
  type: new GraphQLList(VideoType),
  args: {
    orderBy: { type: new GraphQLNonNull(OrderType) },
    limit: { type: GraphQLInt },
  },
  resolve: async (_, { orderBy, limit }) => {
    const errors = [];
    let foundVideo = [];

    if (orderBy === ORDERS.date) {
      foundVideo = await Video.getNewestVideos(limit);
    }
    if (orderBy === ORDERS.rating) {
      foundVideo = await Video.getPopularVideos(limit);
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return foundVideo;
  },
};

export default videosQuery;
