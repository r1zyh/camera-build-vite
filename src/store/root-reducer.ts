import { productsProcessSlice } from './product-process/product-process';
import { combineReducers } from '@reduxjs/toolkit';
import { reviewProcessSlice } from './review-process/review-process';

export const rootReducer = combineReducers({
  [productsProcessSlice.name]: productsProcessSlice.reducer,
  [reviewProcessSlice.name]: reviewProcessSlice.reducer,
});
