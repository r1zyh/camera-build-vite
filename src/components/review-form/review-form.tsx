import { ChangeEvent, Fragment, useState } from 'react';
import { ReviewLength, NameLength, ratingMap } from '../../const';

type ReviewFormProps = {
  closeModal: () => void;
};

function ReviewForm({closeModal}: ReviewFormProps): JSX.Element {
  const [review, setComment] = useState(localStorage.getItem('review') || '');
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );
  const [advantage, setAdvantage] = useState('');
  const [rating, setRating] = useState(localStorage.getItem('rating') || '');
  const [isFormOpen, setFormOpen] = useState(false);

  const isValid =
    review.length >= ReviewLength.Min &&
    review.length <= ReviewLength.Max &&
    userName.length >= NameLength.Min &&
    userName.length <= NameLength.Max;

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  const handleFormClick = () => {
    setFormOpen(false);
  };

  const resetForm = () => {
    setComment('');
    setRating('0');
    setUserName('');
    localStorage.removeItem('review');
    localStorage.removeItem('rating');
    localStorage.removeItem('userName');
  };

  const activeClass = isFormOpen ? 'is-active' : '';

  return (
    <div className={`modal ${activeClass}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post">
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
                            ></label>
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
                    ></textarea>
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={!isValid}
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={closeModal}
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
