import { createReducer } from '../utils';
import { LOGIN_USER_SUCCESS } from './action';

const initialState = {
  id: null,
  username: null,
  email: null,
};

const actionHandlers = {
  [LOGIN_USER_SUCCESS]: (state, { payload: { id, username, email } }) => ({
    ...state,
    id,
    username,
    email,
  }),
};

export default createReducer(actionHandlers, initialState);
