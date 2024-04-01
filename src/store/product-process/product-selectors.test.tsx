import { NameSpace } from '../../const';
import { makeFakeProduct, makeFakePromo } from '../mock-components/mocks';
import {
  getProducts,
  getProduct,
  getSimilarProducts,
  getActiveId,
  getProductsLoadingStatus,
  getPromos,
} from './selectors';

describe('Product selectors', () => {
  const fakeProduct = makeFakeProduct();
  const fakePromo = makeFakePromo();
  const state = {
    [NameSpace.Products]: {
      products: [fakeProduct],
      currentVisibleProducts: [fakeProduct],
      product: fakeProduct,
      similarProducts: [fakeProduct],
      activeId: '1',
      currentSortType: null,
      currentSortOrder: null,
      isProductLoading: false,
      filterStatus: false,
      promos: [fakePromo],
      filterCategory: null,
      filterTypes: [],
      filterLevels: [],
    },
  };

  test('getProducts selector', () => {
    const selectedProducts = getProducts(state);
    expect(selectedProducts).toEqual([fakeProduct]);
  });

  test('getProduct selector', () => {
    const selectedProduct = getProduct(state);
    expect(selectedProduct).toEqual(fakeProduct);
  });

  test('getSimilarProducts selector', () => {
    const selectedSimilarProducts = getSimilarProducts(state);
    expect(selectedSimilarProducts).toEqual([fakeProduct]);
  });

  test('getActiveId selector', () => {
    const activeId = getActiveId(state);
    expect(activeId).toBe('1');
  });

  test('getProductsLoadingStatus selector', () => {
    const loadingStatus = getProductsLoadingStatus(state);
    expect(loadingStatus).toBe(false);
  });

  test('getPromos selector', () => {
    const promos = getPromos(state);
    expect(promos).toEqual([fakePromo]);
  });
});
