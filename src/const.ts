export enum AppRoute {
  Main = '/',
  Basket = '/basket',
  Product = '/product',
  NotFound = '*',
}

export enum CameraTypes {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

export enum CategoryTypes {
  Camcorder = 'Видеокамера',
  Camera = 'Фотоаппарат',
}

export enum LevelTypes {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Любительский',
}

export const NameSpace = {
  Reviews: 'REVIEWS',
  Products: 'PRODUCTS',
  Promo: 'PROMO',
} as const;

export enum APIRoute {
  Products = '/cameras',
  Reviews = '/reviews',
  Promo = '/promo',
}

export const STAR_DIMENSIONS = {
  width: 17,
  height: 16,
};

export const STAR_ICONS = {
  full: 'icon-full-star',
  half: 'icon-half-star',
  empty: 'icon-star',
};

export const STAR_COUNTS = {
  full: 1,
  halfThreshold: 0.5,
  total: 5,
};
