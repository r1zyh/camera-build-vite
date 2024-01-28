import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProducts } from '../types/products';
import { APIRoute } from '../const';
import { setProducts } from './product-process/product-process';

type thunkObjType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchProducts = createAsyncThunk<void, undefined, thunkObjType>(
  'data/fetchProducts',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TProducts>(APIRoute.Products);
      console.log('This Data', data);
      dispatch(setProducts(data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
);
