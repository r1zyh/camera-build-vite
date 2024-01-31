import { Link } from 'react-router-dom';
import PaginationItem from '../pagination-item/pagination-item';

type PaginationProps = {
  currentPage: number;
  totalPageCount: number;
  handlePageClick: (pageNumber: number) => void;
};

function Pagination({
  currentPage,
  totalPageCount,
  handlePageClick,
}: PaginationProps): JSX.Element {
  const maxPageCount = 3;
  const pagesToShow = Math.min(maxPageCount, totalPageCount);

  const startPage =
    currentPage <= Math.floor(pagesToShow / 2)
      ? 1
      : Math.min(
        Math.max(1, currentPage - Math.floor(pagesToShow / 2)),
        totalPageCount - pagesToShow + 1
      );

  const paginationItems = Array.from({ length: pagesToShow }, (_, index) => {
    const pageNumber = startPage + index;
    return (
      <PaginationItem
        key={pageNumber}
        pageNumber={pageNumber}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
    );
  });

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPageCount) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <ul className="pagination__list">
      {currentPage >= maxPageCount && (
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to="#"
            onClick={handlePrevClick}
          >
            Назад
          </Link>
        </li>
      )}
      {paginationItems}
      {currentPage >= maxPageCount && currentPage !== totalPageCount && (
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to="#"
            onClick={handleNextClick}
          >
            Далее
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
