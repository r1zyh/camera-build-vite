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
}
