/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the threads and users when given a RECEIVE_THREADS action
 *  - should return the threads with the new thread when given an ADD_THREAD action
 *  - should return the threads with the toggled upvote when given an UPVOTE_THREAD action
 *  - should return the threads with the toggled downvote when given a DOWNVOTE_THREAD action
 *  - should return the threads with the neutralized vote when given a NEUTRALIZE_THREAD_VOTE action
 *
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

const initialState = {
  threads: [],
  users: [],
  isLoading: false,
  error: null,
};

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads and users when given a RECEIVE_THREADS action', () => {
    // arrange
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread 1' },
          { id: 'thread-2', title: 'Thread 2' },
        ],
        users: [
          { id: 'user-1', name: 'User 1' },
          { id: 'user-2', name: 'User 2' },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      threads: action.payload.threads,
      users: action.payload.users,
      isLoading: false,
      error: null,
    });
  });

  it('should return the threads with the new thread when given an ADD_THREAD action', () => {
    // arrange
    const stateWithThreads = {
      ...initialState,
      threads: [{ id: 'thread-1', title: 'Thread 1' }],
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: { id: 'thread-2', title: 'Thread 2' },
      },
    };

    // action
    const nextState = threadsReducer(stateWithThreads, action);

    // assert
    expect(nextState).toEqual({
      ...stateWithThreads,
      threads: [action.payload.thread, ...stateWithThreads.threads],
    });
  });

  it('should return the threads with the toggled upvote when given an UPVOTE_THREAD action', () => {
    // arrange
    const stateWithThreads = {
      ...initialState,
      threads: [
        {
          id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(stateWithThreads, action);

    // assert
    expect(nextState).toEqual({
      ...stateWithThreads,
      threads: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    });

    // action: remove upvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(stateWithThreads);
  });

  it('should return the threads with the toggled downvote when given a DOWNVOTE_THREAD action', () => {
    // arrange
    const stateWithThreads = {
      ...initialState,
      threads: [
        {
          id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(stateWithThreads, action);

    // assert
    expect(nextState).toEqual({
      ...stateWithThreads,
      threads: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    });

    // action: remove downvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(stateWithThreads);
  });

  it('should return the threads with the neutralized vote when given a NEUTRALIZE_THREAD_VOTE action', () => {
    // arrange
    const stateWithThreads = {
      ...initialState,
      threads: [
        {
          id: 'thread-1', title: 'Thread 1', upVotesBy: ['user-1'], downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_THREAD_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(stateWithThreads, action);

    // assert
    expect(nextState).toEqual({
      ...stateWithThreads,
      threads: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
