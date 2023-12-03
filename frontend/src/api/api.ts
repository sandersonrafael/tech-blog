import ApiError from '@/types/api/ApiError';
import { LoginServerError, LoginSuccess, LoginValidationErrors, RecoverServerError, RecoverSuccess, RecoverValidationErrors, RegisterServerError, RegisterSuccess, RegisterValidationErrors } from '@/types/api/AuthResponses';
import { LoginRequest, RecoverRequest, RegisterRequest } from '@/types/api/AuthRequests';
import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';

const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;

class Api {
  public async getAllPosts(): Promise<Post[]> {
    const res = await fetch(`${apiHost}/api/posts`);
    const data = await res.json() as Post[];

    const formattedData: Post[] = data.map((post) => {
      post.createdAt = new Date(post.createdAt);
      post.updatedAt = new Date(post.updatedAt);
      return post;
    });

    return formattedData;
  }

  public async getAllComments(): Promise<Comment[]> {
    const res = await fetch(`${apiHost}/api/comments`);
    const data = await res.json() as Comment[];

    const formattedData: Comment[] = data.map((comment) => {
      comment.createdAt = new Date(comment.createdAt);
      comment.updatedAt = new Date(comment.updatedAt);
      return comment;
    });

    return formattedData;
  }

  public async register(registerRequest: RegisterRequest):
      Promise<RegisterSuccess | RegisterValidationErrors | RegisterServerError> {
    delete registerRequest.repeatPassword;

    const res = await fetch(`${apiHost}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...registerRequest, profileImg: '' }), // TODO -> Remover esse profileImg e arrumar a imagem depois
    });

    if (res.status === 201) {
      return { success: 'Usuário cadastrado com sucesso e e-mail de confirmação enviado!' } as RegisterSuccess;
    }

    const resJson: RegisterValidationErrors | ApiError = await res.json();

    if (res.status === 400) {
      const errors = resJson;

      if ((errors as RegisterValidationErrors).errors) return errors as RegisterValidationErrors;
      return { error: errors } as RegisterServerError;
    }

    const error = resJson as ApiError;
    return { error };
  }

  public async login(loginRequest: LoginRequest):
      Promise<LoginSuccess | LoginValidationErrors | LoginServerError> {
    const res = await fetch(`${apiHost}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginRequest),
    });

    const resJson: { token: string } | LoginValidationErrors | ApiError = await res.json();

    if (res.status === 200) {
      const { token } = resJson as { token: string };
      localStorage.setItem('jwt', JSON.stringify(token));
      return { success: 'Login realizado com sucesso' };
    }

    if (res.status === 400) {
      const errors = resJson as LoginValidationErrors;
      return errors;
    }

    return { error: resJson } as LoginServerError;
  }

  public async recover(recoverRequest: RecoverRequest):
      Promise<RecoverSuccess | RecoverValidationErrors | RecoverServerError> {
    const res = await fetch(`${apiHost}/auth/recover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recoverRequest),
    });

    if (res.status === 200) return { success: 'E-mail enviado com instruções para a recuperação de senha' };

    const resJson: RecoverValidationErrors | ApiError = await res?.json();

    if (res.status === 400) {
      const errors = resJson as RecoverValidationErrors;
      return errors;
    }

    return { error: resJson } as RecoverServerError;
  }
}

const api = new Api();

export default api;
