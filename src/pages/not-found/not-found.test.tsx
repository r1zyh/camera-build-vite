import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found';
import { withHistory } from '../../store/mock-components/mock-components';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404 Not Found';
    const expectedLinkText = 'Return to the';

    render(withHistory(<NotFoundPage />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
