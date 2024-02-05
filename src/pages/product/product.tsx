import { Helmet } from 'react-helmet-async';
import FooterLayout from '../../components/footer/footer';
import HeaderLayout from '../../components/header/header';
import SimilarProducts from '../../components/similar-products/similar-products';
import ReviewList from '../../components/review-list/review-list';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-select';
import { getReviews } from '../../store/review-process/selectors';
import { getProduct } from '../../store/product-process/selectors';
import { fetchProduct } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import Rating from '../../components/rating/rating';
import { AppRoute } from '../../const';

function Product(): JSX.Element {
  const dispatch = useAppDispatch();
  const productId = Number(useParams().id);
  const reviews = useAppSelector(getReviews);
  const product = useAppSelector(getProduct);

  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId !== undefined) {
          await dispatch(fetchProduct({ id: productId }));
        }
      } catch (error) {
        setFetchError('Ошибка при загрузке продукта');
      }
    };

    fetchData();
  }, [productId, dispatch]);

  if (fetchError) {
    //вынести error в отдельный компонент
    return (
      <div className="error-message">
        <p>{fetchError}</p>
      </div>
    );
  }

  const scrollHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (product === null || reviews === null) {
    return <div></div>;
  }

  const {
    name,
    vendorCode,
    type,
    category,
    description,
    level,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

  return (
    <div className="wrapper">
      <Helmet>
        <title>{'Camera-shop - Product'}</title>
      </Helmet>
      <HeaderLayout />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Main}>
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                    />
                    <img
                      src={previewImg}
                      srcSet={`${previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <Rating
                    rating={rating}
                    reviewCount={reviewCount}
                    className="product__rate"
                  />
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>
                    {price} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">
                        Характеристики
                      </button>
                      <button className="tabs__control is-active" type="button">
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">
                              Тип камеры:
                            </span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">{description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <SimilarProducts />
          <ReviewList reviews={reviews} />
        </div>
      </main>
      <Link className="up-btn" to="#header" onClick={scrollHandler}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </Link>
      <FooterLayout />
    </div>
  );
}

export default Product;
