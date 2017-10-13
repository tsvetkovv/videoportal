import UserType from '../types/UserType';

const me = {
  type: UserType,
  resolve({ request }) {
    return (
      request.user && {
        id: request.user.id,
        email: request.user.email,
        token: request.user.token,
      }
    );
  },
};

export default me;
