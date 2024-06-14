import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

const handleApiResponse = async (apiCall, onSuccess, onFailure) => {
  try {
    const response = await apiCall();
    onSuccess(response);
  } catch (error) {
    onFailure(error);
  }
};

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    const apiCall = () => api.getOwnProfile();
    const onSuccess = (authUser) => {
      dispatch(setAuthUserActionCreator(authUser));
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    };
    const onFailure = (error) => {
      console.error('Error in asyncPreloadProcess:', error);
      dispatch(setAuthUserActionCreator(null));
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    };

    await handleApiResponse(apiCall, onSuccess, onFailure);
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
