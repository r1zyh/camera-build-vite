import { useState } from 'react';
import { TProducts } from '../../types/products';
import SimilarProductCard from '../similar-product-card/similar-product-card';

type SimilarProductsProps = {
  similarProducts: TProducts;
};
function SimilarProducts({
  similarProducts,
}: SimilarProductsProps): JSX.Element {
  const INITIAL_VISIBLE_PRODUCTS = 3;
  const [currentPosition, setCurrentPosition] = useState(0);

  if (similarProducts === null) {
    return <div></div>;
  }

  const totalProducts = similarProducts.length;
  const maxPosition = totalProducts - INITIAL_VISIBLE_PRODUCTS;

  const handleNextSlide = () => {
    const newPosition = Math.min(currentPosition + 1, maxPosition);
    setCurrentPosition(newPosition);
  };

  const handlePrevSlide = () => {
    const newPosition = Math.max(currentPosition - 1, 0);
    setCurrentPosition(newPosition);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts
                .slice(
                  currentPosition,
                  currentPosition + INITIAL_VISIBLE_PRODUCTS
                )
                .map((product, index) => (
                  <SimilarProductCard
                    key={product.id}
                    similarProduct={product}
                    isActive={index >= currentPosition && index < currentPosition + INITIAL_VISIBLE_PRODUCTS}
                  />
                ))}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={handlePrevSlide}
              disabled={currentPosition === 0}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleNextSlide}
              disabled={currentPosition === maxPosition}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarProducts;
