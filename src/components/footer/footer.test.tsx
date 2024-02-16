import { render, screen } from '@testing-library/react';
import FooterLayout from './footer';

describe('FooterLayout component', () => {
  it('should render correctly', () => {
    render(<FooterLayout />);

    expect(screen.getByLabelText('Переход на главную')).toBeInTheDocument();

    expect(
      screen.getByText('Интернет-магазин фото- и видеотехники')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Переход на страницу вконтатке')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Переход на страницу pinterest')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Переход на страницу reddit')
    ).toBeInTheDocument();

    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(screen.getByText('Ресурсы')).toBeInTheDocument();
    expect(screen.getByText('Поддержка')).toBeInTheDocument();

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
    expect(screen.getByText('Курсы операторов')).toBeInTheDocument();
    expect(screen.getByText('Блог')).toBeInTheDocument();
    expect(screen.getByText('Сообщество')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Задать вопрос')).toBeInTheDocument();
  });
});
