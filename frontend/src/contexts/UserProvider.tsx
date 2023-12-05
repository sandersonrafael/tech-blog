'use client';

import { ReactNode, useEffect, useState } from 'react';
import UserContext from './UserContext';
import UserDetails from '@/types/entities/UserDetails';
import UserContextTypes from '@/types/contexts/UserContextTypes';
import api from '@/api/api';
import { UserDetailsServerError } from '@/types/api/UserResponse';

const getJwt = (): string | null => localStorage.getItem('jwt');

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);

  const updateUserData = async () => {
    const jwt = getJwt();
    if (!jwt) return;

    const apiResponse = await api.getUserDetails(jwt);
    const { error } = apiResponse as UserDetailsServerError;
    if (error) return;

    setUser({ ...(apiResponse as UserDetails) });
  };

  useEffect(() => {
    const loadUser = async () => await updateUserData();
    loadUser();
  }, []);

  const value: UserContextTypes = {
    user,
    setUser,
    updateUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
