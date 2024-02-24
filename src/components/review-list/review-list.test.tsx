import { render, screen, waitFor } from '@testing-library/react';
import ReviewList from './review-list';
import userEvent from '@testing-library/user-event';
import { makeFakeReview } from '../../store/mock-components/mocks';
import { withHistory } from '../../store/mock-components/mock-components';
import { INITIAL_VISIBLE_REVIEWS } from '../../const';
const fakeReviews = [
  makeFakeReview(),
  makeFakeReview(),
  makeFakeReview(),
  makeFakeReview(),
  makeFakeReview(),
];

describe('ReviewList', () => {
  it('renders reviews correctly', () => {
    render(withHistory(<ReviewList reviews={fakeReviews} />));

    const visibleReviews = screen.getAllByTestId('review-card-test');
    expect(visibleReviews.length).toBe(INITIAL_VISIBLE_REVIEWS);
  });

  it('shows "Нет отзывов" when there are no reviews', () => {
    render(withHistory(<ReviewList reviews={[]} />));

    const noReviewsElement = screen.getByText('Нет отзывов');
    expect(noReviewsElement).toBeInTheDocument();
  });

  it('loads more reviews when "Показать больше отзывов" button is clicked', async () => {
    render(withHistory(<ReviewList reviews={fakeReviews} />));

    const showMoreButton = screen.getByTestId('more-reviews');
    userEvent.click(showMoreButton);

    await waitFor(() => {
      const visibleReviews = screen.getAllByTestId('review-card-test');
      expect(visibleReviews.length).toBe(fakeReviews.length);
    });
  });
});
