import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType,
} from 'graphql';
import UserType from '../types/UserType';
import ErrorType from '../types/ErrorType';
import { User } from '../../mongoose/models';
import { parseErrors } from '../../mongoose/helpers';
import { handleAuth } from '../middlewares/auth';

const outputType = new GraphQLObjectType({
  name: 'userRegister',
  fields: {
    user: { type: UserType },
    errors: { type: ErrorType },
  },
});

const userRegister = {
  type: outputType,
  args: {
    username: { type: new NonNull(StringType) },
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  resolve: async ({ request }, { username, email, password }) => {
    let errors = [];
    let user = null;

    if (!request.user) {
      if (password.length < 8) {
        errors.push({
          key: 'password',
          message: 'Password must be at least 8 characters long',
        });
      }

      // check to see if there's already a user with that email
      const count = await User.count({ username });
      if (count > 0) {
        errors.push({
          key: 'email',
          message: 'User with this username already exists',
        });
      }

      if (errors.length === 0) {
        const userFromDb = new User({
          username,
          email: email.toLowerCase(),
          password: User.generateHash(password),
        });

        try {
          await userFromDb.save();
          user = userFromDb.toObject();
          request.user = user;
        } catch (err) {
          errors = errors.concat(parseErrors(err));
        }
      }
      handleAuth(request, request.res);
    } else {
      errors.push({
        key: 'logged',
        message: 'You already have an account',
      });
    }

    return {
      user,
      errors,
    };
  },
};

export default userRegister;
