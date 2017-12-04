export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = ({ id, username, role }) => ({
  type: REGISTER_USER_SUCCESS,
  payload: {
    id,
    username,
    role,
  },
});

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = ({ id, username, role }) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    id,
    username,
    role,
  },
});

export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});
