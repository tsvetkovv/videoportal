import { GraphQLString, GraphQLNonNull } from 'graphql';
import VideoType from '../types/VideoType';
import ErrorType from '../types/ErrorType';
import { Video } from '../../mongoose/models';

const userQuery = {
  type: VideoType,
  args: {
    youtubeId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { youtubeId }) => {
    const errors = [];

    const foundVideo = await Video.findOne({ youtubeId }).populate('author');

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return foundVideo;
  },
};

export default userQuery;
