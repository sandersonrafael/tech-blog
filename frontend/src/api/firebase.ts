import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

class Firebase {
  public async uploadImg(image: string): Promise<string> {
    const fileName: string = `${Date.now()}_${Math.round(Math.random() * 100000000)}`;
    const imgPath: string = `profile-imgs/${fileName}.jpg`;
    const storageRef = ref(storage, imgPath);

    await uploadString(storageRef, image, 'data_url');
    const downloadURL: string = await getDownloadURL(storageRef);

    return downloadURL;
  }
}

const firebase = new Firebase();

export default firebase;
