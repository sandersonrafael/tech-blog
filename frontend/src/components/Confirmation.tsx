import { Dispatch, ReactNode, SetStateAction } from 'react';

import Modal from './Modal';
import Loading from './Loading';

type ConfirmationTypes = {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  confirmAction: () => void;
  message?: string
  confirmMessage: string;
  confirmBtnClass: string;
  loadingConfirmation?: boolean;
  loadingColor?: string;
  loadingDiameter?: number;
};

const Confirmation = ({
  children,
  isOpen,
  setIsOpen,
  confirmAction,
  message,
  confirmMessage,
  confirmBtnClass,
  loadingConfirmation = false,
  loadingColor,
  loadingDiameter,
}: ConfirmationTypes) => {
  return(
    <Modal showModal={isOpen} setShowModal={setIsOpen} className="w-full">
      <div className="flex flex-col w-80 gap-6">
        {message &&
          <span className="font-medium text-md">{message}</span>
        }

        {children}

        <div className="w-full flex justify-between gap-3 text-sm">
          <button
            className={`transition-colors duration-300 rounded-md flex
              items-center justify-center w-full h-10 ${confirmBtnClass || ''}
            `}
            type="button"
            onClick={confirmAction}
          >
            {loadingConfirmation
              ? <Loading diameter={loadingDiameter} color={loadingColor} />
              : <span>{confirmMessage}</span>
            }
          </button>

          <button
            className="transition-colors duration-300 rounded-md border border-black
              flex items-center justify-center w-full h-10 hover:border-gray-400 hover:text-gray-400
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
