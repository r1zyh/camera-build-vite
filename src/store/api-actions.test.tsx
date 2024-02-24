import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';

import { State } from '../types/state';
import {
  fetchProducts,
  fetchReviews,
  fetchProduct,
  fetchPromo,
  fetchSimilarProducts,
  postReview,
} from './api-actions';
import { APIRoute, AppRoute } from '../const';

import { redirectToRoute } from './actions';
import {
  AppThunkDispatch,
  makeFakeProduct,
  makeFakePromo,
} from './mock-components/mocks';
import { extractActionsTypes } from './mock-components/mock-components';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      PRODUCTS: { products: [] },
      REVIEWS: { reviews: [] },
    });
  });

  describe('fetchProducts', () => {
    it('should dispatch correct actions', async () => {
      const mockProducts = [makeFakeProduct(), makeFakeProduct()];
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockProducts);

      await store.dispatch(fetchProducts());

      const emittedActions = store.getActions();

      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setProductsLoadingStatus',
        payload: true,
      });
      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setProducts',
        payload: mockProducts,
      });
      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setProductsLoadingStatus',
        payload: false,
      });
    });
  });

  describe('fetchSimilarProducts', () => {
    it('should dispatch correct actions', async () => {
      const mockId = '123';
      const mockProducts = [makeFakeProduct(), makeFakeProduct()];
      const mockResponseData = mockProducts.map((product) => ({
        ...product,
        previewImg: `/${product.previewImg}`,
        previewImg2x: `/${product.previewImg2x}`,
        previewImgWebp: `/${product.previewImgWebp}`,
        previewImgWebp2x: `/${product.previewImgWebp2x}`,
      }));
      mockAxiosAdapter
        .onGet(`${APIRoute.Products}/${mockId}/similar`)
        .reply(200, mockProducts);

      await store.dispatch(fetchSimilarProducts({ id: mockId }));

      const emittedActions = store.getActions();

      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setProductsLoadingStatus',
        payload: true,
      });
      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setProductsLoadingStatus',
        payload: false,
      });
      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setSimilarProducts',
        payload: mockResponseData,
      });
    });
  });

  describe('fetchPromo', () => {
    it('should dispatch correct actions on successful fetch', async () => {
      const mockPromos = [makeFakePromo(), makeFakePromo()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromo());

      const emittedActions = store.getActions();
      expect(emittedActions).toContainEqual({
        type: 'PRODUCTS/setPromos',
        payload: mockPromos,
      });
    });

    it('should dispatch correct actions on error fetch', async () => {
      const mockPromos = [makeFakePromo(), makeFakePromo()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(500, mockPromos);

      await store.dispatch(fetchPromo());

      const emittedActions = store.getActions();
      expect(emittedActions).toContainEqual(redirectToRoute(AppRoute.Error));
    });
  });
});
