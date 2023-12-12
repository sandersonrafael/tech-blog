import { useRouter } from 'next/navigation';

type UserConfirmationtypes = {
  formType: 'register-confirmation' | 'password-recover' | 'unsubscribe-newsletter';
  token: string;
};
// TODO: Fazer as 3 páginas, de recover, confirmation e unsubscribe

const UserConfirmationForm = ({ formType, token }: UserConfirmationtypes) => {
  const { push } = useRouter();

  const submit = async () => {
    return push('/');
  };

  return (
    <div>ok</div>
  );
};

export default UserConfirmationForm;
