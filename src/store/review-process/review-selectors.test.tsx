import { NameSpace } from '../../const';
import { makeFakeReview } from '../mock-components/mocks';
import { getReviews, getReviewPostStatus } from './selectors';

describe('Review selectors', () => {
  const fakeReview = makeFakeReview();

  const state = {
    [NameSpace.Reviews]: {
      reviews: [fakeReview],
      isReviewPosting: false,
    },
  };

  test('getReviews selector', () => {
    const selectedReviews = getReviews(state);
    expect(selectedReviews).toEqual([fakeReview]);
  });

  test('getReviewPostStatus selector', () => {
    const reviewPostStatus = getReviewPostStatus(state);
    expect(reviewPostStatus).toBe(false);
  });
});
