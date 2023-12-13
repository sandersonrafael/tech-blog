import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import FormInput from './forms/FormInput';

import { RecoverRequest as UnsubscribeRequest, LoginRequest, NewPasswordRequest } from '@/types/api/AuthRequests';
import Loading from './Loading';
import Modal from './Modal';
import IconCheck from '@/icons/IconCheck';
import { LoginErrors, RecoverPasswordErrors as UnsubscribeErrors, NewPasswordErrors } from '@/types/ValidationErrors';
import validateForm from '@/utils/validateForm';
import api from '@/api/api';
import { LoginServerError, LoginSuccess, LoginValidationErrors, NewPasswordServerError, NewPasswordSuccess, NewPasswordValidationErrors } from '@/types/api/AuthResponses';
import UserContext from '@/contexts/UserContext';

type UserConfirmationtypes = {
  formStyle: 'first-login' | 'new-password' | 'newsletter-unsubscribe';
  token: string;
};

const UserConfirmationForm = ({ formStyle, token }: UserConfirmationtypes) => {
  const { updateUserData } = useContext(UserContext);

  const [data, setData] = useState<LoginRequest | NewPasswordRequest | UnsubscribeRequest>({ email: '' });
  const [errors, setErrors] = useState<LoginErrors | UnsubscribeErrors | NewPasswordErrors>({ emailErrors: [] });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState<boolean>(false);

  const [showUnsubscribeSuccess, setShowUnsubscribeSuccess] = useState<boolean>(false);

  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = formStyle === 'newsletter-unsubscribe'
      ? validateForm.recover(data as UnsubscribeRequest)
      : formStyle === 'first-login'
        ? validateForm.login(data as LoginRequest)
        : validateForm.newPassword(data as NewPasswordRequest);

    if (validationErrors !== null) return setErrors({ ...validationErrors });

    setLoading(true);

    if (formStyle === 'first-login') {
      const firstLogin = await api.firstLogin(data as LoginRequest, token);
      setLoading(false);

      const { success } = firstLogin as LoginSuccess;
      const { errors } = firstLogin as LoginValidationErrors;
      const { error } = firstLogin as LoginServerError;

      if (success) {
        setSuccessMessage(success);
        await updateUserData();
        return push('/');
      }

      if (errors) return setErrors({ ...errors });
      if (error) return setErrorMessage(error.message);
      return setErrorMessage('Erro no servidor');
    }

    if (formStyle === 'new-password') {
      const newPassword = await api.recoverPassword(data as NewPasswordRequest, token);
      setLoading(false);

      const { success } = newPassword as NewPasswordSuccess;
      const { errors } = newPassword as NewPasswordValidationErrors;
      const { error } = newPassword as NewPasswordServerError;

      if (success) {
        setSuccessMessage(success);
        await updateUserData();
        return push('/');
      }

      if (errors) return setErrors(errors);
      if (error) return setErrorMessage(error.message);
      return setErrorMessage('Erro no servidor');
    }

    if (formStyle === 'newsletter-unsubscribe') {
      await api.newsletterUnsubscribe(data.email);
      setLoading(false);
      setData({ email: '' });
      return setShowUnsubscribeSuccess(true);
    }
  };

  useEffect(() => {
    setErrors({ emailErrors: [] });
    setSuccessMessage('');
    setErrorMessage('');
  }, [data]);

  return (
    <>
      <Modal showModal={showUnsubscribeSuccess} setShowModal={setShowUnsubscribeSuccess}>
        <div className="flex flex-col gap-2 text-center text-sm">
          <p className="py-1">Inscrição da Newsletter cancelada com sucesso</p>
          <p className="py-1">Você não receberá mais e-mails com as novidades</p>
          <IconCheck width={48} height={48} color="red" className="mx-auto" />
        </div>
      </Modal>

      <form className="w-full max-w-xs mx-auto my-14 sm:my-24 px-2 flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-center mb-4 text-lg">
          {formStyle === 'first-login' && 'Primeiro acesso'}
          {formStyle === 'new-password' && 'Recuperação de senha'}
          {formStyle === 'newsletter-unsubscribe' && 'Cancelar assinatura de e-mail'}
        </h1>

        <FormInput
          type="email"
          name="email"
          title="E-mail"
          placeholder="Digite seu e-mail"
          value={data.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
          errors={errors.emailErrors || []}
        />

        {formStyle !== 'newsletter-unsubscribe' &&
          <FormInput
            title="Senha"
            type="password"
            name="password"
            placeholder={`Digite sua ${formStyle === 'first-login' ? 'senha' : 'nova senha'}`}
            value={(data as LoginRequest | NewPasswordRequest).password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })}
            errors={(errors as LoginErrors | NewPasswordErrors).passwordErrors || []}
          />
        }

        {formStyle === 'new-password' &&
          <FormInput
            title="Confirmação de senha"
            type="password"
            name="repeatPassword"
            placeholder="Repita sua senha"
            value={(data as NewPasswordRequest).repeatPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, repeatPassword: e.target.value })}
            errors={(errors as NewPasswordErrors).repeatPasswordErrors || []}
          />
        }

        <button
          className="w-full h-11 bg-blue-400 text-white rounded-md transition-all
          duration-300 hover:bg-blue-500 flex items-center justify-center
        "
          type="submit"
        >
          {!loading &&
          <span>Enviar</span>
          }

          {loading &&
          <Loading color="white" diameter={18} />
          }
        </button>

        {successMessage && <p className="text-center text-sm text-green-600">{successMessage}</p>}

        {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}
      </form>
    </>

  );
};

export default UserConfirmationForm;
