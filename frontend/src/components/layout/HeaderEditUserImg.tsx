import { ChangeEventHandler, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import Modal from '../Modal';
import CropProfileImg from '../CropProfileImg';
import FormInput from '../forms/FormInput';
import Loading from '../Loading';

import UserContext from '@/contexts/UserContext';
import { Area } from 'react-easy-crop';
import getCroppedImg from '@/utils/getCroppedImg';
import firebase from '@/api/firebase';
import api from '@/api/api';
import User from '@/types/entities/User';
import UserDetails from '@/types/entities/UserDetails';
import PostsContext from '@/contexts/PostsContext';
import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';

type EditImgTypes = {
  showEdition: boolean;
  setShowEdition: Dispatch<SetStateAction<boolean>>;
};

const getJwt = () => localStorage.getItem('jwt') as string;

const HeaderEditUserImg = ({ showEdition, setShowEdition }: EditImgTypes) => {
  const { user, setUser } = useContext(UserContext);
  const { setPosts, setComments } = useContext(PostsContext);

  const [imageSrc, setImageSrc] = useState<string>('');
  const [fileValue, setFileValue] = useState<string>('');
  const [imgErrors, setImgErrors] = useState<string[]>([]);
  const [croppedArea, setCroppedArea] = useState<Area>({ x: 0, y: 0, height: 0, width: 0 });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileValue(e.target.value);
    const file = e.target.files && e.target.files[0];

    if (file && file.name.slice(-4) !== '.png' && file.name.slice(-4) !== '.jpg' && file.name.slice(-5) !== '.jpeg') {
      setImgErrors(['Formato de arquivo inválido. São aceitos somente arquivos png, jpg e jpeg']);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      resetAll();
    }
  };

  const handleCropimage = async () => {
    const image = await getCroppedImg(imageSrc, croppedArea);

    setLoading(true);
    try {
      const profileImg = await firebase.uploadImg(image);
      const response = await api.updateUser(null, null, profileImg, getJwt());

      if ((response as User).id) {
        setUser({ ...(user as UserDetails), ...response });

        const posts: Post[] = await api.getAllPosts();
        const comments: Comment[] = [];
        posts.forEach((post) => post.comments.forEach((comment) => comments.push(comment)));

        setPosts([...posts]);
        setComments([...comments]);
      }
    } finally {
      setLoading(false);
      setShowEdition(false);
    }
  };

  const resetAll = () => {
    setImageSrc('');
    setFileValue('');
    setImgErrors([]);
  };

  useEffect(() => resetAll(), [showEdition]);

  return (
    <Modal showModal={showEdition} setShowModal={setShowEdition}>
      {!imageSrc &&
        <FormInput
          title="Foto de Perfil"
          name="image"
          type="file"
          classInput="cursor-pointer"
          classLabel="cursor-pointer"
          value={fileValue}
          onChange={handleChangeFile}
          placeholder="Fazer uploa"
          errors={imgErrors || []}
          onClick={() => resetAll()}
        />
      }

      {imageSrc &&
        <CropProfileImg imageSrc={imageSrc} setCroppedArea={setCroppedArea} />
      }

      {imageSrc &&
        <div className="absolute bottom-5 left-0 right-0 text-white flex items-center justify-center gap-2">
          <button
            className="transition-all duration-300 rounded-md w-24 h-10 bg-blue-400 hover:bg-blue-500 flex
              items-center justify-center"
            onClick={handleCropimage}
          >
            {loading
              ? <Loading diameter={20} color="white" />
              : <span>Salvar</span>
            }
          </button>

          <button
            className="transition-all duration-300 rounded-md w-24 h-10 bg-white text-gray-700 hover:bg-gray-300 border hover:border-gray-600"
            onClick={() => resetAll()}
          >
            Cancelar
          </button>
        </div>
      }
    </Modal>
  );
};

export default HeaderEditUserImg;
