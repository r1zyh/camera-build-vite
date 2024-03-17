import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../hooks/use-select';
import { getProducts } from '../../store/product-process/selectors';

function HeaderLayout(): JSX.Element {
  const products = useAppSelector(getProducts);

  const [searchQuery, setSearchQuery] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpened(true);
  };

  const handlerFormReset = () => {
    setIsOpened(false);
    setSearchQuery('');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectItem = (selectedItem) => {
    // Здесь можете добавить перенаправление на страницу товара
    console.log('Выбран товар:', selectedItem);
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <a
          className="header__logo"
          href="index.html"
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </a>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className="main-nav__link"
                to={AppRoute.Main}
                data-testid="header-catalog-link"
              >
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${isOpened ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </label>
            {searchQuery.length >= 3 && (
              <ul
                className={`form-search__select-list ${
                  isOpened ? 'scroller' : ''
                }`}
              >
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="form-search__select-item"
                    tabIndex={0}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
          {searchQuery.length >= 3 && (
            <button
              className="form-search__reset"
              type="reset"
              onClick={handlerFormReset}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
              <span className="visually-hidden">Сбросить поиск</span>
            </button>
          )}
        </div>
        <Link
          className="header__basket-link"
          to={AppRoute.Basket}
          data-testid="basket-link"
        >
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="header__basket-count">3</span>
        </Link>
      </div>
    </header>
  );
}

export default HeaderLayout;
