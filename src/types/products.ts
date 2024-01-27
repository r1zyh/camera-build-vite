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

type TCameraType = (typeof CameraTypes)[keyof typeof CameraTypes];
type TCategory = (typeof CategoryTypes)[keyof typeof CategoryTypes];
type TLevel = (typeof LevelTypes)[keyof typeof LevelTypes];

export type TProduct = {
  id: number;
  name: string;
  vendorCode: string;
  type: TCameraType;
  category: TCategory;
  description: string;
  level: TLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type TProducts = TProduct[];
