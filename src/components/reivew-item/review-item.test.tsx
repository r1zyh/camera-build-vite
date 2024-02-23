import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../store/mock-components/mocks';

describe('Rating component', () => {
  const fakeReview = makeFakeReview();
  it('it should render ReviewItem elem correctly', () => {
    render(<ReviewItem review={fakeReview} />);
    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
  });

  it('should display review content', () => {
    render(<ReviewItem review={fakeReview} />);
    const reviewCardElem = screen.getByTestId('review-card-test');
    const timeElem = screen.getByTestId('time-test');
    const dateTimeAttribute = timeElem.getAttribute('datetime');

    expect(reviewCardElem).toBeInTheDocument();
    expect(reviewCardElem.id).toBe(String(fakeReview.cameraId));

    expect(timeElem).toBeInTheDocument();
    expect(dateTimeAttribute).toBe(fakeReview.createAt);

    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
  });
});
