import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { handleTabKeyDown } from '../../util';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }

      handleTabKeyDown(e, firstFocusableElementRef, lastFocusableElementRef);
    },
    [handleCloseModal]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeModal, handleCloseModal, handleKeyDown]);

  useEffect(() => {
    if (modalRef.current) {
      const focusableElements = Array.from(
        modalRef.current?.querySelectorAll('input, button, [tabindex="0"]') ||
          []
      );
      firstFocusableElementRef.current =
        focusableElements[0] as HTMLElement | null;
      lastFocusableElementRef.current = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement | null;
    }
  }, []);

  useEffect(() => {
    if (modalRef.current && firstFocusableElementRef.current) {
      firstFocusableElementRef.current.focus();
    }
  }, []);

  return (
    <div className="modal is-active" data-testid="modal" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef}></div>
        <div className="modal__content">
          <p className="title title--h4">{title}</p>
          {content}
          <div className="modal__buttons">{buttons}</div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={closeModal}
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
