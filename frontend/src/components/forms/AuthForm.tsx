'use client';

import { FormEvent, useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';

import FormInput from './FormInput';
import validateForm from '@/utils/validateForm';

import { LoginErrors, RecoverPasswordErrors, RegistrationErrors } from '@/types/ValidationErrors';
import { LoginRequest, RecoverRequest, RegisterRequest } from '@/types/api/AuthRequests';
import { LoginServerError, LoginSuccess, LoginValidationErrors } from '@/types/api/AuthResponses';
import { RecoverServerError, RecoverSuccess, RecoverValidationErrors } from '@/types/api/AuthResponses';
import { RegisterServerError, RegisterSuccess, RegisterValidationErrors } from '@/types/api/AuthResponses';

import api from '@/api/api';
import UserContext from '@/contexts/UserContext';
import ProfileImageInput from './ProfileImageInput';
import Loading from '../Loading';

const registerDefault: RegisterRequest = { profileImg: '', email: '', firstName: '', lastName: '', password: '', repeatPassword: '' };
const loginDefault: LoginRequest = { email: '', password: '' };
const recoverDefault: RecoverRequest = { email: '' };

const AuthForm = ({ setShowMenu }: { setShowMenu?: Dispatch<SetStateAction<boolean>> }) => {
  const { updateUserData } = useContext(UserContext);

  const [formStyle, setFormStyle] = useState<'login' | 'register' | 'recover'>('login');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<LoginErrors | RegistrationErrors | RecoverPasswordErrors>({
    emailErrors: [],
    passwordErrors: [],
  });
  const [data, setData] = useState<LoginRequest | RegisterRequest | RecoverRequest>({ email: '', password: '' });
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    setData(
      formStyle === 'register' ? { ...registerDefault } : formStyle === 'login'
        ? { ...loginDefault } : { ...recoverDefault }
    );
    resetFields();
    setErrors({ emailErrors: [] });
  }, [formStyle]);

  const resetFields = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setErrors(err => {
      return {
        emailErrors: [],
        profileImgErrors: (err as RegistrationErrors).profileImgErrors,
      };
    });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if ((errors as RegistrationErrors).profileImgErrors) return;
    resetFields();

    const validationErrors = formStyle === 'login'
      ? validateForm.login(data as LoginRequest)
      : formStyle === 'register'
        ? validateForm.register(data as RegisterRequest)
        : validateForm.recover(data as RecoverRequest);

    if (validationErrors !== null) return setErrors({ ...validationErrors });

    setLoadingSubmit(true);

    if (formStyle === 'register') {
      const register = await api.register(data as RegisterRequest);
      setLoadingSubmit(false);

      const { success } = register as RegisterSuccess;
      const { errors } = register as RegisterValidationErrors;
      const { error } = register as RegisterServerError;

      if (success) return setSuccessMessage(success);
      if (errors) return setErrors({ ...errors });
      if (error.message === 'E-mail indisponível para cadastro') return setErrorMessage(error.message);
      return setErrorMessage('Ocorreu um erro. Tente novamente mais tarde...');
    }

    if (formStyle === 'login') {
      const login = await api.login(data as LoginRequest);
      setLoadingSubmit(false);

      const { success } = login as LoginSuccess;
      const { errors } = login as LoginValidationErrors;
      const { error } = login as LoginServerError;

      if (success) {
        setSuccessMessage(success);
        await updateUserData();
        setShowMenu && setShowMenu(false);
        return;
      }
      if (errors) return setErrors({ ...errors });
      if (error.message === 'Credenciais inválidas') return setErrorMessage(error.message);
      return setErrorMessage('Ocorreu um erro. Tente novamente mais tarde...');
    }

    if (formStyle === 'recover') {
      const recover = await api.recoverRequest(data as RecoverRequest);
      setLoadingSubmit(false);

      const { success } = recover as RecoverSuccess;
      const { errors } = recover as RecoverValidationErrors;
      const { error } = recover as RecoverServerError;

      if (success) return setSuccessMessage(success);
      if (errors) return setErrors({ ...errors });
      if (error.message === 'Usuário não encontrado') return setErrorMessage(error.message);
      return setErrorMessage('Ocorreu um erro. Tente novamente mais tarde...');
    }
  };

  return (
    <form
      className="flex flex-col gap-4 px-3 overflow-auto"
      onChange={resetFields}
      onSubmit={(e) => submit(e)}
    >
      <h1 className="font-bold text-xl mx-1 mt-0 mb-3">
        {formStyle === 'login' && 'Login'}
        {formStyle === 'register' && 'Cadastro'}
        {formStyle === 'recover' && 'Recuperação'}
      </h1>

      {formStyle === 'register' &&
        <ProfileImageInput
          errors={errors}
          setErrors={setErrors}
          setData={setData}
        />
      }

      {formStyle === 'register' && <>
        <FormInput
          title="Nome"
          name="firstName"
          type="text"
          placeholder="Digite seu nome"
          value={(data as RegisterRequest).firstName || ''}
          onChange={(e) => setData({ ...data, firstName: (e.target as HTMLInputElement).value })}
          errors={(errors as RegistrationErrors).firstNameErrors || []}
        />

        <FormInput
          title="Sobrenome"
          name="lastName"
          type="text"
          placeholder="Digite seu nome"
          value={(data as RegisterRequest).lastName || ''}
          onChange={(e) => setData({ ...data, lastName: (e.target as HTMLInputElement).value })}
          errors={(errors as RegistrationErrors).lastNameErrors || []}
        />
      </>}

      <FormInput
        title="E-mail"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        value={data.email}
        onChange={(e) => setData({ ...data, email: (e.target as HTMLInputElement).value })}
        errors={errors.emailErrors || []}
      />

      {formStyle !== 'recover' &&
        <FormInput
          title="Senha"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setData({ ...data, password: (e.target as HTMLInputElement).value })}
          value={(data as LoginRequest | RegisterRequest).password || ''}
          errors={(errors as LoginErrors | RegistrationErrors).passwordErrors || []}
        />
      }

      {formStyle === 'register' &&
        <FormInput
          title="Confirmação de senha"
          name="repeatPassword"
          type="password"
          placeholder="Repita sua senha"
          onChange={(e) => setData({ ...data, repeatPassword: (e.target as HTMLInputElement).value })}
          value={(data as RegisterRequest).repeatPassword || ''}
          errors={(errors as RegistrationErrors).repeatPasswordErrors || []}
        />
      }

      {formStyle === 'login' &&
        <button
          className="ml-auto flex w-fit text-blue-400 font-bold hover:opacity-80"
          onClick={() => setFormStyle('recover')}
          type="button"
        >
          Esqueceu sua senha?
        </button>
      }

      {successMessage && <p className="text-center text-sm text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}

      <button
        className="bg-blue-400 rounded-md p-3 text-white flex justify-center items-center
          hover:opacity-90 font-medium active:opacity-100"
        type="submit"
      >
        {loadingSubmit
          ? <Loading diameter={20} color="white" />
          : <span>
            {formStyle === 'login' && 'Entrar'}
            {formStyle === 'register' && 'Registrar-se'}
            {formStyle === 'recover' && 'Enviar e-mail'}
          </span>
        }
      </button>

      <div className="text-center">
        {formStyle === 'login' && 'Novo usuário? '}
        {formStyle === 'recover' && 'Lembrou sua senha? '}
        {formStyle === 'register' && 'Já possui uma conta? '}

        <button
          className="inline-block text-blue-400 font-bold hover:opacity-80"
          onClick={() => setFormStyle(formStyle === 'login' ? 'register' : 'login')}
          type="button"
        >
          {formStyle === 'login' && 'Registre-se'}
          {formStyle !== 'login' && 'Faça login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
