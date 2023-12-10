import { Dispatch, SetStateAction, ChangeEvent, useState, MouseEventHandler } from 'react';

import { LoginErrors, RecoverPasswordErrors, RegistrationErrors } from '@/types/ValidationErrors';
import { LoginRequest, RecoverRequest, RegisterRequest } from '@/types/api/AuthRequests';
import FormInput from './FormInput';
import Modal from '../Modal';
import CropProfileImg from '../CropProfileImg';
import Image from 'next/image';
import { Area } from 'react-easy-crop';
import getCroppedImg from '@/utils/getCroppedImg';
import firebase from '@/api/firebase';
import Loading from '../Loading';

type InputImgTypes = {
  setData: Dispatch<SetStateAction<RegisterRequest | LoginRequest | RecoverRequest>>;
  setErrors: Dispatch<SetStateAction<LoginErrors | RegistrationErrors | RecoverPasswordErrors>>;
  errors: LoginErrors | RegistrationErrors | RecoverPasswordErrors;
};

const ProfileImageInput = ({ setData, errors, setErrors }: InputImgTypes) => {
  const [imgBase64, setImgBase64] = useState<string>('');
  const [croppedImage, setCroppedImage] = useState<string>('');
  const [croppingImg, setCroppingImg] = useState<boolean>(false);
  const [croppedArea, setCroppedArea] = useState<Area>({ x: 0, y: 0, height: 0, width: 0 });
  const [value, setValue] = useState<string>('');
  const [loadingCropImage, setLoadingCropImage] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const file = e.target.files && e.target.files[0];

    if (file && file.name.slice(-4) !== '.png' && file.name.slice(-4) !== '.jpg' && file.name.slice(-5) !== '.jpeg') {
      setErrors({ ...errors, profileImgErrors: ['Formato de arquivo inválido. São aceitos somente arquivos png, jpg e jpeg'] });
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgBase64(reader.result as string);
      reader.readAsDataURL(file);
      setCroppingImg(true);
    } else {
      setImgBase64('');
      setCroppedImage('');
    }
  };

  const handleCropImage = async () => {
    const image = await getCroppedImg(imgBase64, croppedArea);
    setCroppedImage(image);

    setLoadingCropImage(true);
    const imageUrl:string = await firebase.uploadImg(image);
    setLoadingCropImage(false);

    setData(data => {
      return { ...data, profileImg: imageUrl };
    });
    setCroppingImg(false);
  };

  const handleFileClick: MouseEventHandler = () => resetFile();

  const resetFile = () => {
    setValue('');
    setCroppedImage('');
    setImgBase64('');
    setErrors({ emailErrors: [] });
    setData((data) => { return { ...data, profileImg: '' }; });
  };

  return(
    <>
      <div className="flex">
        <FormInput
          errors={(errors as RegistrationErrors).profileImgErrors || []}
          name="img"
          onChange={handleFileChange}
          placeholder=""
          title="Foto de perfil (opcional)"
          type="file"
          onClick={handleFileClick}
          value={value}
        />
        {croppedImage &&
          <Image
            src={croppedImage}
            alt="Profile Image"
            width={40}
            height={40}
            className="w-10 h-10 ml-2 rounded-full m-auto bg-cover cursor-pointer"
            onClick={() => setCroppingImg(true)}
          />
        }
      </div>

      <Modal showModal={croppingImg} setShowModal={setCroppingImg} className="flex flex-col" closeFunction={resetFile}>
        <div className="relative">
          <CropProfileImg imageSrc={imgBase64} setCroppedArea={setCroppedArea} />
          <button
            className="
              absolute bottom-0 left-0 right-0 mx-auto mb-1 bg-blue-400 text-white w-28 h-10 rounded-md
              hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center
            "
            onClick={handleCropImage}
            type="button"
          >
            {loadingCropImage
              ? <Loading diameter={18} color="white" />
              : <span>Selecionar</span>
            }
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileImageInput;
