import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import UserType from './UserType';

const VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: () => ({
    youtubeId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(UserType) },
    rating: { type: new GraphQLNonNull(GraphQLInt) },
    likedBy: { type: new GraphQLList(UserType) },
    dislikedBy: { type: new GraphQLList(UserType) },
    claimedBy: { type: new GraphQLList(UserType) },
    isBlocked: { type: GraphQLBoolean },
    isWarning: { type: GraphQLBoolean },
    isFavorite: { type: GraphQLBoolean },
  }),
});

export default VideoType;
