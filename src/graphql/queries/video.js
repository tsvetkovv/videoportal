import { GraphQLString, GraphQLNonNull } from 'graphql';
import VideoType from '../types/VideoType';
import ErrorType from '../types/ErrorType';
import { Video } from '../../mongoose/models';

const videoQuery = {
  type: VideoType,
  args: {
    youtubeId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ req: { user } }, { youtubeId }) => {
    const errors = [];

    const foundVideo = await Video.findOne({ youtubeId }).populate('author');

    if (user) {
      foundVideo.isFavorite = user.favoriteVideos.some(video =>
        video.equals(foundVideo.id),
      );
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return foundVideo;
  },
};

export default videoQuery;
