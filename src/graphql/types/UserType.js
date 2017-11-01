import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import RoleType from './RoleType';
import VideoType from './VideoType';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    secondName: { type: GraphQLString },
    role: { type: new GraphQLNonNull(RoleType) },
    claimedVideos: { type: new GraphQLList(VideoType) },
    favoriteVideos: { type: new GraphQLList(VideoType) },
  }),
});

export default UserType;
