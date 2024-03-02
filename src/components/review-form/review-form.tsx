import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NameLength, TextLength, ratingMap } from '../../const';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { postReview } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-select';
import { getActiveId } from '../../store/product-process/selectors';
import { getReviewPostStatus } from '../../store/review-process/selectors';
import { customValidChecker } from '../../util';

type ReviewFormProps = {
  cameraId: string | undefined;
  closeForm: () => void;
  reviewSubmit: () => void;
};

function ReviewForm({
  closeForm,
  cameraId,
  reviewSubmit,
}: ReviewFormProps): JSX.Element {
  const userNameRef = useRef<HTMLInputElement>(null);

  const inputClass = 'custom-input form-review__item';
  const textAreaClass = 'custom-textarea form-review__item';

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeForm();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest('.modal__content')
      ) {
        closeForm();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    if (userNameRef.current) {
      userNameRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeForm]);

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

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const isValid = (text: string) =>
    text.length >= TextLength.Min && text.length <= TextLength.Max;

  const isValidName = (text: string) =>
    text.length >= NameLength.Min && text.length <= NameLength.Max;

  const isValidReview = () =>
    isValid(review) &&
    isValid(advantage) &&
    isValid(disadvantage) &&
    isValidName(userName);

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
      )
        .then(() => {
          closeForm();
          reviewSubmit();
        })
        .catch((error) => {
          <div>
            <p>{error}</p>
          </div>;
        });
    }
  };

  return (
    <div className="modal is-active" data-testid="review-form">
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
                <div
                  className={customValidChecker(
                    userName,
                    isSubmitClicked,
                    isValidName,
                    inputClass
                  )}
                >
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      ref={userNameRef}
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      minLength={NameLength.Min}
                      maxLength={NameLength.Max}
                      onChange={handleInputChange}
                    />
                  </label>

                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div
                  className={customValidChecker(
                    advantage,
                    isSubmitClicked,
                    isValid,
                    inputClass
                  )}
                >
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
                      minLength={TextLength.Min}
                      maxLength={TextLength.Max}
                      placeholder="Основные преимущества товара"
                      onChange={handleInputChange}
                    />
                  </label>

                  <p className="custom-input__error">
                    Нужно указать достоинства
                  </p>
                </div>
                <div
                  className={customValidChecker(
                    disadvantage,
                    isSubmitClicked,
                    isValid,
                    inputClass
                  )}
                >
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
                      minLength={TextLength.Min}
                      maxLength={TextLength.Max}
                      placeholder="Главные недостатки товара"
                      onChange={handleInputChange}
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать недостатки
                  </p>
                </div>
                <div
                  className={customValidChecker(
                    review,
                    isSubmitClicked,
                    isValid,
                    textAreaClass
                  )}
                >
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={TextLength.Min}
                      maxLength={TextLength.Max}
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
                onClick={() => setIsSubmitClicked(true)}
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
