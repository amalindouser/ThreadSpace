import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveLeaderboardsAction } from './action';


export const fetchLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const leaderboards = await api.seeLeaderboards();
    dispatch(receiveLeaderboardsAction(leaderboards));
  } catch (error) {
    console.warn('Failed to load leaderboards:', error);
  } finally {
    dispatch(hideLoading());
  }
};
