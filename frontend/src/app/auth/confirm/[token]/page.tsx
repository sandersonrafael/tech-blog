'use client';

import { useParams } from 'next/navigation';

import UserConfirmationForm from '@/components/UserConfirmationForm';

const FirstLogin = () => {
  const token = useParams().token as string;

  return (
    <UserConfirmationForm formStyle="first-login" token={token} />
  );
};

export default FirstLogin;
