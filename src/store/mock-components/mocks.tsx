import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { createAPI } from '../../services/api';
import { TReview } from '../../types/review';
import { getRandomInt } from '../../util';
import { TProduct } from '../../types/products';
import { CameraTypes, CategoryTypes, LevelTypes } from '../../const';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const makeFakeReview = (): TReview => ({
  id: crypto.randomUUID(),
  createAt: new Date().toString(),
  cameraId: getRandomInt(1, 5),
  userName: 'fake user',
  advantage: 'Some advantage',
  disadvantage: 'Some disadvantage.',
  review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  rating: getRandomInt(1, 5),
});

export const makeFakeProduct = (): TProduct => ({
  id: getRandomInt(1, 5),
  name: 'Орленок',
  vendorCode: 'DA4IU67AD5',
  type: CameraTypes.Collectible,
  category: CategoryTypes.Camcorder,
  description:
    'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
  level: LevelTypes.Amateur,
  price: getRandomInt(10000, 60000),
  rating: 5,
  reviewCount: 16,
  previewImg: '/markup/img/content/orlenok.jpg',
  previewImg2x: '/markup/img/content/orlenok@2x.jpg',
  previewImgWebp: '/markup/img/content/orlenok.webp',
  previewImgWebp2x: '/markup/img/content/orlenok@2x.webp',
});

export const makeFakePromo = () => ({
  id: getRandomInt(1, 5),
  name: 'Орленок',
  previewImg: '/markup/img/content/orlenok.jpg',
  previewImg2x: '/markup/img/content/orlenok@2x.jpg',
  previewImgWebp: '/markup/img/content/orlenok.webp',
  previewImgWebp2x: '/markup/img/content/orlenok@2x.webp',
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  PRODUCTS: {
    products: [],
    similarProducts: [],
    activeId: '',
    promos: [],
    isProductLoading: true,
    product: null,
  },
  REVIEWS: { reviews: [], isReviewPosting: false },
  ...(initialState ?? {}),
});
