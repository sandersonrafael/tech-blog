// import UserContext from '@/contexts/UserContext';
// import { Dispatch, SetStateAction, useContext, useState } from 'react';
// import Modal from '../Modal';
// import CropProfileImg from '../CropProfileImg';
// import { Area } from 'react-easy-crop';

// type EditImgTypes = {
//   showEdition: boolean;
//   setShowEdition: Dispatch<SetStateAction<boolean>>;
// };

// const HeaderEditUserImg = ({ showEdition, setShowEdition }: EditImgTypes) => {
//   const { user, setUser } = useContext(UserContext);
//   const [imageSrc, setImageSrc] = useState<string>(user?.profileImg as string);
//   const [croppedArea, setCroppedArea] = useState<Area>({ x: 0, y: 0, height: 0, width: 0 });

//   return (
//     <Modal showModal={showEdition} setShowModal={setShowEdition}>
//       <CropProfileImg imageSrc={imageSrc} setCroppedArea={setCroppedArea} />
//     </Modal>
//   );
// };

// export default HeaderEditUserImg;
