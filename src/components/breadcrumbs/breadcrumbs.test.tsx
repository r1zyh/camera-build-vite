import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';

describe('Breadcrumbs component', () => {
  it('should render correctly', () => {
    render(<Breadcrumbs />);

    const homeLink = screen.getByText('Главная');
    const catalogLink = screen.getByText('Каталог');

    expect(homeLink).toBeInTheDocument();
    expect(catalogLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute('href', 'index.html');
    expect(catalogLink).not.toHaveAttribute('href');

    expect(catalogLink).toHaveClass('breadcrumbs__link--active');

    const arrowIcon = screen.getByTestId('arrow-icon');
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon.tagName).toEqual('svg');

    expect(arrowIcon.getAttribute('width')).toEqual('5');
    expect(arrowIcon.getAttribute('height')).toEqual('8');
  });
});
