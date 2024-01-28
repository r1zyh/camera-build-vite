import { NameSpace } from '../../const';
import { TProduct, TProducts } from '../../types/products';
import { State } from '../../types/state';

export const getProducts = (state: State): TProducts | null =>
  state[NameSpace.Products].products;
export const getProduct = (state: State): TProduct | null =>
  state[NameSpace.Products].product;

export const getSimilarProducts = (state: State): TProducts | null =>
  state[NameSpace.Products].similarProducts;
