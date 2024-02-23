import { render } from '@testing-library/react';
import { withHistory } from '../../store/mock-components/mock-components';
import PaginationItem from './pagination-item';
import userEvent from '@testing-library/user-event';

describe('PaginationItem component', () => {
  const mockHandleClick = vi.fn();

  it('calls handlePageClick when link is clicked', () => {
    const pageNumber = 1;
    const currentPage = 1;
    const ComponentWithHistory = withHistory(
      <PaginationItem
        pageNumber={pageNumber}
        currentPage={currentPage}
        handlePageClick={mockHandleClick}
      />,
    );

    const { getByText } = render(ComponentWithHistory);

    userEvent.click(getByText(pageNumber.toString()));
  });

  it('adds active class when currentPage matches pageNumber', () => {
    const pageNumber = 1;
    const currentPage = 1;

    const ComponentWithHistory = withHistory(
      <PaginationItem
        pageNumber={pageNumber}
        currentPage={currentPage}
        handlePageClick={mockHandleClick}
      />,
    );

    const { container } = render(ComponentWithHistory);

    const paginationItem = container.querySelector('.pagination__item');
    expect(paginationItem).toHaveClass('active');
  });

  it('does not add active class when currentPage does not match pageNumber', () => {
    const pageNumber = 2;
    const currentPage = 1;

    const ComponentWithHistory = withHistory(
      <PaginationItem
        pageNumber={pageNumber}
        currentPage={currentPage}
        handlePageClick={mockHandleClick}
      />,
    );

    const { container } = render(ComponentWithHistory);

    const paginationItem = container.querySelector('.pagination__item');
    expect(paginationItem).not.toHaveClass('active');
  });
});
