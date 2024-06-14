import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

export const ActionTypes = {
  FETCH_THREADS_AND_USERS_BEGIN: 'FETCH_THREADS_AND_USERS_BEGIN',
  FETCH_THREADS_AND_USERS_SUCCESS: 'FETCH_THREADS_AND_USERS_SUCCESS',
  FETCH_THREADS_AND_USERS_ERROR: 'FETCH_THREADS_AND_USERS_ERROR',
};

export const fetchThreadsAndUsersBegin = () => ({
  type: ActionTypes.FETCH_THREADS_AND_USERS_BEGIN,
});

export const fetchThreadsAndUsersSuccess = (threads, users) => ({
  type: ActionTypes.FETCH_THREADS_AND_USERS_SUCCESS,
  payload: { threads, users },
});

export const fetchThreadsAndUsersError = (error) => ({
  type: ActionTypes.FETCH_THREADS_AND_USERS_ERROR,
  payload: { error },
});

// eslint-disable-next-line arrow-body-style
export const fetchThreadsAndUsers = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(fetchThreadsAndUsersBegin());

    try {
      const [threads, users] = await Promise.all([
        api.seeAllThreads(),
        api.getAllUsers(),
      ]);

      dispatch(receiveThreadActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
      dispatch(fetchThreadsAndUsersSuccess(threads, users));
    } catch (error) {
      dispatch(fetchThreadsAndUsersError(error.message));
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      dispatch(hideLoading());
    }
  };
};
