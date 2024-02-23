import { STAR_COUNTS, STAR_DIMENSIONS, STAR_ICONS } from '../../const';

type RatingProps = {
  rating: number;
  reviewCount?: number;
  className: string;
};

const Rating = ({ rating, reviewCount, className }: RatingProps) => {
  const renderStars = (fullStars: number, emptyStars: number) => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          width={STAR_DIMENSIONS.width}
          height={STAR_DIMENSIONS.height}
          aria-hidden="true"
        >
          <use xlinkHref={`#${STAR_ICONS.full}`}></use>
        </svg>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          width={STAR_DIMENSIONS.width}
          height={STAR_DIMENSIONS.height}
          aria-hidden="true"
        >
          <use xlinkHref={`#${STAR_ICONS.empty}`}></use>
        </svg>
      );
    }
    return stars;
  };

  const fullStars = Math.floor(rating);
  const emptyStars = STAR_COUNTS.total - Math.ceil(rating);

  return (
    <div className={`rate ${className}`} data-testid="rating">
      {renderStars(fullStars, emptyStars)}
      <p className="visually-hidden" data-testid='hidden-rate'>Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
};

export default Rating;
