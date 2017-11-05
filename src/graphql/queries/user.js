import { GraphQLString, GraphQLNonNull } from 'graphql';
import UserType from '../types/UserType';
import { User, Video } from '../../mongoose/models';
import ErrorType from '../types/ErrorType';

const userQuery = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ req }, { id: userId }) => {
    const errors = [];

    if (req.user) {
      let user = null;

      if (userId) {
        const foundUser = await User.getFullProfile({
          _id: userId,
        });

        if (foundUser) {
          user = foundUser;
          user.ownVideos = await Video.find({ author: user.id });
        } else {
          errors.push({
            key: 'notFound',
            message: `User is not found with id: ${userId}`,
          });
        }
      }

      if (errors.length) {
        throw new ErrorType(errors);
      }
      return user;
    }

    throw new ErrorType([
      {
        key: 'unauthorized',
        message: 'You did not login',
      },
    ]);
  },
};

export default userQuery;
