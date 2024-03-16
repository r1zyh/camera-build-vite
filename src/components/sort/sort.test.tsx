import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { makeFakeProduct } from '../../store/mock-components/mocks';

describe('Sort component', () => {
  const fakeProduct = [makeFakeProduct()];
  it('should render correctly', () => {
    render(<Sort products={fakeProduct} />);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    const sortPriceRadio = screen.getByLabelText('по цене');
    const sortPopularRadio = screen.getByLabelText('по популярности');

    expect(sortPriceRadio).toBeInTheDocument();
    expect(sortPopularRadio).toBeInTheDocument();

    expect(sortPriceRadio).toBeChecked();

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
