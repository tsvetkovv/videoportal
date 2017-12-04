import { createReducer } from '../utils';
import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from './action';

const initialState = {
  id: null,
  username: null,
  role: null,
};

const actionHandlers = {
  [LOGIN_USER_SUCCESS]: (state, { payload: { id, username, role } }) => ({
    ...state,
    id,
    username,
    role,
  }),
  [REGISTER_USER_SUCCESS]: (state, { payload: { id, username, role } }) => ({
    ...state,
    id,
    username,
    role,
  }),
  [LOGOUT_USER_SUCCESS]: () => null,
};

export default createReducer(actionHandlers, initialState);
