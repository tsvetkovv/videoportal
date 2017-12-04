import { combineReducers } from 'redux';
import user from './user/reducer';
import video from './video/reducer';
import runtime from './runtime/reducer';

export default combineReducers({
  user,
  video,
  runtime,
});
