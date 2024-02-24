import { render, screen, waitFor } from '@testing-library/react';
import { makeFakeProduct } from '../../store/mock-components/mocks';
import ProductCard from './product-card';
import { withHistory } from '../../store/mock-components/mock-components';
import userEvent from '@testing-library/user-event';

describe('Product Card component', () => {
  const fakeProduct = makeFakeProduct();

  it('should render correctly', () => {
    render(withHistory(<ProductCard product={fakeProduct} />));

    const productCardDiv = screen.getByTestId('product-card-div');
    expect(productCardDiv.id).toBe(String(fakeProduct.id));

    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    const priceElement = screen.getByTestId('price');
    expect(priceElement.textContent).toMatch(`Цена:${fakeProduct.price} ₽`);

    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });

  it('should open modal when clicked Купить', async () => {
    render(withHistory(<ProductCard product={fakeProduct} />));

    expect(screen.queryByTestId('modal')).toBeNull();

    const buyButton = screen.getByText('Купить');
    userEvent.click(buyButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('isActive class is set when isActive is true', () => {
    const { container } = render(
      withHistory(<ProductCard product={fakeProduct} isActive />)
    );

    const productCardElement = container.firstChild;

    expect(productCardElement).toHaveClass('product-card');
    expect(productCardElement).toHaveClass('is-active');
  });

  it('isActive class is not set when isActive is false ', () => {
    const { container } = render(
      withHistory(<ProductCard product={fakeProduct} isActive={false} />)
    );

    const productCardElement = container.firstChild;

    expect(productCardElement).toHaveClass('product-card');
    expect(productCardElement).not.toHaveClass('is-active');
  });
});
