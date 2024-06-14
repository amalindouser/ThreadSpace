/* eslint-disable linebreak-style */
/**
 * skenario test
 *
 * - fetchThreadsAndUsers thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  fetchThreadsAndUsers,
  fetchThreadsAndUsersBegin,
  fetchThreadsAndUsersSuccess,
  fetchThreadsAndUsersError,
} from './action';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadsResponse = [
  { id: 'thread-1', title: 'Thread 1' },
];

const fakeUsersResponse = [
  { id: 'user-1', name: 'User Test 1', photo: 'https://generated-image-url.jpg' },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('fetchThreadsAndUsers thunk', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-self-assign
    api.seeAllThreads = api.seeAllThreads;
    // eslint-disable-next-line no-self-assign
    api.getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    // eslint-disable-next-line no-self-assign
    api.seeAllThreads = api.seeAllThreads;
    // eslint-disable-next-line no-self-assign
    api.getAllUsers = api.getAllUsers;

    // delete backup data
    delete api.seeAllThreads;
    delete api.getAllUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.seeAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    const dispatch = vi.fn();

    // action
    await fetchThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersBegin());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersSuccess(fakeThreadsResponse, fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call toast correctly when data fetching failed', async () => {
    // arrange
    api.seeAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    toast.error = vi.fn();

    // action
    await fetchThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersBegin());
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersError(fakeErrorResponse.message));
    expect(toast.error).toHaveBeenCalledWith(`Error fetching data: ${fakeErrorResponse.message}`);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
