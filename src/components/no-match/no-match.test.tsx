import NoMatch from './no-match';
import { screen, render } from '@testing-library/react';

describe('Component: No match', () => {
  it('should render correct', () => {
    render(<NoMatch />);
    const noMatchText = screen.getByText(
      'По вашему запросу ничего не найдено. :('
    );

    expect(noMatchText).toBeInTheDocument();
  });
});
