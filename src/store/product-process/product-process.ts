import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TProduct, TProducts } from '../../types/products';

type ProductProcessType = {
  products: TProducts | null;
  product: TProduct | null;
  similarProducts: TProducts | null;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

const initialState: ProductProcessType = {
  products: [],
  similarProducts: [],
  product: null,
  price: 0,
  rating: 0,
  reviewCount: 0,
  previewImg: '',
  previewImg2x: '',
  previewImgWebp: '',
  previewImgWebp2x: '',
};

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
    setSimilarProducts: (state, action: PayloadAction<TProducts | null>) => {
      state.similarProducts = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productsProcessSlice.actions;
