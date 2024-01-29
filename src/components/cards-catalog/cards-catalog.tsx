import { TProducts } from '../../types/products';
import ProductCard from '../product-card/product-card';

type CardsCatalogProps = {
  products: TProducts;
};

function CardsCatalog({ products }: CardsCatalogProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CardsCatalog;
