import { TProducts } from './../../types/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CameraTypes, CategoryTypes, LevelTypes, NameSpace } from '../../const';
import { TProduct } from '../../types/products';
import { TPromos } from '../../types/promo';

type ProductProcessType = {
  products: TProducts;
  currentVisibleProducts: TProducts;
  product: TProduct | null;
  activeId: string | undefined;
  currentSortType: string | null;
  currentSortOrder: string | null;
  promos: TPromos;
  isProductLoading: boolean;
  similarProducts: TProducts | null;
  filterStatus: boolean;
  filterCategory: CategoryTypes | null;
  filterTypes: CameraTypes[];
  filterLevels: LevelTypes[];
  prices: number[];
  minPrice: number | null;
  maxPrice: number | null;
  test: TProducts;
  testStatus: boolean;
};

const initialState: ProductProcessType = {
  products: [],
  currentVisibleProducts: [],
  similarProducts: [],
  activeId: '',
  currentSortType: null,
  currentSortOrder: null,
  promos: [],
  isProductLoading: false,
  product: null,
  filterStatus: false,
  filterCategory: null,
  filterTypes: [],
  filterLevels: [],
  prices: [],
  minPrice: null,
  maxPrice: null,
  test: [],
  testStatus: false,
};

export const productsProcessSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProducts>) => {
      state.products = action.payload;
    },
    setActiveId: (state, action: PayloadAction<string | undefined>) => {
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
    setSortType: (state, action: PayloadAction<string>) => {
      state.currentSortType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string | null>) => {
      state.currentSortOrder = action.payload;
    },
    setCurrentProducts: (state, action: PayloadAction<TProducts>) => {
      state.currentVisibleProducts = action.payload;
    },
    setFiltersStatus: (state, action: PayloadAction<boolean>) => {
      state.filterStatus = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<CategoryTypes | null>) => {
      state.filterCategory = action.payload;
    },
    setFilterTypes: (state, action: PayloadAction<CameraTypes[]>) => {
      state.filterTypes = action.payload;
    },
    setFilterLevels: (state, action: PayloadAction<LevelTypes[]>) => {
      state.filterLevels = action.payload;
    },
    setPrices: (state) => {
      const prices = state.products.map((product) => product.price);
      state.prices = prices;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setTest: (state, action: PayloadAction<TProducts>) => {
      state.test = action.payload;
    },
    setTestStatus: (state, action: PayloadAction<boolean>) => {
      state.testStatus = action.payload;
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
  setSortType,
  setSortOrder,
  setFiltersStatus,
  setCurrentProducts,
  setFilterCategory,
  setFilterLevels,
  setFilterTypes,
  setMaxPrice,
  setMinPrice,
  setPrices,
  setTest,
  setTestStatus,
} = productsProcessSlice.actions;
