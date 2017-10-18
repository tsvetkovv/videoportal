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
  resolve: async (source, { username, email, password }) => {
    const errors = [];
    let user = null;

    if (password.length < 8) {
      errors.push({
        key: 'password',
        message: 'Password must be at least 8 characters long',
      });
    }

    // check to see if there's already a user with that email
    const count = await User.count({ email });
    if (count > 0) {
      errors.push({
        key: 'email',
        message: 'User with this email already exists',
      });
    }

    if (count === 0 && errors.length === 0) {
      const createUser = await User.create({
        username,
        email: email.toLowerCase(),
        password: User.generateHash(password),
      });

      user = createUser.dataValues;
      user.token = jwt.sign({ id: user.id }, auth.jwt.secret, {
        expiresIn: auth.jwt.expires,
      });
    }

    return {
      user,
      errors,
    };
  },
};

export default userRegister;
