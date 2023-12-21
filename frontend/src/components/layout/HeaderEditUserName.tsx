import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import FormInput from '../forms/FormInput';
import UserContext from '@/contexts/UserContext';
import Loading from '../Loading';
import validations from '@/utils/validations';
import api from '@/api/api';
import { UserServerError, UserValidationErrors } from '@/types/api/UserResponses';
import User from '@/types/entities/User';
import PostsContext from '@/contexts/PostsContext';
import UserDetails from '@/types/entities/UserDetails';
import Comment from '@/types/entities/Comment';

type HeaderEditNameTypes = {
  className?: string;
  showEditUserName: boolean;
  setShowEditUserName: Dispatch<SetStateAction<boolean>>;
};

const getJwt = () => localStorage.getItem('jwt') as string;

const HeaderEditUserName = ({ className, showEditUserName, setShowEditUserName }: HeaderEditNameTypes) => {
  const { user, setUser } = useContext(UserContext);
  const { setPosts, setComments } = useContext(PostsContext);

  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [firstNameErrors, setFirstNameErrors] = useState<string[]>([]);
  const [lastNameErrors, setLastNameErrors] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string>('');
  const [apiSuccess, setApiSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const clearErrors = () => {
    setFirstNameErrors([]);
    setLastNameErrors([]);
    setApiSuccess('');
    setApiError('');
  };

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (firstName === user?.firstName && lastName === user.lastName) {
      return setShowEditUserName(false);
    }

    const firstNameValidationErrors = validations.name(firstName, 'Nome');
    const lastNameValidationErrors = validations.name(lastName, 'Sobrenome');

    if (firstNameValidationErrors.length > 0 || lastNameValidationErrors.length > 0) {
      setFirstNameErrors(firstNameValidationErrors);
      setLastNameErrors(lastNameValidationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await api.updateUser(firstName, lastName, null, getJwt());

      const apiUser = response as User;
      const { errors } = response as UserValidationErrors;
      const { error } = response as UserServerError;

      if (apiUser.firstName && apiUser.lastName) {
        setUser({
          ...(user as UserDetails),
          firstName: apiUser.firstName,
          lastName: apiUser.lastName,
        });

        const posts = await api.getAllPosts();
        const comments: Comment[] = [];
        posts.forEach((post) => post.comments.forEach((comment) => comments.push(comment)));

        setPosts([...posts]);
        setComments([...comments]);
        setApiSuccess('Operação realizada com sucesso');
        setShowEditUserName(false);
      }

      if (errors) {
        setFirstNameErrors(errors.firstNameErrors);
        setLastNameErrors(errors.lastNameErrors);
      }

      if (error) {
        setApiError(error.message || 'Erro no servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setFirstNameErrors([]);
    setLastNameErrors([]);
    setLoading(false);
    setApiSuccess('');
    setApiError('');
  }, [showEditUserName, user?.firstName, user?.lastName]);

  return (
    <Modal showModal={showEditUserName} setShowModal={setShowEditUserName}>
      <form className={`w-64 flex flex-col gap-4 ${className}`} onSubmit={submit} onChange={clearErrors}>
        <h1 className="text-center font-medium text-lg">Atualizar nome e sobrenome</h1>

        <FormInput
          title="Nome"
          name="firstName"
          type="text"
          placeholder="Digite seu nome"
          classLabel="h-10 py-2 flex"
          classInput="w-32"
          value={firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          errors={firstNameErrors || []}
        />

        <FormInput
          title="Sobrenome"
          name="lastName"
          type="text"
          placeholder="Digite seu sobrenome"
          classLabel="h-10 py-2 flex"
          value={lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          errors={lastNameErrors || []}
        />

        <button
          type="submit"
          className="bg-blue-400 rounded-lg h-10 text-white transition-all duration-300 hover:bg-blue-500
            flex items-center justify-center"
        >
          {loading
            ? <Loading diameter={20} color="white" />
            : <span>Atualizar</span>
          }
        </button>

        {apiError &&
          <span className="text-red-500 text-sm text-center">{apiError}</span>
        }

        {apiSuccess &&
          <span className="text-green-500 text-sm text-center">{apiSuccess}</span>
        }
      </form>
    </Modal>
  );
};

export default HeaderEditUserName;
