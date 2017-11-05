import { GraphQLString, GraphQLNonNull } from 'graphql';
import ErrorType from '../types/ErrorType';
import { Video } from '../../mongoose/models';
import { YOUTUBE_ID_REGEX } from '../../common/helpers';
import { parseErrors } from '../../mongoose/helpers';
import VideoType from '../types/VideoType';

const videoAdd = {
  type: VideoType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    youtubeId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ req: { user } }, { title, youtubeId }) => {
    let errors = [];
    let video = null;

    if (user) {
      if (!youtubeId.match(YOUTUBE_ID_REGEX)) {
        errors.push({
          key: 'incorrect_id',
          message: 'Incorrect youtube id',
        });
      } else {
        // check to see if there's already a user with that username
        const count = await Video.count({ youtubeId });

        if (count > 0) {
          errors.push({
            key: 'unique_id',
            message: 'Video with this id already exists',
          });
        } else {
          const dbVideo = new Video({
            youtubeId,
            title,
            author: user.id,
          });

          try {
            await dbVideo.save();
            video = dbVideo.toObject();
          } catch (err) {
            errors = errors.concat(parseErrors(err));
          }
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

    return video;
  },
};

export default videoAdd;
