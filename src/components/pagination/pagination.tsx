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
  const renderPaginationItems = () => {
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

    return { paginationItems, startPage };
  };

  const { paginationItems, startPage } = renderPaginationItems();

  const renderPrevButton = () =>
    startPage > 1 && (
      <li className="pagination__item">
        <Link
          className="pagination__link pagination__link--text"
          to="#"
          onClick={() => handlePageClick(startPage - 1)}
        >
          Назад
        </Link>
      </li>
    );

  const renderNextButton = () =>
    startPage + maxPageCount <= totalPageCount && (
      <li className="pagination__item">
        <Link
          className="pagination__link pagination__link--text"
          to="#"
          onClick={() => handlePageClick(startPage + maxPageCount)}
        >
          Далее
        </Link>
      </li>
    );

  return (
    <ul className="pagination__list">
      {renderPrevButton()}
      {paginationItems}
      {renderNextButton()}
    </ul>
  );
}

export default Pagination;

