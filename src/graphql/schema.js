import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import user from './queries/user';
import video from './queries/video';
import videos from './queries/videos';
import userLogin from './mutations/user.login';
import userLogout from './mutations/user.logout';
import userRegister from './mutations/user.register';
import videoAdd from './mutations/video.add';
import videoRemove from './mutations/video.remove';
import videoClaim from './mutations/video.claim';
import videoClearClaims from './mutations/video.clearClaims';
import videoFav from './mutations/video.fav';
import videoUnfav from './mutations/video.unfav';
import videoLike from './mutations/video.like';
import videoDislike from './mutations/video.dislike';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      user,
      video,
      videos,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      userLogin,
      userLogout,
      userRegister,
      videoAdd,
      videoRemove,
      videoClaim,
      videoClearClaims,
      videoFav,
      videoUnfav,
      videoLike,
      videoDislike,
    },
  }),
});

export default schema;
