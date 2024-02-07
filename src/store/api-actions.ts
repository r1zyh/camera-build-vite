import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct, TProducts } from '../types/products';
import { APIRoute, AppRoute } from '../const';
import {
  setActiveId,
  setProduct,
  setProducts,
  setProductsLoadingStatus,
  setPromos,
  setSimilarProducts,
} from './product-process/product-process';
import { TReviews } from '../types/review';
import { setReviews } from './review-process/review-process';
import { redirectToRoute } from './actions';
import { TPromos } from '../types/promo';

type thunkObjType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchProducts = createAsyncThunk<void, undefined, thunkObjType>(
  'data/fetchProducts',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setProductsLoadingStatus(true));
      const { data } = await api.get<TProducts>(APIRoute.Products);
      dispatch(setProducts(data));
    } catch (error) {
      dispatch(setProductsLoadingStatus(false));
    }
  }
);
export const fetchReviews = createAsyncThunk<
  void,
  { id: string | undefined },
  thunkObjType
>('data/fetchReviews', async ({ id }, { dispatch, extra: api }) => {
  const url = id !== undefined ? `${APIRoute.Products}/${id}/reviews` : '';
  const { data } = await api.get<TReviews>(url);
  dispatch(setReviews(data));
});

export const fetchSimilarProducts = createAsyncThunk<
  void,
  { id: number | undefined },
  thunkObjType
>('data/fetchSimilarProducts', async ({ id }, { dispatch, extra: api }) => {
  dispatch(setProductsLoadingStatus(true));
  const url = id !== undefined ? `${APIRoute.Products}/${id}/similar` : '';
  const { data } = await api.get<TProducts>(url);
  dispatch(setProductsLoadingStatus(false));
  dispatch(setSimilarProducts(data));
});

export const fetchProduct = createAsyncThunk<
  void,
  { id: number | undefined },
  thunkObjType
>('data/fetchProduct', async ({ id }, { dispatch, extra: api }) => {
  dispatch(setProductsLoadingStatus(true));
  const url = id !== undefined ? `${APIRoute.Products}/${id}` : '';
  try {
    const { data } = await api.get<TProduct>(url);
    dispatch(setProduct(data));
    dispatch(fetchReviews({ id: id !== undefined ? String(id) : undefined }));
    dispatch(fetchSimilarProducts({ id }));
    dispatch(setActiveId(id));
    dispatch(setProductsLoadingStatus(false));
  } catch {
    dispatch(setProductsLoadingStatus(false));
    dispatch(redirectToRoute(AppRoute.NotFound));
  }
});

export const fetchPromo = createAsyncThunk<void, undefined, thunkObjType>(
  'data/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TPromos>(APIRoute.Promo);
      dispatch(setPromos(data));
    } catch (error) {
      console.error(error);
    }
  }
);
