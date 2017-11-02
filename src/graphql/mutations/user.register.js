import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UserType from '../types/UserType';
import ErrorType from '../types/ErrorType';
import { User } from '../../mongoose/models';
import { parseErrors } from '../../mongoose/helpers';
import { handleAuth } from '../helpers/auth';

const userRegister = {
  type: UserType,
  args: {
    username: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  resolve: async ({ req, res }, { username, password }) => {
    let errors = [];
    let user = null;

    if (!req.user) {
      if (password.length < 8) {
        errors.push({
          key: 'password',
          message: 'Password must be at least 8 characters long',
        });
      }

      // check to see if there's already a user with that username
      const count = await User.count({ username });
      if (count > 0) {
        errors.push({
          key: 'username',
          message: 'User with this username already exists',
        });
      }

      if (errors.length === 0) {
        const userFromDb = new User({
          username,
          password: User.generateHash(password),
        });

        try {
          await userFromDb.save();
          user = userFromDb.toObject();
          req.user = user;
          handleAuth(req, res);
        } catch (err) {
          errors = errors.concat(parseErrors(err));
        }
      }
    } else {
      errors.push({
        key: 'logged',
        message: 'You already have an account',
      });
    }

    if (errors.length) {
      throw new ErrorType(errors);
    }

    return user;
  },
};

export default userRegister;
