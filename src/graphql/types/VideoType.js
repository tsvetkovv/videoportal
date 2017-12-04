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
    isBlocked: { type: new GraphQLNonNull(GraphQLBoolean) },
    isWarning: { type: new GraphQLNonNull(GraphQLBoolean) },
    isFavorite: { type: GraphQLBoolean },
    isLiked: { type: GraphQLBoolean },
    isDisliked: { type: GraphQLBoolean },
    isClaimed: { type: GraphQLBoolean },
  }),
});

export default VideoType;
