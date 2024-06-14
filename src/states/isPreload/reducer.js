import { ActionType } from './action';

const initialState = true;
const actionHandlers = {
  [ActionType.SET_IS_PRELOAD]: (state, action) => action.payload.isPreload,
};

const handleAction = (state, action) => {
  if (Object.prototype.hasOwnProperty.call(actionHandlers, action.type)) {
    return actionHandlers[action.type](state, action);
  }
  return state;
};

function isPreloadReducer(state = initialState, action = {}) {
  return handleAction(state, action);
}

export default isPreloadReducer;
