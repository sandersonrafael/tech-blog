import UserContext from '@/contexts/UserContext';
import IconImgEdit from '@/icons/IconImgEdit';
import Image from 'next/image';
import { useContext/*, useState */ } from 'react';
// import HeaderEditUserImg from './HeaderEditUserImg';

// TODO: Lógica para atualizar dados de usuário como nome, senha, etc

const HeaderUserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  // const [showEditImage, setShowEditImage] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <div className="overflow-y-auto flex flex-col items-center">
      <button
        type="button"
        className="ml-auto mr-2 flex bg-gray-500 px-3 py-1 rounded-md text-white transition-all duration-300 hover:opacity-90"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* <HeaderEditUserImg showEdition={showEditImage} setShowEdition={setShowEditImage} /> */}

      <div className="relative w-fit mt-4">
        <button className="absolute bottom-0 right-0">
          <IconImgEdit width={32} height={32} className="text-gray-800" />
        </button>

        <Image
          className="rounded-full mx-auto w-32 h-32"
          src={user?.profileImg || ''}
          alt={`${user?.firstName} ${user?.lastName}`}
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col my-4 gap-4 text-center">
        <p className="overflow-auto">{user?.email}</p>

        <p className="font-semibold text-xl overflow-auto">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>
    </div>
  );
};

export default HeaderUserDetails;
