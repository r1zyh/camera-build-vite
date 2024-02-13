import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { NameLength, TextLength, ratingMap } from '../../const';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { postReview } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-select';
import { getActiveId } from '../../store/product-process/selectors';
import { getReviewPostStatus } from '../../store/review-process/selectors';

type ReviewFormProps = {
  cameraId: string | undefined;
  closeForm: () => void;
};

function ReviewForm({ closeForm, cameraId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const productId = useAppSelector(getActiveId);
  const isReviewPosting = useAppSelector(getReviewPostStatus);

  const [review, setReview] = useState(localStorage.getItem('review') || '');
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );
  const [advantage, setAdvantage] = useState(
    localStorage.getItem('advantage') || ''
  );
  const [disadvantage, setDisadvantage] = useState(
    localStorage.getItem('disadvantage') || ''
  );

  const [rating, setRating] = useState(localStorage.getItem('rating') || '');

  const isValid = (text: string) =>
    text.length >= TextLength.Min && text.length <= TextLength.Max;

  const isValidReview = () =>
    isValid(review) &&
    isValid(advantage) &&
    isValid(disadvantage) &&
    userName.length >= NameLength.Min && userName.length <= NameLength.Max;

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'rate':
        setRating(value);
        break;
      case 'user-name':
        setUserName(value);
        break;
      case 'user-plus':
        setAdvantage(value);
        break;
      case 'user-minus':
        setDisadvantage(value);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setReview('');
    setRating('0');
    setUserName('');
    setAdvantage('');
    setDisadvantage('');
    localStorage.removeItem('review');
    localStorage.removeItem('rating');
    localStorage.removeItem('userName');
    localStorage.removeItem('advantage');
    localStorage.removeItem('disadvantage');
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productId !== null && isValidReview()) {
      dispatch(
        postReview({
          cameraId: Number(cameraId),
          userName: userName,
          advantage: advantage,
          disadvantage: disadvantage,
          review: review,
          rating: Number(rating),
          resetForm: resetForm,
        })
      );
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleFormSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {Object.entries(ratingMap)
                        .reverse()
                        .map(([score, title]) => (
                          <Fragment key={score}>
                            <input
                              className="visually-hidden"
                              id={`star-${score}`}
                              name="rate"
                              type="radio"
                              value={score}
                              checked={rating === score}
                              onChange={handleInputChange}
                            />
                            <label
                              className="rate__label"
                              htmlFor={`star-${score}`}
                              title={title}
                            >
                            </label>
                          </Fragment>
                        ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{rating}</span>{' '}
                      <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      minLength={2}
                      maxLength={15}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      minLength={10}
                      maxLength={160}
                      placeholder="Основные преимущества товара"
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать достоинства
                  </p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      minLength={10}
                      maxLength={160}
                      placeholder="Главные недостатки товара"
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать недостатки
                  </p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={10}
                      maxLength={160}
                      placeholder="Поделитесь своим опытом покупки"
                      onChange={handleTextareaChange}
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={isReviewPosting && !isValidReview()}
              >
                {isReviewPosting ? 'Отзыв отправляется...' : 'Отправить отзыв'}
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={closeForm}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
