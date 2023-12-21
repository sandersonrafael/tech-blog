import { useContext, useState } from 'react';
import Image from 'next/image';

import IconImgEdit from '@/icons/IconImgEdit';
import HeaderEditUserImg from './HeaderEditUserImg';

import UserContext from '@/contexts/UserContext';
import Confirmation from '../Confirmation';
import HeaderEditUserName from './HeaderEditUserName';

// TODO: Lógica para atualizar dados de usuário como nome, senha, etc

const HeaderUserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [showEditImage, setShowEditImage] = useState<boolean>(false);
  const [showEditName, setShowEditName] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <div className="overflow-y-auto flex flex-col items-center">
      <HeaderEditUserImg showEdition={showEditImage} setShowEdition={setShowEditImage} />

      <div className="relative w-fit">
        <button
          className="absolute bottom-0 right-0 transition-all duration-300 hover:scale-105"
          onClick={() => setShowEditImage(true)}
        >
          <IconImgEdit width={32} height={32} className="text-gray-600" />
        </button>

        <Image
          className="rounded-full mx-auto w-32 h-32"
          src={user?.profileImg || ''}
          alt={`${user?.firstName} ${user?.lastName}`}
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col my-4 gap-4 text-center w-full">
        <p className="overflow-auto">{user?.email}</p>

        <p className="font-semibold text-xl overflow-auto">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 w-full px-8 mt-6">
        <div className="w-full">
          <button
            className="bg-blue-400 w-full rounded p-2 text-center text-white transition-all duration-300 hover:bg-blue-500"
            type="button"
            onClick={() => setShowEditName(true)}
          >
            Alterar nome de usuário
          </button>

          <HeaderEditUserName showEditUserName={showEditName} setShowEditUserName={setShowEditName} />
        </div>

        <div className="w-full">
          <button
            className="bg-blue-400 w-full rounded p-2 text-center text-white transition-all duration-300 hover:bg-blue-500"
            type="button"
          >
            Alterar senha
          </button>
        </div>

        <button
          type="button"
          className="bg-red-400 p-2 rounded text-white transition-all duration-300 hover:bg-red-500 w-full"
          onClick={() => setIsLoggingOut(true)}
        >
          Fazer logout
        </button>

        <Confirmation
          confirmAction={handleLogout}
          confirmBtnClass="bg-red-500 text-white transition-colors duration-300 hover:bg-red-600"
          isOpen={isLoggingOut}
          setIsOpen={setIsLoggingOut}
          confirmMessage="Confirmar"
          message="Tem certeza que deseja realizar logout?"
        />
      </div>
    </div>
  );
};

export default HeaderUserDetails;
