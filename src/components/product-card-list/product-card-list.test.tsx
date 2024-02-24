import { withHistory } from '../../store/mock-components/mock-components';
import { makeFakeProduct } from '../../store/mock-components/mocks';
import { render, screen } from '@testing-library/react';
import ProductCardList from './product-card-list';

describe('Product Card List component', () => {
  const fakeProducts = [makeFakeProduct()];
  it('renders product cards correctly', () => {
    render(withHistory(<ProductCardList products={fakeProducts} />));

    fakeProducts.forEach((product) => {
      const priceElement = screen.getByTestId('price');
      const productName = screen.getByText(product.name);
      expect(productName).toBeInTheDocument();
      expect(priceElement.textContent).toMatch(`Цена:${product.price} ₽`);
    });
  });

  it('', () => {
    render(withHistory(<ProductCardList products={fakeProducts} />));
    const productCards = screen.getAllByTestId('product-card-div');
    const keys = productCards.map((card) => card.getAttribute('data-key'));
    const uniqueKeys = new Set(keys);

    expect(keys.length).toBe(fakeProducts.length);
    expect(uniqueKeys.size).toBe(fakeProducts.length);
  });
});
