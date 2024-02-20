import { makeFakeReview } from '../mock-components/mocks';
import {
  reviewProcessSlice,
  setReviews,
  updateReviews,
  setReviewPostStatus,
} from './review-process';

describe('Review Process Slice', () => {
  const initialState = {
    reviews: [],
    isReviewPosting: false,
  };

  const fakeReview = makeFakeReview();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = reviewProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set reviews', () => {
    const newReviews = [fakeReview];

    const result = reviewProcessSlice.reducer(
      initialState,
      setReviews(newReviews)
    );

    expect(result.reviews).toEqual(newReviews);
  });

  it('should update reviews', () => {
    const reviewToAdd = fakeReview;

    const result = reviewProcessSlice.reducer(
      initialState,
      updateReviews(reviewToAdd)
    );

    expect(result.reviews).toEqual([...initialState.reviews, reviewToAdd]);
  });

  it('should set review post status', () => {
    const newStatus = true;

    const result = reviewProcessSlice.reducer(
      initialState,
      setReviewPostStatus(newStatus)
    );

    expect(result.isReviewPosting).toEqual(newStatus);
  });
});
