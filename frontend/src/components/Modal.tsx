import { Dispatch, ReactNode, SetStateAction } from 'react';

import IconClose from '@/icons/IconClose';

const Modal = ({ children, showModal, setShowModal }: {
  children: ReactNode, showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>
}) => {
  const closeModal = () => setShowModal(false);

  return (
    <div
      className={`${showModal || 'hidden'} fixed left-0 top-0 h-screen w-screen z-30 flex`}
      style={{ backgroundColor: 'rgb(0 0 0 / .8)' }}
      onClick={closeModal}
    >
      <section className="relative bg-white p-8 rounded-lg inline-block m-auto">
        {/* TODO -> Fazer com que largura e altura máximos fiquem de acordo com a tela e que crie barra de rolagem ao exceder */}
        <button
          className="absolute top-0 right-0 p-1 transition-all duration-300 hover:scale-110"
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
