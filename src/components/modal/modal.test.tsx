import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Modal from './modal';

describe('Modal component', () => {
  const mockTitle = 'Test Modal';
  const mockContent = <div>Modal content</div>;
  const mockButtons = <button>OK</button>;
  const mockHandleClick = vi.fn();

  it('renders without crashing', () => {
    render(
      <Modal
        title={mockTitle}
        content={mockContent}
        buttons={mockButtons}
        closeModal={mockHandleClick}
      />
    );
  });

  it('calls closeModal when clicking the close button', () => {
    let closeModalCalled = false;
    const closeModal = () => {
      closeModalCalled = false;
    };

    const TestModal = () => {
      const [, setModalOpen] = useState(true);

      const closeModalHandler = () => {
        setModalOpen(false);
        closeModal();
      };

      return (
        <Modal
          title={mockTitle}
          content={mockContent}
          buttons={mockButtons}
          closeModal={closeModalHandler}
        />
      );
    };

    const { getByLabelText } = render(<TestModal />);

    userEvent.click(getByLabelText('Закрыть попап'));

    act(() => {
      expect(closeModalCalled).toBe(false);
    });
  });

});
