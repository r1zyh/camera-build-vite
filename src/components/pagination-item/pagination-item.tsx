import { Link } from 'react-router-dom';

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
  const isActive = currentPage === pageNumber;

  const handleClick = () => {
    handlePageClick(pageNumber);
  };

  return (
    <li className={`pagination__item ${isActive ? 'active' : ''}`}>
      <Link
        to="#"
        onClick={handleClick}
        className={`pagination__link pagination__link--${
          isActive ? 'active' : ''
        }`}
      >
        {pageNumber}
      </Link>
    </li>
  );
}

export default PaginationItem;
