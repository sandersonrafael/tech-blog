import UserContextTypes from '@/types/contexts/UserContextTypes';
import { createContext } from 'react';

const UserContext = createContext<UserContextTypes>({
  user: null,
  setUser: () => null,
  updateUserData: async () => {},
});

export default UserContext;
