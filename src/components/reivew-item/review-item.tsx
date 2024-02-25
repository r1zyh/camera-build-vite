import { TReview } from '../../types/review';
import { humanizeReviewDate } from '../../util';
import Rating from '../rating/rating';

type ReviewItemProps = {
  review: TReview;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const {
    id,
    createAt,
    cameraId,
    userName,
    advantage,
    disadvantage,
    review: content,
    rating,
  } = review;
  return (
    <li
      className="review-card"
      key={id}
      id={String(cameraId)}
      data-testid="review-card-test"
    >
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time
          className="review-card__data"
          dateTime={createAt}
          data-testid="time-test"
        >
          {humanizeReviewDate(createAt)}
        </time>
      </div>
      <Rating className={'rate review-card__rate'} rating={rating} />
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{content}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
