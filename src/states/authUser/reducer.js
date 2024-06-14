import { ActionType } from './action';

const stateMachine = {
  [ActionType.SET_AUTH_USER]: (state, action) => action.payload.authUser,
  [ActionType.UNSET_AUTH_USER]: () => null,
  default: (state) => state,
};

function authUserReducer(authUser = null, action = {}) {
  const handler = stateMachine[action.type] || stateMachine.default;
  return handler(authUser, action);
}

export default authUserReducer;
