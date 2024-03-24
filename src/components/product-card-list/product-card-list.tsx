import { TProducts } from '../../types/products';
import NoMatch from '../no-match/no-match';
import ProductCard from '../product-card/product-card';

type ProductCardList = {
  products: TProducts;
};

function ProductCardList({ products }: ProductCardList): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <NoMatch />
      )}
    </div>
  );
}

export default ProductCardList;
