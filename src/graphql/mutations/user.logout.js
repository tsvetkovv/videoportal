import UserType from '../types/UserType';

const userLogout = {
  type: UserType,
  // pass res in src/server.js
  resolve({ request: { res } }) {
    res.clearCookie('id_token');
  },
};

export default userLogout;
