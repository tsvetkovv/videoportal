import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType,
} from 'graphql';
import jwt from 'jsonwebtoken';
import UserType from '../types/UserType';
import ErrorType from '../types/ErrorType';
import { User } from '../../mongoose/models';
import { auth } from '../../config';
import { handleAuth } from '../middlewares/auth';

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
    usernameOrEmail: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  resolve: async ({ request }, { usernameOrEmail, password }) => {
    const errors = [];
    const usernameOrEmailLC = usernameOrEmail.toLowerCase();

    const user = await User.findOne({
      $or: [{ username: usernameOrEmailLC }, { email: usernameOrEmailLC }],
    }).exec();

    if (user && user.comparePassword(password)) {
      user.token = jwt.sign({ id: user.id }, auth.jwt.secret, {
        expiresIn: auth.jwt.expires,
      });
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
