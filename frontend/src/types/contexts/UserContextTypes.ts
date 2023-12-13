import { Dispatch } from 'react';
import UserDetails from '../entities/UserDetails';

type UserContextTypes = {
  user: UserDetails | null;
  setUser: Dispatch<React.SetStateAction<UserDetails | null>>;
  updateUserData: () => Promise<void>;
};

export default UserContextTypes;
