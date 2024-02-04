import { TReviews } from '../../types/review';
import ReviewItem from '../reivew-item/review-item';

type ReviewsProps = {
  reviews: TReviews;
};

function ReviewList({ reviews }: ReviewsProps): JSX.Element {
  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ul>
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">
              Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewList;