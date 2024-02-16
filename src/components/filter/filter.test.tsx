import { render, screen } from '@testing-library/react';
import Filter from './filter';

describe('Filter component', () => {
  it('should render correctly', () => {
    render(<Filter />);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('от')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('до')).toBeInTheDocument();

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Видеокамера')).toBeInTheDocument();

    expect(screen.getByText('Цифровая')).toBeInTheDocument();
    expect(screen.getByText('Плёночная')).toBeInTheDocument();
    expect(screen.getByText('Моментальная')).toBeInTheDocument();
    expect(screen.getByText('Коллекционная')).toBeInTheDocument();

    expect(screen.getByText('Нулевой')).toBeInTheDocument();
    expect(screen.getByText('Любительский')).toBeInTheDocument();
    expect(screen.getByText('Профессиональный')).toBeInTheDocument();

    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });
});
