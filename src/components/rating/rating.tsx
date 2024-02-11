import { STAR_COUNTS, STAR_DIMENSIONS, STAR_ICONS } from '../../const';

type RatingProps = {
  rating: number;
  reviewCount?: number;
  className: string;
};

const Rating = ({ rating, reviewCount, className }: RatingProps) => {
  const renderStars = (
    fullStars: number,
    halfStar: boolean,
    emptyStars: number
  ) => {
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
    if (halfStar) {
      stars.push(
        <svg
          key="half"
          width={STAR_DIMENSIONS.width}
          height={STAR_DIMENSIONS.height}
          aria-hidden="true"
        >
          <use xlinkHref={`#${STAR_ICONS.half}`}></use>
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

  return (
    <div className={`rate ${className}`}>
      {renderStars(
        Math.floor(rating),
        rating % 1 >= STAR_COUNTS.halfThreshold,
        STAR_COUNTS.total - Math.ceil(rating)
      )}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
};

export default Rating;
