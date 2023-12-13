'use client';

import UserConfirmationForm from '@/components/UserConfirmationForm';
import { useParams } from 'next/navigation';

const RecoverPassword = () => {
  const token = useParams().token as string;

  return (
    <UserConfirmationForm formStyle="new-password" token={token}/>
  );
};

export default RecoverPassword;
