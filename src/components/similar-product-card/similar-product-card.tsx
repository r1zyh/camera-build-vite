import { Link } from 'react-router-dom';
import { TProduct } from '../../types/products';
import Rating from '../rating/rating';
import { AppRoute } from '../../const';

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
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = similarProduct;

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
        <button className="btn btn--purple product-card__btn" type="button">
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default SimilarProductCard;
