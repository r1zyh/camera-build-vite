import { describe, expect } from 'vitest';
import Loader from './loader';
import { render, screen } from '@testing-library/react';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    render(<Loader />);
    const loadingScreen = screen.getByTestId('loading-screen');

    expect(loadingScreen).toBeInTheDocument();
  });
});
