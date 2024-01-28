import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TProduct, TProducts } from '../../types/products';

type ProductProcessType = {
  products: TProducts;
  product: TProduct | null;
};

const initialState: ProductProcessType = {
  products: [],
  product: null,
};
console.log('INITSTATE', initialState);

export const productsProcessSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProducts>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<TProduct | null>) => {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productsProcessSlice.actions;
