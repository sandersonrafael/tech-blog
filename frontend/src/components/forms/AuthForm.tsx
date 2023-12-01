'use client';

import { FormEvent, useEffect, useState } from 'react';
import FormInput from './FormInput';
import validateForm from '@/utils/validateForm';
import { LoginErrors, RecoverPasswordErrors, RegistrationErrors } from '@/types/ValidationErrors';
import { UserLogin, UserRecover, UserRegister } from '@/types/AuthenticationTypes';
import api from '@/api/api';

// TODO: Fazer lógica para ao Submitar, ficar somente uma mensagem de sucesso. Caso seja erro dar somente alerta abaixo do botão de submit

const registerDefault: UserRegister = { email: '', firstName: '', lastName: '', password: '', repeatPassword: '' };
const loginDefault: UserLogin = { email: '', password: '' };
const recoverDefault: UserRecover = { email: '' };

const AuthForm = () => {
  const [formStyle, setFormStyle] = useState<'login' | 'register' | 'recover'>('login');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errors, setErrors] = useState<LoginErrors | RegistrationErrors | RecoverPasswordErrors>({
    emailErrors: [],
    passwordErrors: [],
  });
  const [data, setData] = useState<UserLogin | UserRegister | UserRecover>({ email: '', password: '' });

  useEffect(() => {
    setData(
      formStyle === 'register' ? { ...registerDefault } : formStyle === 'login'
        ? { ...loginDefault } : { ...recoverDefault }
    );
    setErrors({ emailErrors: [] });
  }, [formStyle]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = formStyle === 'login'
      ? validateForm.login(data as UserLogin)
      : formStyle === 'register'
        ? validateForm.register(data as UserRegister)
        : validateForm.recover(data as UserRecover);

    if (validationErrors !== null) return setErrors({ ...validationErrors });

    if (formStyle === 'register') {
      const register = await api.register(data as UserRegister);

      if (typeof register === 'string') {
        setSuccessMessage(register);
        setData({ ...registerDefault });
      }
      const newErrors = (register as { errors: RegistrationErrors }).errors;
      return setErrors({ ...newErrors });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 px-3 overflow-auto"
      onChange={() => setErrors({ emailErrors: [] })}
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
          value={(data as UserRegister).firstName || ''}
          onChange={(e) => setData({ ...data, firstName: (e.target as HTMLInputElement).value })}
          errors={(errors as RegistrationErrors).firstNameErrors || []}
        />

        <FormInput
          title="Sobrenome"
          name="lastName"
          type="text"
          placeholder="Digite seu nome"
          value={(data as UserRegister).lastName || ''}
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
          value={(data as UserLogin | UserRegister).password || ''}
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
          value={(data as UserRegister).repeatPassword || ''}
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
