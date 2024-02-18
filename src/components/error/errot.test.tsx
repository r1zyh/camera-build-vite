import { render, screen } from '@testing-library/react';
import { withHistory } from '../../store/mock-components/mock-components';
import ErrorComponent from './error';

describe('ErrorComponent', () => {
  it('should render correctly', () => {
    render(withHistory(<ErrorComponent />));
    const expectedHeaderText = 'Error';
    const expectedLinkText = 'Return to the';

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });

});
