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
  makeFakeReview,
} from './mock-components/mocks';
import { extractActionsTypes } from './mock-components/mock-components';
import {
  setProductsLoadingStatus,
  setProducts,
  setSimilarProducts,
  setProduct,
  setActiveId,
  setPromos,
  setCurrentProducts,
} from './product-process/product-process';
import { setReviewPostStatus, setReviews, updateReviews } from './review-process/review-process';

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
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductsActionFulfilled = emittedActions.at(2) as ReturnType<
        typeof fetchProducts.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchProducts.pending.type,
        setProductsLoadingStatus.type,
        setProducts.type,
        setCurrentProducts.type,
        setProductsLoadingStatus.type,
        fetchProducts.fulfilled.type,
      ]);

      expect(fetchProductsActionFulfilled.payload).toEqual(mockProducts);
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

      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(
        2
      ) as ReturnType<typeof fetchSimilarProducts.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProducts.pending.type,
        setProductsLoadingStatus.type,
        setSimilarProducts.type,
        setProductsLoadingStatus.type,
        fetchSimilarProducts.fulfilled.type,
      ]);
      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(
        mockResponseData
      );
    });
  });

  describe('fetchPromo', () => {
    it('should dispatch correct actions on successful fetch', async () => {
      const mockPromos = [makeFakePromo(), makeFakePromo()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromo());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromosActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromo.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromo.pending.type,
        setPromos.type,
        fetchPromo.fulfilled.type,
      ]);

      expect(fetchPromosActionFulfilled.payload).toEqual(mockPromos);
    });

    it('should dispatch correct actions on fetch error', async () => {
      const mockPromos = [makeFakePromo(), makeFakePromo()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(500, mockPromos);

      await store.dispatch(fetchPromo());

      const emittedActions = store.getActions();
      expect(emittedActions).toContainEqual(redirectToRoute(AppRoute.Error));
    });
  });

  describe('fetchReviews', () => {
    it('should dispatch correct actions', async () => {
      const mockId = '123';
      const mockReviews = [makeFakeReview(), makeFakeReview()];
      mockAxiosAdapter
        .onGet(`${APIRoute.Products}/${mockId}/reviews`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviews({ id: mockId }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviews.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        setReviews.type,
        fetchReviews.fulfilled.type,
      ]);
      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });
  });

  describe('fetchProduct', () => {
    it('should dispatch correct actions', async () => {
      const mockId = '123';
      const mockProduct = makeFakeProduct();
      const newData = {
        ...mockProduct,
        previewImg: `/${mockProduct.previewImg}`,
        previewImg2x: `/${mockProduct.previewImg2x}`,
        previewImgWebp: `/${mockProduct.previewImgWebp}`,
        previewImgWebp2x: `/${mockProduct.previewImgWebp2x}`,
      };

      mockAxiosAdapter
        .onGet(`${APIRoute.Products}/${mockId}`)
        .reply(200, mockProduct);

      await store.dispatch(fetchProduct({ id: mockId }));

      const emittedActions = store.getActions();

      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(
        2
      ) as ReturnType<typeof fetchSimilarProducts.fulfilled>;
      setProduct(newData);

      expect(extractedActionsTypes).toEqual([
        fetchProduct.pending.type,
        setProductsLoadingStatus.type,
        setProduct.type,
        fetchReviews.pending.type,
        fetchSimilarProducts.pending.type,
        setProductsLoadingStatus.type,
        setActiveId.type,
        setProductsLoadingStatus.type,
        setReviews.type,
        setSimilarProducts.type,
        setProductsLoadingStatus.type,
        fetchProduct.fulfilled.type,
      ]);
      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(newData);
    });

    it('should dispatch correct actions on fetch error', async () => {
      const mockId = '123';
      const mockProduct = makeFakeProduct();
      mockAxiosAdapter
        .onGet(`${APIRoute.Products}/${mockId}`)
        .reply(500, mockProduct);

      await store.dispatch(fetchProduct({ id: mockId }));

      const emittedActions = store.getActions();
      expect(emittedActions).toContainEqual(store.dispatch(redirectToRoute(AppRoute.Error)));
    });
  });

  describe('postReview', () => {
    it('should dispatch correct actions', async () => {

      const mockReviewData = {
        review: 'Test review',
        rating: 5,
        cameraId: 123,
        userName: 'Test User',
        advantage: 'Advantage',
        disadvantage: 'Disadvantage',
        resetForm: vi.fn(),
      };

      mockAxiosAdapter
        .onPost(`${APIRoute.Reviews}`)
        .reply(200, mockReviewData);

      await store.dispatch(postReview(mockReviewData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPostReviewsActionFulfilled = emittedActions.at(2) as ReturnType<
        typeof postReview.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        setReviewPostStatus.type,
        updateReviews.type,
        setReviewPostStatus.type,
        postReview.fulfilled.type,
      ]);
      expect(fetchPostReviewsActionFulfilled.payload).toEqual(expect.objectContaining({
        review: mockReviewData.review,
        rating: mockReviewData.rating,
        cameraId: mockReviewData.cameraId,
        userName: mockReviewData.userName,
        advantage: mockReviewData.advantage,
        disadvantage: mockReviewData.disadvantage
      }));
    });
  });
});
