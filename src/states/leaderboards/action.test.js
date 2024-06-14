/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/**
 * Test scenarios for fetchLeaderboards thunk
 *
 * - fetchLeaderboards thunk
 *   - should dispatch showLoading action when fetching leaderboards
 *   - should dispatch receiveLeaderboardsAction correctly when data fetching success
 *   - should dispatch hideLoading action when data fetching completed (success or failure)
 *   - should log a warning when data fetching failed
 */

import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
  } from 'vitest';
  import { hideLoading, showLoading } from 'react-redux-loading-bar';
  import api from '../../utils/api';
  import {
    fetchLeaderboards,
    receiveLeaderboardsAction,
  } from './action';
  
  const fakeLeaderboards = [
    { id: 1, username: 'user1', score: 100 },
    { id: 2, username: 'user2', score: 95 },
    { id: 3, username: 'user3', score: 90 },
  ];
  
  const fakeError = new Error('Failed to fetch leaderboards');
  
  describe('fetchLeaderboards thunk', () => {
    let originalSeeLeaderboards;
  
    beforeEach(() => {
      originalSeeLeaderboards = api.seeLeaderboards;
    });
  
    afterEach(() => {
      api.seeLeaderboards = originalSeeLeaderboards;
    });
  
    it('should dispatch showLoading action when fetching leaderboards', async () => {
      // Arrange
      api.seeLeaderboards = vi.fn().mockResolvedValue(fakeLeaderboards);
      const dispatch = vi.fn();
  
      // Act
      await fetchLeaderboards()(dispatch);
  
      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
    });
  
    it('should dispatch receiveLeaderboardsAction correctly when data fetching success', async () => {
      // Arrange
      api.seeLeaderboards = vi.fn().mockResolvedValue(fakeLeaderboards);
      const dispatch = vi.fn();
  
      // Act
      await fetchLeaderboards()(dispatch);
  
      // Assert
      expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsAction(fakeLeaderboards));
    });
  
    it('should dispatch hideLoading action when data fetching completed (success or failure)', async () => {
      // Arrange
      api.seeLeaderboards = vi.fn().mockResolvedValue(fakeLeaderboards);
      const dispatch = vi.fn();
  
      // Act
      await fetchLeaderboards()(dispatch);
  
      // Assert
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  
    it('should log a warning when data fetching failed', async () => {
      // Arrange
      api.seeLeaderboards = vi.fn().mockRejectedValue(fakeError);
      const dispatch = vi.fn();
      console.warn = vi.fn();
  
      // Act
      await fetchLeaderboards()(dispatch);
  
      // Assert
      expect(console.warn).toHaveBeenCalledWith('Failed to load leaderboards:', fakeError);
    });
  });
