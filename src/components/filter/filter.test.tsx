import { render, screen } from '@testing-library/react';
import Filter from './filter';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../store/mock-components/mock-components';
import { makeFakeStore } from '../../store/mock-components/mocks';
import { AppRoute } from '../../const';

describe('Filter component', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(
      <Filter />,
      mockHistory
    );
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();

    expect(screen.getByTestId('от')).toBeInTheDocument();
    expect(screen.getByTestId('до')).toBeInTheDocument();

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
