'use client';

import { FormEvent, useEffect, useState } from 'react';
import FormInput from './FormInput';
import validateForm from '@/utils/validateForm';
import { LoginErrors, RecoverPasswordErrors, RegistrationErrors } from '@/types/ValidationErrors';
import { LoginRequest, RecoverRequest, RegisterRequest } from '@/types/api/AuthRequests';
import api from '@/api/api';
import { RegisterServerError, RegisterSuccess, RegisterValidationErrors } from '@/types/api/AuthResponses';

// TODO: Fazer lógica para ao Submitar, ficar somente uma mensagem de sucesso. Caso seja erro dar somente alerta abaixo do botão de submit

const registerDefault: RegisterRequest = { email: '', firstName: '', lastName: '', password: '', repeatPassword: '' };
const loginDefault: LoginRequest = { email: '', password: '' };
const recoverDefault: RecoverRequest = { email: '' };

const AuthForm = () => {
  const [formStyle, setFormStyle] = useState<'login' | 'register' | 'recover'>('login');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<LoginErrors | RegistrationErrors | RecoverPasswordErrors>({
    emailErrors: [],
    passwordErrors: [],
  });
  const [data, setData] = useState<LoginRequest | RegisterRequest | RecoverRequest>({ email: '', password: '' });

  useEffect(() => {
    setData(
      formStyle === 'register' ? { ...registerDefault } : formStyle === 'login'
        ? { ...loginDefault } : { ...recoverDefault }
    );
    setErrors({ emailErrors: [] });
  }, [formStyle]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setErrors({ emailErrors: [] });

    const validationErrors = formStyle === 'login'
      ? validateForm.login(data as LoginRequest)
      : formStyle === 'register'
        ? validateForm.register(data as RegisterRequest)
        : validateForm.recover(data as RecoverRequest);

    if (validationErrors !== null) return setErrors({ ...validationErrors });

    if (formStyle === 'register') {
      const register = await api.register(data as RegisterRequest);

      const { success } = register as RegisterSuccess;
      const { errors } = register as RegisterValidationErrors;
      const { error } = register as RegisterServerError;

      if (success) return setSuccessMessage(success);
      if (errors) return setErrors({ ...errors });
      if (error.message === 'E-mail indisponível para cadastro') return setErrorMessage(error.message);
      return setErrorMessage('Erro no servidor. Tente novamente mais tarde');
    }
  };

  return (
    <form
      className="flex flex-col gap-4 px-3 overflow-auto"
      onChange={() => {setErrors({ emailErrors: [] }); setErrorMessage(''); setSuccessMessage('');}}
      onSubmit={(e) => submit(e)}
    >
      <h1 className="font-bold text-xl mx-1 mt-0 mb-3">
        {formStyle === 'login' && 'Login'}
        {formStyle === 'register' && 'Cadastro'}
        {formStyle === 'recover' && 'Recuperação'}
      </h1>

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
          placeholder="Digite sua senha"
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
        className="bg-blue-400 rounded-md p-3 text-white
          hover:opacity-90 font-medium active:opacity-100"
        type="submit"
      >
        {formStyle === 'login' && 'Entrar'}
        {formStyle === 'register' && 'Registrar-se'}
        {formStyle === 'recover' && 'Enviar e-mail'}
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
