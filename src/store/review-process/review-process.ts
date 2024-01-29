import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TReviews } from '../../types/review';

type ReviewProcessType = {
  id: string;
  reviews: TReviews;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

const initialState: ReviewProcessType = {
  id: '',
  reviews: [],
  createAt: '',
  cameraId: 0,
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
};

export const reviewProcessSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<TReviews>) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews } = reviewProcessSlice.actions;
