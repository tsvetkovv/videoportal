import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import user from './queries/user';
import video from './queries/video';
import videos from './queries/videos';
import news from './queries/news';
import userLogin from './mutations/user.login';
import userLogout from './mutations/user.logout';
import userRegister from './mutations/user.register';
import videoAdd from './mutations/video.add';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      user,
      video,
      videos,
      news,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      userLogin,
      userLogout,
      userRegister,
      videoAdd,
    },
  }),
});

export default schema;
