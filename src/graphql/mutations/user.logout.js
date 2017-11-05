import { GraphQLBoolean } from 'graphql';

const userLogout = {
  type: GraphQLBoolean,
  // pass res in src/server.js
  resolve({ res }) {
    res.clearCookie('id_token');
  },
};

export default userLogout;
