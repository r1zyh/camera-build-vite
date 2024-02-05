import { Link } from 'react-router-dom';
import PaginationItem from '../pagination-item/pagination-item';

type PaginationProps = {
  currentPage: number;
  totalPageCount: number;
  handlePageClick: (pageNumber: number) => void;
  maxPageCount: number;
};

function Pagination({
  currentPage,
  totalPageCount,
  handlePageClick,
  maxPageCount = 3,
}: PaginationProps): JSX.Element {
  const pagesToShow = Math.min(maxPageCount, totalPageCount);

  const startPage =
    currentPage <= Math.floor(pagesToShow / 2)
      ? 1
      : Math.min(
        Math.max(1, currentPage - Math.floor(pagesToShow / 2)),
        totalPageCount - pagesToShow + 1
      );

  const renderPaginationItems = () =>
    Array.from({ length: pagesToShow }, (_, index) => {
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

  const renderPrevButton = () =>
    currentPage >= maxPageCount && (
      <li className="pagination__item">
        <Link
          className="pagination__link pagination__link--text"
          to="#"
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Назад
        </Link>
      </li>
    );

  const renderNextButton = () =>
    currentPage !== totalPageCount && (
      <li className="pagination__item">
        <Link
          className="pagination__link pagination__link--text"
          to="#"
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Далее
        </Link>
      </li>
    );

  return (
    <ul className="pagination__list">
      {renderPrevButton()}
      {renderPaginationItems()}
      {renderNextButton()}
    </ul>
  );
}

export default Pagination;
