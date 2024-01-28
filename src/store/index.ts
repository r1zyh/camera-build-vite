import { createAPI } from './../services/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const api = createAPI();

console.log('API', api);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(),
});
