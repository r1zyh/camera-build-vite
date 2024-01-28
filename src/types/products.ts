import { CameraTypes, CategoryTypes, LevelTypes } from '../const';

export type TCameraType = (typeof CameraTypes)[keyof typeof CameraTypes];
export type TCategory = (typeof CategoryTypes)[keyof typeof CategoryTypes];
export type TLevel = (typeof LevelTypes)[keyof typeof LevelTypes];

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
