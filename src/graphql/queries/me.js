import UserType from '../types/UserType';

const me = {
  type: UserType,
  resolve({ request }) {
    return (
      request.user && {
        id: request.user.id,
        username: request.user.username,
      }
    );
  },
};

export default me;
