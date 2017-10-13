import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const CreateUser = new GraphQLObjectType({
  name: 'CreateUser',
  args: {
    login: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export default CreateUser;
