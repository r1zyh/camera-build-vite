import { Link } from 'react-router-dom';
import { TProduct } from '../../types/products';
import Rating from '../rating/rating';
import { AppRoute } from '../../const';
import Modal from '../modal/modal';
import { useState } from 'react';

type SimilarProductCardProps = {
  similarProduct: TProduct;
  isActive: boolean;
};

function SimilarProductCard({
  similarProduct,
  isActive,
}: SimilarProductCardProps) {
  const {
    id,
    name,
    price,
    rating,
    reviewCount,
    vendorCode,
    type,
    level,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = similarProduct;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const buyButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModalHandler();
  };

  const title = 'Добавить товар в корзину';

  const content = (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
          />
          <img
            src={previewImg}
            srcSet={previewImg2x}
            width={140}
            height={120}
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>
          {price} ₽
        </p>
      </div>
    </div>
  );

  const buttons = (
    <button
      className="btn btn--purple modal__btn modal__btn--fit-width"
      type="button"
      onClick={buyButtonClickHandler}
    >
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );

  const cardClass = isActive ? 'product-card is-active' : 'product-card';

  return (
    <div className={cardClass} key={id} id={String(id)}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <Rating
          rating={rating}
          reviewCount={reviewCount}
          className="product-card__rate"
        />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={buyButtonClickHandler}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
      {isModalOpen && (
        <Modal
          title={title}
          content={content}
          buttons={buttons}
          closeModal={closeModalHandler}
        />
      )}
    </div>
  );
}

export default SimilarProductCard;
