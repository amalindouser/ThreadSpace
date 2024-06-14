/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
import {
    afterEach, beforeEach, describe, expect, it, vi,
  } from 'vitest';
  import { hideLoading, showLoading } from 'react-redux-loading-bar';
  import api from '../../utils/api';
  import {
    asyncSetAuthUser,
    asyncUnsetAuthUser,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator,
  } from './action';
  
  const fakeAccessToken = 'fakeAccessToken';
  
  const fakeAuthUser = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };
  
  const fakeError = new Error('Oops, something went wrong');
  
  describe('asyncSetAuthUser thunk', () => {
    let originalLogin;
    let originalGetOwnProfile;
  
    beforeEach(() => {
      originalLogin = api.login;
      originalGetOwnProfile = api.getOwnProfile;
    });
  
    afterEach(() => {
      api.login = originalLogin;
      api.getOwnProfile = originalGetOwnProfile;
      localStorage.clear();
    });
  
    it('should store accessToken in local storage when user login', async () => {
      // Arrange
      api.login = vi.fn().mockResolvedValue(fakeAccessToken);
      api.getOwnProfile = vi.fn().mockResolvedValue(fakeAuthUser);
      const dispatch = vi.fn();
  
      // Act
      await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);
  
      // Assert
      expect(localStorage.getItem('accessToken')).toBe(fakeAccessToken);
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
      expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUserActionCreator(fakeAuthUser));
      expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
    });
  
    it('should dispatch action correctly when data fetching success', async () => {
      // Arrange
      api.login = vi.fn().mockResolvedValue(fakeAccessToken);
      api.getOwnProfile = vi.fn().mockResolvedValue(fakeAuthUser);
      const dispatch = vi.fn();
  
      // Act
      await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);
  
      // Assert
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
      expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUserActionCreator(fakeAuthUser));
      expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
    });
  
    it('should dispatch action and call console.error correctly when data fetching failed', async () => {
      // Arrange
      api.login = vi.fn().mockRejectedValue(fakeError);
      api.getOwnProfile = vi.fn().mockRejectedValue(fakeError);
      const dispatch = vi.fn();
      console.error = vi.fn();
  
      // Act
      await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);
  
      // Assert
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
      expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
      expect(console.error).toHaveBeenCalledWith(fakeError.message);
    });
  });
  
  describe('asyncUnsetAuthUser thunk', () => {
    it('accessToken in local storage should be an empty string when user logout', () => {
      // Arrange
      localStorage.setItem('accessToken', fakeAccessToken);
      const dispatch = vi.fn();
  
      // Act
      asyncUnsetAuthUser()(dispatch);
  
      // Assert
      expect(localStorage.getItem('accessToken')).toBe('');
    });
  
    it('should dispatch action correctly when user logout', () => {
      // Arrange
      const dispatch = vi.fn();
  
      // Act
      asyncUnsetAuthUser()(dispatch);
  
      // Assert
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
      expect(dispatch).toHaveBeenNthCalledWith(2, unsetAuthUserActionCreator());
      expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
    });
  });
