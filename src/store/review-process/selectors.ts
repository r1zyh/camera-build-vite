import { NameSpace } from '../../const';
import { TReviews } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (
  state: Pick<State, NameSpace.Reviews>
): TReviews | null =>
  (state[NameSpace.Reviews] as { reviews: TReviews }).reviews;
export const getReviewPostStatus = (
  state: Pick<State, NameSpace.Reviews>
): boolean => state[NameSpace.Reviews].isReviewPosting;
