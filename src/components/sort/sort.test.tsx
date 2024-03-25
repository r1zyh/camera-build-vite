import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { makeFakeProduct } from '../../store/mock-components/mocks';
import {
  withHistory,
  withStore,
} from '../../store/mock-components/mock-components';
import { createMemoryHistory } from 'history';
import { makeFakeStore } from '../../store/mock-components/mocks';
import { AppRoute } from '../../const';

describe('Sort component', () => {
  const fakeProduct = [makeFakeProduct()];
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(
      <Sort products={fakeProduct} />,
      mockHistory
    );
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    const sortPriceRadio = screen.getByLabelText('по цене');
    const sortPopularRadio = screen.getByLabelText('по популярности');

    expect(sortPriceRadio).toBeInTheDocument();
    expect(sortPopularRadio).toBeInTheDocument();

    const sortUpButton = screen.getByLabelText('По возрастанию');
    const sortDownButton = screen.getByLabelText('По убыванию');

    expect(sortUpButton).toBeInTheDocument();
    expect(sortDownButton).toBeInTheDocument();

    const sortUpIcon = screen.getByTestId('up');
    const sortDownIcon = screen.getByTestId('down');

    expect(sortUpIcon).toBeInTheDocument();
    expect(sortDownIcon).toBeInTheDocument();
  });
});
