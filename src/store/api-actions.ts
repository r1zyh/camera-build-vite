import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct, TProducts } from '../types/products';
import { APIRoute, AppRoute } from '../const';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  setActiveId,
  setCurrentProducts,
  setProduct,
  setProducts,
  setProductsLoadingStatus,
  setPromos,
  setSimilarProducts,
} from './product-process/product-process';
import { TAddReview, TReview, TReviews } from '../types/review';
import {
  setReviewPostStatus,
  setReviews,
  updateReviews,
} from './review-process/review-process';
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
    dispatch(setProductsLoadingStatus(true));
    try {
      const { data } = await api.get<TProducts>(APIRoute.Products);
      dispatch(setProducts(data));
      dispatch(setCurrentProducts(data));
      dispatch(setProductsLoadingStatus(false));
    } catch (error) {
      dispatch(setProductsLoadingStatus(false));
      toast.error('Failed to fetch Products!');
    }
  }
);
export const fetchReviews = createAsyncThunk<
  void,
  { id: string | undefined },
  thunkObjType
>('data/fetchReviews', async ({ id }, { dispatch, extra: api }) => {
  try {
    const url = id !== undefined ? `${APIRoute.Products}/${id}/reviews` : '';
    const { data } = await api.get<TReviews>(url);
    dispatch(setReviews(data));
  } catch {
    toast.error('Failed to fetch Reviews!');
  }
});

export const fetchSimilarProducts = createAsyncThunk<
  void,
  { id: string | undefined },
  thunkObjType
>('data/fetchSimilarProducts', async ({ id }, { dispatch, extra: api }) => {
  dispatch(setProductsLoadingStatus(true));
  try {
    const url = id !== undefined ? `${APIRoute.Products}/${id}/similar` : '';
    const { data } = await api.get<TProducts>(url);
    const newData: TProducts = data.map((item) => ({
      ...item,
      previewImg: `/${item.previewImg}`,
      previewImg2x: `/${item.previewImg2x}`,
      previewImgWebp: `/${item.previewImgWebp}`,
      previewImgWebp2x: `/${item.previewImgWebp2x}`,
    }));
    dispatch(setSimilarProducts(newData));
    dispatch(setProductsLoadingStatus(false));
  } catch {
    dispatch(setProductsLoadingStatus(false));
    toast.error('Failed to fetch Similar Products!');
  }
});

export const fetchProduct = createAsyncThunk<
  void,
  { id: string | undefined },
  thunkObjType
>('data/fetchProduct', async ({ id }, { dispatch, extra: api }) => {
  dispatch(setProductsLoadingStatus(true));
  const url = id !== undefined ? `${APIRoute.Products}/${id}` : '';
  try {
    const { data } = await api.get<TProduct>(url);
    const newData = {
      ...data,
      previewImg: `/${data.previewImg}`,
      previewImg2x: `/${data.previewImg2x}`,
      previewImgWebp: `/${data.previewImgWebp}`,
      previewImgWebp2x: `/${data.previewImgWebp2x}`,
    };
    dispatch(setProduct(newData));
    dispatch(fetchReviews({ id }));
    dispatch(fetchSimilarProducts({ id }));
    dispatch(setActiveId(id));
    dispatch(setProductsLoadingStatus(false));
  } catch {
    dispatch(setProductsLoadingStatus(false));
    toast.error('Failed to fetch Product!');
  }
});

export const fetchPromo = createAsyncThunk<void, undefined, thunkObjType>(
  'data/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TPromos>(APIRoute.Promo);
      dispatch(setPromos(data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.Error));
      toast.error('Failed to fetch Promos!');
    }
  }
);

export const postReview = createAsyncThunk<
  void,
  TAddReview & { resetForm: () => void },
  thunkObjType
    >(
    'user/review',
    async (
      { review, rating, cameraId, userName, advantage, disadvantage, resetForm },
      { dispatch, extra: api }
    ) => {
      dispatch(setReviewPostStatus(true));
      localStorage.setItem('review', review);
      localStorage.setItem('rating', String(rating));
      localStorage.setItem('userName', userName);
      localStorage.setItem('cameraId', String(cameraId));
      localStorage.setItem('advantage', advantage);
      localStorage.setItem('disadvantage', disadvantage);
      try {
        const url = `${APIRoute.Reviews}`;
        const { data } = await api.post<TReview>(url, {
          review,
          rating,
          cameraId,
          userName,
          advantage,
          disadvantage,
        });
        dispatch(updateReviews(data));
        dispatch(setReviewPostStatus(false));
        resetForm();
      } catch {
        dispatch(setReviewPostStatus(false));
        toast.error('Failed to post Review!');
      }
    }
    );
