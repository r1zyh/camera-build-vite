import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory } from '../../store/mock-components/mock-components';

describe('Pagination component', () => {
  const mockHandlePageClick = vi.fn();

  it('renders current page', () => {
    render(
      withHistory(
        <Pagination
          currentPage={4}
          totalPageCount={10}
          handlePageClick={mockHandlePageClick}
          maxPageCount={3}
        />
      )
    );
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
  });

  it('calls handlePageClick when Назад & Далее clicked', async () => {
    render(
      withHistory(
        <Pagination
          currentPage={4}
          totalPageCount={10}
          handlePageClick={mockHandlePageClick}
          maxPageCount={3}
        />
      )
    );

    await userEvent.click(screen.getByText('Назад'));
    await userEvent.click(screen.getByText('Далее'));
    expect(mockHandlePageClick).toHaveBeenCalledTimes(2);
    expect(mockHandlePageClick).toHaveBeenCalledWith(3);
    expect(mockHandlePageClick).toHaveBeenCalledWith(5);
  });

  it('displays correct number of pagination items', () => {
    render(
      withHistory(
        <Pagination
          currentPage={4}
          totalPageCount={10}
          handlePageClick={mockHandlePageClick}
          maxPageCount={3}
        />
      )
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
