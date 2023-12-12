/* import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import FormInput from './forms/FormInput';

import { RecoverRequest as UnsubscribeRequest, LoginRequest, NewPasswordRequest } from '@/types/api/AuthRequests';
import Loading from './Loading';
import Modal from './Modal';
import IconCheck from '@/icons/IconCheck';
import { LoginErrors, RecoverPasswordErrors as UnsubscribeErrors, NewPasswordErrors, RecoverPasswordErrors } from '@/types/ValidationErrors';
import validateForm from '@/utils/validateForm';

type UserConfirmationtypes = {
  formStyle: 'first-login' | 'password-recover' | 'newsletter-unsubscribe';
  token: string;
};
// TODO: Fazer as 3 páginas, de recover, confirmation e unsubscribe
// /newsletter/unsubscribe

const UserConfirmationForm = ({ formStyle, token }: UserConfirmationtypes) => {
  const [data, setData] = useState<LoginRequest | NewPasswordRequest | UnsubscribeRequest>({ email: '' });
  const [errors, setErrors] = useState<LoginErrors | UnsubscribeErrors | NewPasswordErrors>({ emailErrors: [] });

  const [loading, setLoading] = useState<boolean>(false);

  const [showUnsubscribeConfirm, setShowUnsubscribeConfirm] = useState<boolean>(false);

  const { push } = useRouter();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = formStyle === 'newsletter-unsubscribe'
      ? validateForm.recover(data as UnsubscribeRequest)
      : formStyle === 'first-login'
        ? validateForm.login(data as LoginRequest)
        : validateForm.newPassword(data as NewPasswordRequest);

    if (validateForm !== null) return setErrors({ ...validationErrors });

    const validationErrors = formStyle === 'login'
      ? validateForm.login(data as LoginRequest)
      : formStyle === 'register'
        ? validateForm.register(data as RegisterRequest)
        : validateForm.recover(data as RecoverRequest);

    if (validationErrors !== null) return setErrors({ ...validationErrors });

    if (formStyle === 'newsletter-unsubscribe') {
      const unsubscribeData = data as UnsubscribeRequest;
    }
  };

  useEffect(() => setErrors({ emailErrors: [] }), [data]);

  return (
    <>
      <Modal showModal={showUnsubscribeConfirm} setShowModal={setShowUnsubscribeConfirm}>
        <div className="flex flex-col gap-2 text-center text-sm">
          <p className="py-1">Inscrição da Newsletter cancelada com sucesso</p>
          <p className="py-1">Você não receberá mais e-mails com as novidades</p>
          <IconCheck width={48} height={48} color="green" className="mx-auto" />
        </div>
      </Modal>

      <form className="w-full max-w-xs mx-auto my-14 sm:my-24 px-2 flex flex-col gap-3" onChange={submit}>
        <h1 className="font-semibold text-center mb-4 text-lg">
          {formStyle === 'first-login' && 'Primeiro acesso'}
          {formStyle === 'password-recover' && 'Recuperação de senha'}
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
            value={data.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
            errors={(errors as LoginErrors | NewPasswordErrors).passwordErrors || []}
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
      </form>
    </>

  );
};

export default UserConfirmationForm;
 */
