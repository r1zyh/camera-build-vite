import { useState } from 'react';
import { TProducts } from '../../types/products';
import ProductCard from '../product-card/product-card';


type SimilarProductsProps = {
  similarProducts: TProducts;
};

function SimilarProducts({
  similarProducts,
}: SimilarProductsProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(similarProducts.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const visibleProducts = similarProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isActive={visibleProducts.some(
                    (visibleProduct) => visibleProduct.id === product.id
                  )}
                />
              ))}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущая страница"
              style={{pointerEvents: 'auto'}}
              onClick={handlePrevClick}
              disabled={currentPage === 0}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              style={{pointerEvents: 'auto'}}
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
