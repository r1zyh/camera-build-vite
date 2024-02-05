import { useState } from 'react';
import { TReviews } from '../../types/review';
import ReviewItem from '../reivew-item/review-item';
import dayjs from 'dayjs';
type ReviewsProps = {
  reviews: TReviews;
};

const INITIAL_VISIBLE_REVIEWS = 3;
const REVIEWS_PER_LOAD = 3;

function ReviewList({ reviews }: ReviewsProps): JSX.Element {
  const [visibleReviews, setVisibleReviews] = useState(INITIAL_VISIBLE_REVIEWS);

  const sortedReviews = [...reviews].sort(
    (a, b) => dayjs(b.createAt).unix() - dayjs(a.createAt).unix()
  );

  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) =>
      Math.min(prevVisibleReviews + REVIEWS_PER_LOAD, sortedReviews.length)
    );
  };

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
          {sortedReviews.length === 0 ? (
            <p>Нет отзывов</p>
          ) : (
            <>
              <ul className="review-block__list">
                {sortedReviews.slice(0, visibleReviews).map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </ul>
              {visibleReviews < sortedReviews.length && (
                <div className="review-block__buttons">
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={showMoreReviews}
                  >
                    Показать больше отзывов
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ReviewList;
