import { GraphQLString } from 'graphql';
import UserType from '../types/UserType';
import User from '../../mongoose/models/User';
import ErrorType from '../types/ErrorType';

const userQuery = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
  },
  resolve: async ({ req }, { username }) => {
    const errors = [];

    if (req.user) {
      let user = req.user;

      if (username) {
        const foundUser = await User.getFullProfile({
          username,
        });

        if (foundUser) {
          user = foundUser;
        } else {
          errors.push({
            key: 'notFound',
            message: `User is not found with username: ${username}`,
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
