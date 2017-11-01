import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import user from './queries/user';
import news from './queries/news';
import userLogin from './mutations/user.login';
import userLogout from './mutations/user.logout';
import userRegister from './mutations/user.register';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      user,
      news,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      userLogin,
      userLogout,
      userRegister,
    },
  }),
});

export default schema;
