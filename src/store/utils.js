export const createReducer = (actionHandlers = {}, initialState = {}) => (
  state = initialState,
  action,
) => {
  const reduceFn = actionHandlers[action.type];

  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, action);
};
