import { NameSpace } from '../../const';
import { TProduct, TProducts } from '../../types/products';
import { TPromos } from '../../types/promo';
import { State } from '../../types/state';

export const getProducts = (state: State): TProducts =>
  state[NameSpace.Products].products;
export const getProduct = (state: State): TProduct | null =>
  state[NameSpace.Products].product;

export const getSimilarProducts = (state: State): TProducts | null =>
  state[NameSpace.Products].similarProducts;

export const getActiveId = (state: State): number | undefined =>
  state[NameSpace.Products].activeId;

export const getProductsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Products].isProductLoading;

export const getPromos = (state: State): TPromos | null =>
  state[NameSpace.Products].promos;
