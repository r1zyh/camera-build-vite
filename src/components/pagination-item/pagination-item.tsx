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
      <a
        onClick={() => handlePageClick(pageNumber)}
        className="pagination__link"
        href="#"
      >
        {pageNumber}
      </a>
    </li>
  );
}

export default PaginationItem;
