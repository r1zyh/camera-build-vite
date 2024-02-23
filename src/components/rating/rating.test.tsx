import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Rating component', () => {
  it('it should render rating elem correctly', () => {
    render(<Rating rating={3.4} reviewCount={17} className="test-class" />);
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByTestId('hidden-rate')).toBeInTheDocument();
    expect(screen.getByTestId('hidden-rate')).toHaveTextContent('3');
  });
});
