import { createReducer } from '../utils';
import { SET_RUNTIME_VARIABLE } from './action';

const actionHandlers = {
  [SET_RUNTIME_VARIABLE]: (state, { payload: { name, value } }) => ({
    ...state,
    [name]: value,
  }),
};

export default createReducer(actionHandlers);
