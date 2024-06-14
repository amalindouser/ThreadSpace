import { ActionType } from './action';

const processLeaderboards = (leaderboards) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  leaderboards.map((item) => ({
    ...item,
    user: {
      ...item.user,
      displayName: `${item.user.name} (${item.user.email})`,
    },
  }));

// The main reducer function
const leaderboardsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return processLeaderboards(action.payload.leaderboards);
    default:
      return state;
  }
};

export default leaderboardsReducer;
