import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UserType from '../types/UserType';
import ErrorType from '../types/ErrorType';
import { User } from '../../mongoose/models';
import { handleAuth } from '../helpers/auth';

const userLogin = {
  type: UserType,
  args: {
    username: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  resolve: async ({ req, res }, { username, password }) => {
    const errors = [];

    const user = await User.findOne({
      username,
    }).exec();

    if (user && user.comparePassword(password)) {
      req.user = user;
      handleAuth(req, res);
    } else {
      errors.push({
        key: 'invalidCredentials',
        message: 'Invalid credentials',
      });
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return user;
  },
};

export default userLogin;
