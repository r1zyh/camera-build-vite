import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TReview, TReviews } from '../../types/review';

type ReviewProcessType = {
  reviews: TReviews;
  isReviewPosting: boolean;
};

const initialState: ReviewProcessType = {
  reviews: [],
  isReviewPosting: false,
};

export const reviewProcessSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<TReviews>) => {
      state.reviews = action.payload;
    },
    updateReviews: (state, action: PayloadAction<TReview>) => {
      state.reviews = [...state.reviews, action.payload] as TReviews;
    },
    setReviewPostStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewPosting = action.payload;
    },
  },
});

export const { setReviews, setReviewPostStatus, updateReviews } =
  reviewProcessSlice.actions;
