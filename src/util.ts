import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TProducts } from './types/products';
export function humanizeReviewDate(date: string) {
  const formattedDate = dayjs(date).locale('ru').format('DD MMMM');
  return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1);
}
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const customValidChecker = (
  value: string,
  isSubmitClicked: boolean,
  validationFunction: (text: string) => boolean,
  formInputClass: string
) => {
  if (isSubmitClicked) {
    formInputClass += validationFunction(value) ? '' : ' is-invalid';
  }

  return formInputClass;
};

export const handleTabKeyDown = (
  e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLButtonElement>,
  firstFocusableElementRef: React.RefObject<HTMLElement>,
  lastFocusableElementRef: React.RefObject<HTMLElement>
) => {
  if (e.key === 'Tab') {
    if (
      e.shiftKey &&
      document.activeElement === firstFocusableElementRef.current
    ) {
      e.preventDefault();
      lastFocusableElementRef.current?.focus();
    } else if (
      !e.shiftKey &&
      document.activeElement === lastFocusableElementRef.current
    ) {
      e.preventDefault();
      firstFocusableElementRef.current?.focus();
    }
  }
};

export const applyFilters = (
  indexOfFirstItem: number,
  indexOfLastItem: number,
  filterStatus: boolean,
  currentVisibleProducts: TProducts,
  stateProducts: TProducts
): TProducts => {
  if (filterStatus) {
    return currentVisibleProducts.slice(indexOfFirstItem, indexOfLastItem);
  } else {
    return stateProducts.slice(indexOfFirstItem, indexOfLastItem);
  }
};

export const calcTotalPageCount = (
  filterStatus: boolean,
  currentVisibleProducts: TProducts,
  stateProducts: TProducts,
  itemsPerPage: number
): number => {
  let totalPageCount: number;
  if (filterStatus) {
    totalPageCount = Math.ceil(currentVisibleProducts.length / itemsPerPage);
  } else {
    totalPageCount = Math.ceil(stateProducts.length / itemsPerPage);
  }

  return totalPageCount;
};
