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

export enum NameSpace {
  Reviews = 'REVIEWS',
  Products = 'PRODUCTS',
  Promo = 'PROMO',
}

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
  empty: 'icon-star',
};

export const STAR_COUNTS = {
  full: 1,
  total: 5,
};

export enum TextLength {
  Min = 10,
  Max = 160,
}

export enum NameLength {
  Min = 2,
  Max = 15,
}

export const ratingMap = {
  '5': 'Отлично',
  '4': 'Хорошо',
  '3': 'Нормально',
  '2': 'Плохо',
  '1': 'Ужасно',
};

export const INITIAL_VISIBLE_REVIEWS = 3;
export const REVIEWS_PER_LOAD = 3;
