import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import { Main } from '../../pages/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from '../../pages/product/product';
import NotFoundPage from '../../pages/not-found/not-found';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { useEffect } from 'react';
import { fetchProducts, fetchPromo } from '../../store/api-actions';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPromo());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Main />}></Route>
          <Route path={AppRoute.Basket} element={<Basket />} />
          <Route path={`${AppRoute.Product}/:id`} element={<Product />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
