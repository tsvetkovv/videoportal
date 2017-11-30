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

    if (!foundVideo) {
      errors.push({
        key: 'notFound',
        message: `Video is not found with id: ${youtubeId}`,
      });
    } else if (user) {
      foundVideo.isFavorite = user.favoriteVideos.some(video =>
        video.equals(foundVideo.id),
      );
      foundVideo.isLiked = foundVideo.likedBy.some(u => u.equals(user.id));
      foundVideo.isDisliked = foundVideo.dislikedBy.some(u =>
        u.equals(user.id),
      );
      foundVideo.isClaimed = foundVideo.claimedBy.some(u => u.equals(user.id));
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return foundVideo;
  },
};

export default videoQuery;
