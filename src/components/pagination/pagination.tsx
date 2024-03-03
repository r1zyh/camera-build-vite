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
    const groupIndex = Math.floor((currentPage - 1) / maxPageCount);
    const startPage = groupIndex * maxPageCount + 1;
    const endPage = Math.min(startPage + maxPageCount - 1, totalPageCount);

    const paginationItems = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => {
        const pageNumber = startPage + index;
        return (
          <PaginationItem
            key={pageNumber}
            pageNumber={pageNumber}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        );
      }
    );

    return { paginationItems, groupIndex, startPage };
  };

  const { paginationItems, startPage, groupIndex } = renderPaginationItems();

  const handlePrevClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const prevGroupIndex = Math.max(0, groupIndex - 1);
    const nextPage = prevGroupIndex * maxPageCount + 1;
    handlePageClick(nextPage);
  };

  const handleNextClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const nextPage = (groupIndex + 1) * maxPageCount + 1;
    handlePageClick(nextPage);
  };

  const renderPrevButton = () =>
    currentPage > 3 && (
      <li className="pagination__item">
        <Link
          className="pagination__link pagination__link--text"
          to="#"
          onClick={handlePrevClick}
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
          onClick={handleNextClick}
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
