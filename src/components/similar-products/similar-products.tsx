import { useState } from 'react';
import { TProducts } from '../../types/products';
import SimilarProductCard from '../similar-product-card/similar-product-card';

type SimilarProductsProps = {
  similarProducts: TProducts;
};

function SimilarProducts({
  similarProducts,
}: SimilarProductsProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 3;

  const startIdx = currentPage * ITEMS_PER_PAGE;
  const endIdx = (currentPage + 1) * ITEMS_PER_PAGE;
  const totalPages = Math.ceil(similarProducts.length / ITEMS_PER_PAGE);

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts.map((product, index) => (
                <SimilarProductCard
                  key={product.id}
                  similarProduct={product}
                  isActive={index >= startIdx && index < endIdx}
                />
              ))}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущая страница"
              onClick={handlePrevClick}
              disabled={currentPage === 0}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующая страница"
              onClick={handleNextClick}
              disabled={currentPage === totalPages - 1}
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
