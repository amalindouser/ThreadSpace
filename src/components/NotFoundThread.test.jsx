/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */


/**
 * Test scenarios for the NotFoundThread component
 *
 * - NotFoundThread component
 *   - should redirect to the homepage when the link is clicked
 */


import React from 'react';
import {
  render, screen, fireEvent, waitFor
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; // Importing jest-dom for custom matchers
import NotFoundThread from './NotFoundThread';

describe('NotFoundThread component', () => {
  it('should redirect to the homepage when the link is clicked', async () => {
    // Render NotFoundThread component within MemoryRouter to enable routing
    render(
      <MemoryRouter>
        <NotFoundThread />
      </MemoryRouter>
    );

    // Click the "home page" link
    const homeLink = screen.getByText('home page');
    fireEvent.click(homeLink);

    // Assert: Use waitFor to wait for the navigation change
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});
