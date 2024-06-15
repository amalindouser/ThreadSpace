import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importing jest-dom for custom matchers
import CustomLoading from './Loading'; // Ganti dengan path yang sesuai

describe('CustomLoading component', () => {
  it('renders LoadingBar with correct style', () => {
    render(<CustomLoading />);

    // Assert
    const loadingBar = screen.getByRole('progressbar');
    expect(loadingBar).toBeInTheDocument();
    expect(loadingBar).toHaveStyle({ backgroundColor: '#1D566E' });
  });

  it('renders Box component with correct positioning', () => {
    render(<CustomLoading />);

    // Assert
    const boxComponent = screen.getByTestId('custom-loading-box');
    expect(boxComponent).toBeInTheDocument();
    expect(boxComponent).toHaveStyle({
      position: 'sticky',
      top: '0px',
      zIndex: '9999',
    });
  });
});
