import { render, screen } from '@testing-library/react';
import {
  withHistory,
  withStore,
} from '../../store/mock-components/mock-components';
import Basket from './basket';
import HeaderLayout from '../../components/header/header';
import { MemoryHistory, createMemoryHistory } from 'history';
import { makeFakeStore } from '../../store/mock-components/mocks';
import { AppRoute } from '../../const';

describe('Basket', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<Basket />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);
  });
  it('should render when navigate to /basket', () => {
    const withHistoryComponent = withHistory(<Basket />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);
  });

  it('should render breadcrumbs correctly', () => {
    const homeBreadcrumb = screen.getByText('Главная');
    expect(homeBreadcrumb).toBeInTheDocument();

    const breadcrumbList = screen.getByTestId('breadcrumbs-list-catalog');
    expect(breadcrumbList).toBeInTheDocument();

    const activeBreadcrumb = screen.getByTestId('breadcrumbs-list-basket');
    expect(activeBreadcrumb).toBeInTheDocument();
  });

  it('should render promo code field correctly', () => {
    expect(screen.getByTestId('basket-promo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите промокод')).toBeInTheDocument();
  });

  it('should render form elements correctly', () => {
    expect(screen.getByTestId('basket-promo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });

  it('should render order summary correctly', () => {
    expect(screen.queryByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.queryByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.queryByText(/К оплате:/i)).toBeInTheDocument();
    const priceElements = screen.queryAllByText(/111 390 ₽/i);
    expect(priceElements).toHaveLength(2);
    expect(screen.queryByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});

describe('BasketHeader', () => {
  it('should render header correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<HeaderLayout />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Basket);
    render(withStoreComponent);
    const catalogLink = screen.getByTestId('header-catalog-link');
    expect(catalogLink).toBeInTheDocument();
  });
});
