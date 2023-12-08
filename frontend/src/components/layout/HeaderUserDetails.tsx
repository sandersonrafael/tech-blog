import UserContext from '@/contexts/UserContext';
import Image from 'next/image';
import { useContext } from 'react';

// TODO: Lógica para atualizar dados de usuário como nome, senha, etc

const HeaderUserDetails = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <div className="overflow-y-auto flex flex-col">
      <button
        type="button"
        className="ml-auto mr-2 flex bg-gray-500 px-3 py-1 rounded-md text-white transition-all duration-300 hover:opacity-90"
        onClick={handleLogout}
      >Sair</button>
      <Image
        className="rounded-full mx-auto my-1 w-32 h-32"
        src={user?.profileImg || ''}
        alt={`${user?.firstName} ${user?.lastName}`}
        width={400}
        height={400}
      />

      {(user?.firstName && user.lastName) &&
        <p className="text-center font-semibold text-xl my-3">{`${user.firstName} ${user.lastName}`}</p>
      }

      <p className="rounded-md border my-2 p-3 border-gray-600">POSTS QUE GOSTEI - EXPANSÍVEL</p>
      <p className="rounded-md border my-2 p-3 border-gray-600">MEUS COMENTÁRIOS - EXPANSÍVEL</p>
      <p className="rounded-md border my-2 p-3 border-gray-600">COMENTÁRIOS QUE GOSTEI - EXPANSÍVEL</p>
    </div>
  );
};

export default HeaderUserDetails;
