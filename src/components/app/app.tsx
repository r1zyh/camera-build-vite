import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import Main from '../../pages/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from '../../pages/product/product';
import NotFoundPage from '../../pages/not-found/not-found';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Main />}></Route>
          <Route path={AppRoute.Basket} element={<Basket />} />
          <Route path={AppRoute.Product} element={<Product />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
