import { Dispatch, ReactNode, SetStateAction } from 'react';

import Modal from './Modal';

type ConfirmationTypes = {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  confirmAction: () => void;
  message?: string
  confirmMessage: string;
  confirmClass: string;
};

const Confirmation = ({ children, isOpen, setIsOpen, confirmAction, message, confirmMessage, confirmClass }: ConfirmationTypes) => {
  return(
    <Modal showModal={isOpen} setShowModal={setIsOpen}>
      <div className="flex flex-col w-full max-w-xs gap-6">
        {message &&
          <span className="font-medium text-md">{message}</span>
        }

        {children}

        <div className="w-full flex justify-between gap-3 text-sm">
          <button
            className={`transition-colors duration-300 rounded-md border border-red-500 flex
              items-center justify-center w-full h-10 ${confirmClass || ''}
            `}
            type="button"
            onClick={confirmAction}
          >
            <span>{confirmMessage}</span>
          </button>

          <button
            className="transition-colors duration-300 rounded-md border border-black
              flex items-center justify-center w-full h-10 hover:border-gray-400
            "
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirmation;
