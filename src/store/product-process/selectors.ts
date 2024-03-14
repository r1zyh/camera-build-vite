import { NameSpace } from '../../const';
import { TProduct, TProducts } from '../../types/products';
import { TPromos } from '../../types/promo';
import { State } from '../../types/state';

export const getProducts = (
  state: Pick<State, NameSpace.Products>
): TProducts => state[NameSpace.Products].products;
export const getProduct = (
  state: Pick<State, NameSpace.Products>
): TProduct | null => state[NameSpace.Products].product;

export const getSimilarProducts = (
  state: Pick<State, NameSpace.Products>
): TProducts | null => state[NameSpace.Products].similarProducts;

export const getActiveId = (
  state: Pick<State, NameSpace.Products>
): string | undefined => state[NameSpace.Products].activeId;

export const getProductsLoadingStatus = (
  state: Pick<State, NameSpace.Products>
): boolean => state[NameSpace.Products].isProductLoading;

export const getPromos = (
  state: Pick<State, NameSpace.Products>
): TPromos | null => state[NameSpace.Products].promos;
export const getCurrentSortType = (state: State): string | null =>
  state[NameSpace.Products].currentSortType;

export const getCurrentSortOrder = (state: State): string | null =>
  state[NameSpace.Products].currentSortOrder;

export const getCamCat = (state: State): string | null =>
  state[NameSpace.Products].camCategory;

export const getCamType = (state: State): string | null =>
  state[NameSpace.Products].camType;

export const getCamLvl = (state: State): string | null =>
  state[NameSpace.Products].camLevel;
