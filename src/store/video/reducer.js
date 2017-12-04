import { createReducer } from '../utils';
import {
  VIDEO_UPLOADED,
  VIDEO_CHANGE_RATING,
  VIDEO_CLAIMED,
  VIDEO_CHANGE_FAV,
} from './action';

const initialState = {
  rating: null,
  isFavorite: false,
  isLiked: false,
  isDisliked: false,
  isClaimed: false,
};

const actionHandlers = {
  [VIDEO_UPLOADED]: (
    state,
    { payload: { rating, isFavorite, isLiked, isDisliked, isClaimed } },
  ) => ({
    ...state,
    rating,
    isFavorite,
    isLiked,
    isDisliked,
    isClaimed,
  }),
  [VIDEO_CHANGE_RATING]: (
    state,
    { payload: { rating, isLiked, isDisliked } },
  ) => ({
    ...state,
    rating,
    isLiked,
    isDisliked,
  }),
  [VIDEO_CLAIMED]: (state, { payload: { isClaimed } }) => ({
    ...state,
    isClaimed,
  }),
  [VIDEO_CHANGE_FAV]: (state, { payload: { isFavorite } }) => ({
    ...state,
    isFavorite,
  }),
};

export default createReducer(actionHandlers, initialState);
