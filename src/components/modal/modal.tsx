import { ReactNode } from 'react';

type ModalProps = {
  title: string;
  content: ReactNode;
  buttons: ReactNode;
  closeModal: () => void;
};

function Modal({
  title,
  content,
  buttons,
  closeModal,
}: ModalProps): JSX.Element {

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">{title}</p>
          {content}
          <div className="modal__buttons">{buttons}</div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModal}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
