import { NameSpace } from '../../const';
import { TReviews } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): TReviews | null =>
  state[NameSpace.Reviews].reviews;
export const getCommentPostStatus = (state: State): boolean =>
  state[NameSpace.Reviews].isReviewPosting;
