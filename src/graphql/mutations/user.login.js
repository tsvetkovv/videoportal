import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType,
} from 'graphql';
import UserType from '../types/UserType';
import ErrorType from '../types/ErrorType';
import { User } from '../../mongoose/models';
import { handleAuth } from '../helpers/auth';

const outputType = new GraphQLObjectType({
  name: 'userLogin',
  fields: {
    user: { type: UserType },
    errors: { type: ErrorType },
  },
});

const userLogin = {
  type: outputType,
  args: {
    username: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  resolve: async ({ request }, { username, password }) => {
    const errors = [];

    const user = await User.findOne({
      username,
    }).exec();

    if (user && user.comparePassword(password)) {
      request.user = user;
      handleAuth(request, request.res);
    } else {
      errors.push({ key: 'general', message: 'Invalid credentials' });
    }

    return {
      user,
      errors,
    };
  },
};

export default userLogin;
