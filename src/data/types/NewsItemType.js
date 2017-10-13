import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

const NewsItemType = new GraphQLObjectType({
  name: 'NewsItem',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    link: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLString },
    pubDate: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
  },
});

export default NewsItemType;
