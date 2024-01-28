import { Helmet } from 'react-helmet-async';
import CardsCatalog from '../../components/cards-catalog/cards-catalog';
import Filter from '../../components/filter/filter';
import FooterLayout from '../../components/footer/footer';
import HeaderLayout from '../../components/header/header';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks/use-select';
import { getProducts } from '../../store/product-process/selectors';

function Main(): JSX.Element {
  const products = useAppSelector(getProducts);
  console.log('MAIN',products);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{'6 cities - Catalog'}</title>
      </Helmet>
      <HeaderLayout />
      <main>
        <div className="banner">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
            />
            <img
              src="img/content/banner-bg.jpg"
              srcSet="img/content/banner-bg@2x.jpg 2x"
              width={1280}
              height={280}
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">
              Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
            </span>
            <span className="banner__text">
              Профессиональная камера от&nbsp;известного производителя
            </span>
            <a className="btn" href="#">
              Подробнее
            </a>
          </p>
        </div>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <Filter />
                <div className="catalog__content">
                  <Sort />
                  <CardsCatalog />
                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--active"
                          href="1"
                        >
                          1
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href="2">
                          2
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href="3">
                          3
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--text"
                          href="2"
                        >
                          Далее
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterLayout />
    </div>
  );
}

export default Main;
