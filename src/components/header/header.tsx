import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ChangeEvent, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/use-select';
import { getProducts } from '../../store/product-process/selectors';
import { handleTabKeyDown } from '../../util';

function HeaderLayout(): JSX.Element {
  const minQueryLength = 3;
  const minQueryCloseLength = 1;
  const products = useAppSelector(getProducts);
  const firstFocusableElementRef = useRef<HTMLInputElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLButtonElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

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

  const handleSelectItem = (productId: number) => {
    navigate(`${AppRoute.Product}/${productId}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    productId: number,
    index: number
  ) => {
    if (e.key === 'Enter') {
      handleSelectItem(productId);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex !== null
          ? Math.min(prevIndex + 1, filteredProducts.length - 1)
          : 0
      );
      const nextIndex = Math.min(index + 1, filteredProducts.length - 1);
      const nextElement = document.querySelector(
        `.form-search__select-item:nth-child(${nextIndex + 1})`
      ) as HTMLLIElement;
      if (nextElement) {
        nextElement.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex !== null ? Math.max(prevIndex - 1, 0) : 0
      );
      const prevIndex = Math.max(index - 1, 0);
      const prevElement = document.querySelector(
        `.form-search__select-item:nth-child(${prevIndex + 1})`
      ) as HTMLLIElement;
      if (prevElement) {
        prevElement.focus();
      }
    }
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
                ref={firstFocusableElementRef}
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  handleTabKeyDown(
                    e,
                    firstFocusableElementRef,
                    lastFocusableElementRef
                  )}
              />
            </label>
            {searchQuery.length >= minQueryLength && (
              <ul
                className={`form-search__select-list ${
                  isOpened ? 'scroller' : ''
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <li
                    key={product.id}
                    className={`form-search__select-item ${
                      selectedIndex === index ? 'selected' : ''
                    }`}
                    tabIndex={0}
                    onClick={() => handleSelectItem(product.id)}
                    onKeyDown={(e) => handleKeyDown(e, product.id, index)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
          {searchQuery.length >= minQueryCloseLength && (
            <button
              ref={lastFocusableElementRef}
              className="form-search__reset"
              type="reset"
              onClick={handlerFormReset}
              onKeyDown={(e) =>
                handleTabKeyDown(
                  e,
                  firstFocusableElementRef,
                  lastFocusableElementRef
                )}
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
