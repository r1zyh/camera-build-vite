import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TProduct, TProducts } from '../../types/products';
import { TPromos } from '../../types/promo';

type ProductProcessType = {
  products: TProducts;
  product: TProduct | null;
  activeId: number | undefined;
  promos: TPromos;
  isProductLoading: boolean;
  similarProducts: TProducts | null;
};

const initialState: ProductProcessType = {
  products: [],
  similarProducts: [],
  activeId: 0,
  promos: [],
  isProductLoading: true,
  product: null,

};

export const productsProcessSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProducts>) => {
      state.products = action.payload;
    },
    setActiveId: (state, action: PayloadAction<number | undefined>) => {
      state.activeId = action.payload;
    },
    setProduct: (state, action: PayloadAction<TProduct | null>) => {
      state.product = action.payload;
    },
    setSimilarProducts: (state, action: PayloadAction<TProducts | null>) => {
      state.similarProducts = action.payload;
    },
    setProductsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isProductLoading = action.payload;
    },
    setPromos: (state, action: PayloadAction<TPromos>) => {
      state.promos = action.payload;
    },
  },
});

export const {
  setProducts,
  setProduct,
  setPromos,
  setActiveId,
  setSimilarProducts,
  setProductsLoadingStatus,
} = productsProcessSlice.actions;
