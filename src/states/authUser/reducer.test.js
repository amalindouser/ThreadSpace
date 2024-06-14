/* eslint-disable linebreak-style */
/**
 * Test scenarios for the authUserReducer
 *
 * - authUserReducer function
 *   - should return the default state when an action type is unknown
 *   - should update the state with the authUser when receiving SET_AUTH_USER
 *   - should clear the state to null when receiving UNSET_AUTH_USER
 */

import { describe, expect, test } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  test('returns default state with unknown action type', () => {
    // Setup default state
    const defaultState = null;
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // Execute the reducer with unknown action
    const resultState = authUserReducer(defaultState, unknownAction);

    // Assert the state remains unchanged
    expect(resultState).toBe(defaultState);
  });

  test('updates state with authUser on SET_AUTH_USER action', () => {
    // Initialize state and action payload
    const initialState = null;
    const userData = {
      id: 'jane_doe',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    const setUserAction = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: userData },
    };

    // Execute the reducer to update state
    const resultState = authUserReducer(initialState, setUserAction);

    // Verify the new state matches the payload
    expect(resultState).toEqual(userData);
  });

  test('clears state to null on UNSET_AUTH_USER action', () => {
    // Initialize state with user data
    const initialState = {
      id: 'jane_doe',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    const unsetUserAction = { type: ActionType.UNSET_AUTH_USER };

    // Execute the reducer to clear state
    const resultState = authUserReducer(initialState, unsetUserAction);

    // Assert the state is cleared to null
    expect(resultState).toBeNull();
  });
});
