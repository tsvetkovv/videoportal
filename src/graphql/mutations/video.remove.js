import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import ErrorType from '../types/ErrorType';
import { Video } from '../../mongoose/models';
import { YOUTUBE_ID_REGEX } from '../../common/helpers';
import { USER_ROLES } from '../../constants';

const videoRemove = {
  type: GraphQLBoolean,
  args: {
    youtubeId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ req: { user } }, { youtubeId }) => {
    const errors = [];
    let res = false;

    if (user) {
      if (youtubeId.match(YOUTUBE_ID_REGEX)) {
        const foundVideo = await Video.findOne({ youtubeId });
        if (foundVideo) {
          if (
            user === USER_ROLES.admin ||
            foundVideo.author.toString() === user.id.toString()
          ) {
            await Video.findByIdAndRemove(foundVideo.id);
            res = true;
          } else {
            errors.push({
              key: 'access_denied',
              message: 'You do not have permission',
            });
          }
        } else {
          errors.push({
            key: 'not_found',
            message: 'Video with this id is not exist',
          });
        }
      } else {
        errors.push({
          key: 'incorrect_id',
          message: 'Incorrect youtube id',
        });
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

    return res;
  },
};

export default videoRemove;
