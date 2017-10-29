import { createReducer } from '../utils';
import { LOGIN_USER_SUCCESS } from './action';

const initialState = {
  id: null,
  username: null,
};

const actionHandlers = {
  [LOGIN_USER_SUCCESS]: (state, { payload: { id, username } }) => ({
    ...state,
    id,
    username,
  }),
};

export default createReducer(actionHandlers, initialState);
