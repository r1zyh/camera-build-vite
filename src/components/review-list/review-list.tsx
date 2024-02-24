import { useEffect, useState } from 'react';
import { TReviews } from '../../types/review';
import ReviewItem from '../reivew-item/review-item';
import dayjs from 'dayjs';
import ReviewForm from '../review-form/review-form';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import {
  AppRoute,
  INITIAL_VISIBLE_REVIEWS,
  REVIEWS_PER_LOAD,
} from '../../const';

type ReviewsProps = {
  reviews: TReviews;
};

function ReviewList({ reviews }: ReviewsProps): JSX.Element {
  const [visibleReviews, setVisibleReviews] = useState(INITIAL_VISIBLE_REVIEWS);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const sortedReviews = [...reviews].sort(
    (a, b) => dayjs(b.createAt).unix() - dayjs(a.createAt).unix()
  );

  const [isScrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'auto';
    };

    if (isScrollLocked) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [isScrollLocked]);

  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) =>
      Math.min(prevVisibleReviews + REVIEWS_PER_LOAD, sortedReviews.length)
    );
  };

  const openFormHandler = () => {
    setFormOpen(true);
    setScrollLocked(true);
  };

  const closeFormHandler = () => {
    setFormOpen(false);
    setScrollLocked(false);
  };

  const reviewSubmitHandler = () => {
    setIsReviewSubmitted(true);
  };

  const closeReviewHandler = () => {
    setIsReviewSubmitted(false);
  };

  const navigationHandler = () => {
    closeReviewHandler();
    navigate(`${AppRoute.Product}/${id as string}`);
  };

  const titleModal = 'Спасибо за отзыв';
  const content = (
    <svg className="modal__icon" width="80" height="78" aria-hidden="true">
      <use xlinkHref="#icon-review-success"></use>
    </svg>
  );

  const buttons = (
    <button
      className="btn btn--purple modal__btn modal__btn--fit-width"
      type="button"
      onClick={navigationHandler}
    >
      Вернуться к покупкам
    </button>
  );

  return (
    <div className="page-content__section">
      {isFormOpen && (
        <ReviewForm
          cameraId={id}
          closeForm={closeFormHandler}
          reviewSubmit={reviewSubmitHandler}
        />
      )}
      {isReviewSubmitted && (
        <Modal
          title={titleModal}
          content={content}
          buttons={buttons}
          closeModal={closeReviewHandler}
        />
      )}
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={openFormHandler}
              data-testid="review-button"
            >
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
                    data-testid="more-reviews"
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
