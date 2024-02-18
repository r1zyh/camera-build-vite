import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../const';
import HeaderLayout from './header';
import { withHistory } from '../../store/mock-components/mock-components';

describe('HeaderLayout component', () => {
  it('should render correctly', () => {
    render(withHistory(<HeaderLayout />));

    expect(screen.getByLabelText('Переход на главную')).toBeInTheDocument();

    expect(screen.getByText('Каталог')).toHaveAttribute('href', AppRoute.Main);

    const guaranteesLink = screen.getByText('Гарантии');
    const deliveryLink = screen.getByText('Доставка');
    const aboutLink = screen.getByText('О компании');
    const resetButton = screen.getByText('Сбросить поиск');

    expect(resetButton).toBeInTheDocument();
    expect(guaranteesLink).toBeInTheDocument();
    expect(guaranteesLink).toHaveAttribute('href', '#');

    expect(deliveryLink).toBeInTheDocument();
    expect(deliveryLink).toHaveAttribute('href', '#');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '#');

    expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();

    expect(screen.getByTestId('basket-link')).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
