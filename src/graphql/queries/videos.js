import { GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';

import VideoType from '../types/VideoType';
import ErrorType from '../types/ErrorType';
import OrderType from '../types/OrderType';
import { Video } from '../../mongoose/models';
import { ORDERS, USER_ROLES } from '../../constants';

const videosQuery = {
  type: new GraphQLList(VideoType),
  args: {
    orderBy: { type: OrderType },
    limit: { type: GraphQLInt },
    blamed: { type: GraphQLBoolean },
  },
  resolve: async ({ req: { user } }, { orderBy, limit, blamed }) => {
    const errors = [];
    let foundVideo = [];

    if (!blamed) {
      if (orderBy === ORDERS.rating) {
        foundVideo = await Video.getPopularVideos(limit);
      } else {
        foundVideo = await Video.getNewestVideos(limit);
      }
    } else if (user && user.role === USER_ROLES.admin) {
      foundVideo = await Video.getBlockedVideos();
    } else {
      errors.push({
        key: 'access_denied',
        message: 'You do not have permission',
      });
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return foundVideo;
  },
};

export default videosQuery;
