import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import Main from '../../pages/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from '../../pages/product/product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />}></Route>
        <Route path={AppRoute.Basket} element={<Basket />} />
        <Route path={AppRoute.Product} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
