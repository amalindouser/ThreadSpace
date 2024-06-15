/* eslint-disable linebreak-style */
/**
 * Test scenarios for LoginInput component
 *
 * - should update the email state correctly when typed into
 * - should update the password state correctly when typed into
 * - should call login function with correct arguments when the sign in button is clicked
 */

import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import '@testing-library/jest-dom';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  let mockLogin;

  beforeEach(() => {
    mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
  });

  afterEach(() => {
    mockLogin.mockClear();
  });

  const typeIntoInput = async (placeholderText, value) => {
    const input = screen.getByPlaceholderText(placeholderText);
    await waitFor(() => {
      fireEvent.change(input, { target: { value } });
    });
    return input;
  };

  it('should update the email state correctly when typed into', async () => {
    const emailInput = await typeIntoInput('Email', 'email@gmail.com');
    expect(emailInput.value).toBe('email@gmail.com');
  });

  it('should update the password state correctly when typed into', async () => {
    const passwordInput = await typeIntoInput('Password', 'inipasswordtest');
    expect(passwordInput.value).toBe('inipasswordtest');
  });

  it('should call login function with correct arguments when the log in button is clicked', async () => {
    await typeIntoInput('Email', 'email@gmail.com');
    await typeIntoInput('Password', 'inipasswordtest');

    const loginButton = screen.getByRole('button', { name: 'Login' });
    await waitFor(() => {
      fireEvent.click(loginButton);
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'email@gmail.com',
      password: 'inipasswordtest',
    });
  });
});
