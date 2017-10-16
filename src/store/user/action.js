export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export function registerUser({ username, email, password }) {
  return {
    type: REGISTER_USER_REQUEST,
    payload: {
      username,
      email,
      password,
    },
  };
}
