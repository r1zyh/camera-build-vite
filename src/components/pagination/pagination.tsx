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
  return (
    <ul className="pagination__list">
      {currentPage >= maxPageCount && (
        <li className="pagination__item">
          <a className="pagination__link pagination__link--text" href="#">
            Назад
          </a>
        </li>
      )}
      {paginationItems}
      {currentPage >= maxPageCount && currentPage !== totalPageCount && (
        <li className="pagination__item">
          <a className="pagination__link pagination__link--text" href="#">
            Далее
          </a>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
