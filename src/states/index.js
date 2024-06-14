import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

// Import reducer dinamis
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import threadDetailReducer from './threadDetail/reducer';

// Fungsi pembantu untuk menggabungkan semua reducer
const createRootReducer = (asyncReducers) => combineReducers({
  ...asyncReducers,
  loadingBar: loadingBarReducer, // Reducer statis
});

// Konfigurasi awal store tanpa reducer dinamis
const store = configureStore({
  reducer: createRootReducer({}),
});

// Menyimpan referensi reducer dinamis
store.asyncReducers = {};

// Fungsi untuk memuat reducer secara dinamis
export const loadReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createRootReducer(store.asyncReducers));
};

// Memuat reducer secara dinamis
loadReducer('authUser', authUserReducer);
loadReducer('isPreload', isPreloadReducer);
loadReducer('threads', threadsReducer);
loadReducer('users', usersReducer);
loadReducer('leaderboards', leaderboardsReducer);
loadReducer('threadDetail', threadDetailReducer);

export default store;
