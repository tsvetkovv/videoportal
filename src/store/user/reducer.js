import { createReducer } from '../utils';
import { REGISTER_USER_SUCCESS } from './action';

const initialState = {
  id: null,
  username: null,
  email: null,
};

const actionHandlers = {
  [REGISTER_USER_SUCCESS]: (state, { payload: { id, username, email } }) => ({
    ...state,
    id,
    username,
    email,
  }),
};

export default createReducer(actionHandlers, initialState);
