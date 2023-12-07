import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

type CropperTypes = {
  imageSrc: string;
  setCroppedArea: Dispatch<SetStateAction<Area>>;
};

const CropProfileImg = ({ imageSrc, setCroppedArea }: CropperTypes) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, [setCroppedArea]);

  return (
    <Cropper
      image={imageSrc}
      style={{
        containerStyle: { position: 'relative', backgroundColor: 'white', minWidth: 300, minHeight: 300 },
        mediaStyle: { maxWidth: '100vw', maxHeight: '100vh' },
      }}
      crop={crop}
      zoom={zoom}
      aspect={1 / 1}
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onCropComplete={onCropComplete}
      objectFit="cover"
    />
  );
};

export default CropProfileImg;
