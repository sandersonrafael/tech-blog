import { Area } from 'react-easy-crop';

const getCroppedImg = (image: string, croppedAreaPixels: Area): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Não foi possível obter o contexto 2d'));
        return;
      }

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      const base64 = canvas.toDataURL('image/jpeg');
      resolve(base64);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

export default getCroppedImg;
