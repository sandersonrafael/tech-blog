'use client';

import { FormEvent, useState } from 'react';
import FormInput from './FormInput';
// TODO: Fazer lógica para ao Submitar, ficar somente uma mensagem de sucesso ou erro e um botão de tentar novamente
const AuthForm = () => {
  const [formStyle, setFormStyle] = useState<'login' | 'register' | 'recover'>('login');

  const submit = (e: FormEvent) => {
    (e.target as HTMLFormElement).scrollTo({ top: 10000, behavior: 'smooth' });
    e.preventDefault();

  };

  return (
    <form onSubmit={(e) => submit(e)} className="flex flex-col gap-4 px-3 overflow-auto">
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
          errors={[]}
        />
        <FormInput
          title="Sobrenome"
          name="lastName"
          type="text"
          placeholder="Digite seu nome"
          errors={[]}
        />
      </>}

      <FormInput
        title="E-mail"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        errors={[]}
      />

      {formStyle !== 'recover' &&
        <FormInput title="Senha"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          errors={[]}
        />
      }

      {formStyle === 'register' &&
        <FormInput
          title="Confirmação de senha"
          name="repeatPassword"
          type="password"
          placeholder="Digite sua senha"
          errors={[]}
        />
      }

      {formStyle === 'login' &&
        <button
          className="ml-auto flex w-fit text-blue-400 font-bold hover:opacity-80"
          onClick={() => setFormStyle('recover')}
        >
          Esqueceu sua senha?
        </button>
      }

      <button className="bg-blue-400 rounded-md p-3 text-white hover:opacity-90 font-medium active:opacity-100">
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
        >
          {formStyle === 'login' && 'Registre-se'}
          {formStyle !== 'login' && 'Faça login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
