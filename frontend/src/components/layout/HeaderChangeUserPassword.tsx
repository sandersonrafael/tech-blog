import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import FormInput from '../forms/FormInput';
import UserContext from '@/contexts/UserContext';
import Loading from '../Loading';
import validations from '@/utils/validations';
import api from '@/api/api';
import { ChangePasswordServerError, ChangePasswordSuccess, ChangePasswordValidationErrors } from '@/types/api/AuthResponses';

type HeaderEditPasswordTypes = {
  className?: string;
  showChangeUserPassword: boolean;
  setShowChangeUserPassword: Dispatch<SetStateAction<boolean>>;
};

const getJwt = () => localStorage.getItem('jwt') as string;

const HeaderChangeUserPassword = ({ className, showChangeUserPassword, setShowChangeUserPassword }: HeaderEditPasswordTypes) => {
  const { user, updateUserData } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
  const [oldPasswordErrors, setOldPasswordErrors] = useState<string[]>([]);
  const [newPasswordErrors, setNewPasswordErrors] = useState<string[]>([]);
  const [repeatNewPasswordErrors, setRepeatNewPasswordErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const clearMessages = () => {
    setOldPasswordErrors([]);
    setNewPasswordErrors([]);
    setRepeatNewPasswordErrors([]);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const clearFiels = () => {
    setOldPassword('');
    setNewPassword('');
    setRepeatNewPassword('');
  };

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    clearMessages();

    const oldPasswordValidationErrors = validations.password(oldPassword, 'Senha antiga');
    const newPasswordValidationErrors = validations.password(newPassword, 'Nova senha');
    const repeatValidationErrors = validations.confirmPassword(newPassword, repeatNewPassword, 'Senha', 'Repetição de senha');

    if (
      oldPasswordValidationErrors.length > 0
      || newPasswordValidationErrors.length > 0
      || repeatValidationErrors.length > 0
    ) {
      setOldPasswordErrors(oldPasswordValidationErrors);
      setNewPasswordErrors(newPasswordValidationErrors);
      setRepeatNewPasswordErrors(repeatValidationErrors);
      return;
    }

    if (oldPassword === newPassword) return setErrorMessage('Nova senha e senha antiga não podem ser iguais');

    setLoading(true);
    try {
      const response = await api.changePassword({ email: user?.email || '', oldPassword, newPassword }, getJwt());

      const { success } = response as ChangePasswordSuccess;
      const { errors } = response as ChangePasswordValidationErrors;
      const { error } = response as ChangePasswordServerError;

      if (success) {
        await updateUserData();
        clearFiels();
        setSuccessMessage(success);
      }

      if (errors) {
        setOldPasswordErrors(errors.oldPasswordErrors);
        setNewPasswordErrors(errors.newPasswordErrors);
      }

      if (error) {
        setErrorMessage(error.message || 'Erro no servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearFiels();
    clearMessages();
    setLoading(false);
  }, [showChangeUserPassword]);

  return (
    <Modal showModal={showChangeUserPassword} setShowModal={setShowChangeUserPassword}>
      <form className={`w-64 flex flex-col gap-4 ${className}`} onSubmit={submit} onChange={clearMessages}>
        <h1 className="text-center font-medium text-lg">Alterar senha</h1>

        <FormInput
          title="Senha Antiga"
          name="oldPassword"
          type="password"
          placeholder="Digite sua senha antiga"
          classLabel="h-10 py-2 flex"
          classInput="w-32"
          value={oldPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
          errors={oldPasswordErrors || []}
        />

        <FormInput
          title="Nova Senha"
          name="newPassword"
          type="password"
          placeholder="Digite seu nova senha"
          classLabel="h-10 py-2 flex"
          value={newPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          errors={newPasswordErrors || []}
        />

        <FormInput
          title="Confirmar Nova Senha"
          name="newPassword"
          type="password"
          placeholder="Confirme sua nova senha"
          classLabel="h-10 py-2 flex"
          value={repeatNewPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRepeatNewPassword(e.target.value)}
          errors={repeatNewPasswordErrors || []}
        />

        <button
          type="submit"
          className="bg-blue-400 rounded-lg h-10 text-white transition-all duration-300 hover:bg-blue-500
            flex items-center justify-center"
        >
          {loading
            ? <Loading diameter={20} color="white" />
            : <span>Alterar</span>
          }
        </button>

        {errorMessage &&
          <span className="text-red-500 text-xs text-center">{errorMessage}</span>
        }

        {successMessage &&
          <span className="text-green-500 text-xs text-center">{successMessage}</span>
        }
      </form>
    </Modal>
  );
};

export default HeaderChangeUserPassword;
