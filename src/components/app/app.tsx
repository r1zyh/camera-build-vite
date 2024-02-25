import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import Main from '../../pages/main/main';
import { Route, Routes } from 'react-router-dom';
import Product from '../../pages/product/product';
import NotFoundPage from '../../pages/not-found/not-found';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { useCallback, useEffect } from 'react';
import { fetchProducts, fetchPromo } from '../../store/api-actions';
import ErrorComponent from '../error/error';

function App() {
  const dispatch = useAppDispatch();
  const dispatchFetchProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const dispatchFetchPromo = useCallback(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  useEffect(() => {
    dispatchFetchProducts();
    dispatchFetchPromo();
  }, [dispatchFetchProducts, dispatchFetchPromo]);

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />}></Route>
        <Route path={AppRoute.Basket} element={<Basket />} />
        <Route path={`${AppRoute.Product}/:id`} element={<Product />} />
        <Route path={AppRoute.Error} element={<ErrorComponent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
