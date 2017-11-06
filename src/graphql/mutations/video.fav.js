import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import ErrorType from '../types/ErrorType';
import { Video } from '../../mongoose/models';
import { YOUTUBE_ID_REGEX } from '../../common/helpers';

const videoFav = {
  type: GraphQLBoolean,
  args: {
    youtubeId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ req: { user } }, { youtubeId }) => {
    const errors = [];

    if (user) {
      if (!youtubeId.match(YOUTUBE_ID_REGEX)) {
        errors.push({
          key: 'incorrect_id',
          message: 'Incorrect youtube id',
        });
      } else {
        const foundVideo = await Video.findOne({ youtubeId });

        if (foundVideo) {
          await user.addToFavorite(foundVideo.id);
        } else {
          errors.push({
            key: 'not_found',
            message: 'Video with this id is not exist',
          });
        }
      }
    } else {
      errors.push({
        key: 'unauthorized',
        message: 'You did not login',
      });
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return null;
  },
};

export default videoFav;
