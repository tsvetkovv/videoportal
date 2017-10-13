import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
// import userCreate from './mutations/userCreate';
import userLogin from './mutations/user.login';
import userLogout from './mutations/user.logout';
import userRegister from './mutations/user.register';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      // userCreate,
      userLogin,
      userLogout,
      userRegister,
    },
  }),
});

export default schema;
