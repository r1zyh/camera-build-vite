import { Link } from "react-router-dom";

type PaginationItemProps = {
  pageNumber: number;
  currentPage: number;
  handlePageClick: (pageNumber: number) => void;
};

function PaginationItem({
  pageNumber,
  currentPage,
  handlePageClick,
}: PaginationItemProps): JSX.Element | null {

  return (
    <li
      className={`pagination__item ${
        currentPage === pageNumber ? 'active' : ''
      }`}
    >
      <Link
        onClick={() => handlePageClick(pageNumber)}
        className={`pagination__link pagination__link--${
          currentPage === pageNumber ? 'active' : ''
        }`}
        to="#"
      >
        {pageNumber}
      </Link>
    </li>
  );
}

export default PaginationItem;
