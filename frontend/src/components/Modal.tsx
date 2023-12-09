import { Dispatch, ReactNode, SetStateAction, useRef, MouseEvent } from 'react';

import IconClose from '@/icons/IconClose';

const Modal = ({ children, showModal, setShowModal, className = '', closeFunction }: {
  children: ReactNode,
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>, className?: string,
  closeFunction?: () => void,
}) => {
  const backgroundDiv = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    closeFunction && closeFunction();
    setShowModal(false);
  };
  const clickOutside = (e: MouseEvent) => (e.target === backgroundDiv.current) && closeModal();

  return (
    <div
      className={`${showModal || 'hidden'} fixed left-0 top-0 right-0 bottom-0 z-30 flex content-center items-center p-2 ${className}`}
      style={{ backgroundColor: 'rgb(0 0 0 / .8)' }}
      onClick={clickOutside}
      ref={backgroundDiv}
    >
      <section className="relative bg-white m-auto p-8 rounded-lg overflow-auto max-w-full max-h-full flex content-center items-center">
        <button
          type="button"
          className="absolute top-0 right-0 p-1 transition-all duration-300 hover:scale-110 m-1"
          onClick={closeModal}
        >
          <IconClose width={24} height={24} />
        </button>

        {children}
      </section>
    </div>
  );
};

export default Modal;
