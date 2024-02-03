import { useState } from 'react';
import { TProduct } from '../../types/products';
import Modal from '../modal/modal';

type ProductCardProps = {
  product: TProduct;
};

function ProductCard({ product }: ProductCardProps): JSX.Element {
  const {
    id,
    name,
    rating,
    price,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

  const [isModalOpen, setModalOpen] = useState(false);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const title = 'Добавить товар в корзину';

  const content = (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/orlenok.webp, img/content/orlenok@2x.webp 2x"
          />
          <img
            src="img/content/orlenok.jpg"
            srcSet="img/content/orlenok@2x.jpg 2x"
            width="140"
            height="120"
            alt="Фотоаппарат «Орлёнок»"
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">Орлёнок</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">O78DFGSD832</span>
          </li>
          <li className="basket-item__list-item">Плёночная фотокамера</li>
          <li className="basket-item__list-item">Любительский уровень</li>
        </ul>
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>18 970 ₽
        </p>
      </div>
    </div>
  );

  const buttons = (
    <button
      className="btn btn--purple modal__btn modal__btn--fit-width"
      type="button"
    >
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );

  return (
    <div className="product-card" key={product.id} id={String(id)}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
          />
          <img
            src={previewImg}
            srcSet={previewImg2x}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
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
          onClick={openModalHandler}
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
      {isModalOpen && (
        <Modal
          title={title}
          content={content}
          buttons={buttons}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProductCard;
