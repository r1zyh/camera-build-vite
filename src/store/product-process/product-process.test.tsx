import { makeFakeProduct, makeFakePromo } from '../mock-components/mocks';
import {
  productsProcessSlice,
  setProducts,
  setActiveId,
  setProduct,
  setSimilarProducts,
  setProductsLoadingStatus,
  setPromos,
} from './product-process';

describe('Products Process Slice', () => {
  const initialState = {
    products: [],
    currentVisibleProducts: [],
    similarProducts: null,
    activeId: '',
    promos: [],
    isProductLoading: true,
    product: null,
    currentSortType: null,
    currentSortOrder: null,
    filterStatus: false,
    filterCategory: null,
    filterTypes: [],
    filterLevels: [],
    prices: [],
    minPrice: null,
    maxPrice: null,
    productsByPrice: [],
    prodByPriceStatus: false,
  };

  const fakeProduct = makeFakeProduct();
  const fakePromo = makeFakePromo();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = productsProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set products', () => {
    const newProducts = [fakeProduct];

    const result = productsProcessSlice.reducer(
      initialState,
      setProducts(newProducts)
    );

    expect(result.products).toEqual(newProducts);
  });

  it('should set active product id', () => {
    const newActiveId = '2';

    const result = productsProcessSlice.reducer(
      initialState,
      setActiveId(newActiveId)
    );

    expect(result.activeId).toEqual(newActiveId);
  });

  it('should set product', () => {
    const newProduct = fakeProduct;

    const result = productsProcessSlice.reducer(
      initialState,
      setProduct(newProduct)
    );

    expect(result.product).toEqual(newProduct);
  });

  it('should set similar products', () => {
    const newSimilarProducts = [fakeProduct];

    const result = productsProcessSlice.reducer(
      initialState,
      setSimilarProducts(newSimilarProducts)
    );

    expect(result.similarProducts).toEqual(newSimilarProducts);
  });

  it('should set product loading status', () => {
    const newStatus = false;

    const result = productsProcessSlice.reducer(
      initialState,
      setProductsLoadingStatus(newStatus)
    );

    expect(result.isProductLoading).toEqual(newStatus);
  });

  it('should set promos', () => {
    const newPromos = [fakePromo];

    const result = productsProcessSlice.reducer(
      initialState,
      setPromos(newPromos)
    );

    expect(result.promos).toEqual(newPromos);
  });
});
