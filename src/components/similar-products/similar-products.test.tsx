import { render, screen, waitFor } from '@testing-library/react';
import { makeFakeProduct } from '../../store/mock-components/mocks';
import SimilarProducts from './similar-products';
import { withHistory } from '../../store/mock-components/mock-components';
import userEvent from '@testing-library/user-event';

describe('SimilarProducts', () => {
  const fakeProducts = [
    makeFakeProduct(),
    makeFakeProduct(),
    makeFakeProduct(),
    makeFakeProduct(),
  ];
  it('renders similar products correctly', () => {
    render(withHistory(<SimilarProducts similarProducts={fakeProducts} />));

    const productCards = screen.getAllByTestId('product-card-div');
    expect(productCards.length).toBe(fakeProducts.length);
  });

  it('disables prev button on first page', () => {
    render(withHistory(<SimilarProducts similarProducts={fakeProducts} />));

    const prevButton = screen.getByLabelText('Предыдущая страница');
    expect(prevButton).toBeDisabled();
  });

  it('enables next button when there are more pages', () => {
    render(withHistory(<SimilarProducts similarProducts={fakeProducts} />));

    const nextButton = screen.getByLabelText('Следующая страница');
    expect(nextButton).toBeEnabled();
  });

  it('renders the next page of products when next button is clicked', async () => {
    render(withHistory(<SimilarProducts similarProducts={fakeProducts} />));

    userEvent.click(screen.getByLabelText('Следующая страница'));
    await waitFor(() => {
      const visibleProducts = screen
        .getAllByTestId('product-card-div')
        .filter((product) => product.classList.contains('is-active'));
      expect(visibleProducts.length).toBeLessThanOrEqual(3);
    });
  });

  it('renders the prev page of products when prev button is clicked', async () => {
    render(withHistory(<SimilarProducts similarProducts={fakeProducts} />));

    userEvent.click(screen.getByLabelText('Следующая страница'));
    userEvent.click(screen.getByLabelText('Предыдущая страница'));
    await waitFor(() => {
      const visibleProducts = screen
        .getAllByTestId('product-card-div')
        .filter((product) => product.classList.contains('is-active'));
      expect(visibleProducts.length).toBeLessThanOrEqual(3);
    });
  });
});
