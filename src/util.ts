import dayjs from 'dayjs';

export function humanizeReviewDate(date: string) {
  return date ? dayjs(date).format('DD MMMM') : '';
}
