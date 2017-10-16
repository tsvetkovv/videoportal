import { combineReducers } from 'redux';
import user from './user/reducer';
import runtime from './runtime/reducer';

export default combineReducers({
  user,
  runtime,
});
