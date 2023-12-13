import ApiError from '@/types/api/ApiError';
import { LoginServerError, LoginSuccess, LoginValidationErrors, NewPasswordServerError, NewPasswordSuccess, NewPasswordValidationErrors, RecoverServerError, RecoverSuccess, RecoverValidationErrors, RegisterServerError, RegisterSuccess, RegisterValidationErrors } from '@/types/api/AuthResponses';
import { LoginRequest, NewPasswordRequest, RecoverRequest, RegisterRequest } from '@/types/api/AuthRequests';
import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';
import UserDetails from '@/types/entities/UserDetails';
import { UserDetailsServerError } from '@/types/api/UserResponse';

const apiHost = process.env.NEXT_PUBLIC_API_DATABASE_HOST as string;

class Api {
  public async getAllPosts(): Promise<Post[]> {
    const res = await fetch(`${apiHost}/api/posts`);
    const data = await res.json() as Post[];
    return data;
  }

  public async getPost(postId: number): Promise<Post> {
    const res = await fetch(`${apiHost}/api/posts/${postId}`);
    const post = await res.json() as Post;
    return post;
  }

  public async likePost(postId: number, token: string): Promise<{ success: string } | { error: string }> {
    const res = await fetch(`${apiHost}/api/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (res.status === 204) return { success: 'Sucesso ao realizar a ação' };
    return { error: 'Erro na solicitação' };
  }

  public async getAllComments(): Promise<Comment[]> {
    const res = await fetch(`${apiHost}/api/comments`);
    const data = await res.json() as Comment[];
    return data;
  }

  public async createComment(postId: number, content: string, token: string): Promise<Comment | { error: string }> {
    const res = await fetch(`${apiHost}/api/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, content }),
    });

    const comment: Comment | ApiError = await res.json();

    if (res.status === 201) {
      return comment as Comment;
    }

    const { message: error } = comment as ApiError;
    if (error) return { error };

    return { error: 'Erro na solicitação' };
  }

  public async updateComment(commentId: number, content: string, token: string): Promise<{ success: string } | { error: string }> {
    const res = await fetch(`${apiHost}/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (res.status === 200) return { success: 'Sucesso ao realizar a ação' };
    return { error: 'Erro na solicitação' };
  }

  public async deleteComment(commentId: number, token: string): Promise<{ success: string } | { error: string }> {
    const res = await fetch(`${apiHost}/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (res.status === 204) return { success: 'Sucesso ao realizar a ação' };
    return { error: 'Erro na solicitação' };
  }

  public async likeComment(commentId: number, token: string): Promise<{ success: string } | { error: string }> {
    const res = await fetch(`${apiHost}/api/comments/like/${commentId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (res.status === 204) return { success: 'Sucesso ao realizar a ação' };
    return { error: 'Erro na solicitação' };
  }

  public async dislikeComment(commentId: number, token: string): Promise<{ success: string } | { error: string }> {
    const res = await fetch(`${apiHost}/api/comments/dislike/${commentId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (res.status === 204) return { success: 'Sucesso ao realizar a ação' };
    return { error: 'Erro na solicitação' };
  }

  public async register(registerRequest: RegisterRequest):
      Promise<RegisterSuccess | RegisterValidationErrors | RegisterServerError> {
    try {
      const req = { ...registerRequest };
      delete req.repeatPassword;

      const res = await fetch(`${apiHost}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...req }),
      });

      if (res.status === 201) {
        return { success: 'E-mail de confirmação enviado! Verifique sua caixa de entrada' } as RegisterSuccess;
      }

      const resJson: RegisterValidationErrors | ApiError = await res.json();

      if (res.status === 400) {
        const errors = resJson;

        if ((errors as RegisterValidationErrors).errors) return errors as RegisterValidationErrors;
        return { error: errors } as RegisterServerError;
      }

      const error = resJson as ApiError;
      return { error };
    } catch (e) {
      return { error: { message: 'Erro no servidor' } } as RegisterServerError;
    }
  }

  public async login(loginRequest: LoginRequest):
      Promise<LoginSuccess | LoginValidationErrors | LoginServerError> {
    try {
      const res = await fetch(`${apiHost}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginRequest),
      });

      const resJson: { token: string } | LoginValidationErrors | ApiError = await res.json();

      if (res.status === 200) {
        const { token } = resJson as { token: string };
        localStorage.setItem('jwt', token);
        return { success: 'Login realizado com sucesso' };
      }

      if (res.status === 400) {
        const errors = resJson as LoginValidationErrors;
        return errors;
      }

      return { error: resJson } as LoginServerError;
    } catch (e) {
      return { error: { message: 'Erro no servidor' } } as LoginServerError;
    }
  }

  public async firstLogin(firstLoginRequest: LoginRequest, confirmationToken: string):
      Promise<LoginSuccess | LoginValidationErrors | LoginServerError> {
    try {
      const res = await fetch(`${apiHost}/auth/first-login/${confirmationToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firstLoginRequest),
      });

      const resJson: { token: string } | LoginValidationErrors | ApiError = await res.json();

      if (res.status === 200) {
        const { token } = resJson as { token: string };
        localStorage.setItem('jwt', token);
        return { success: 'Login realizado com sucesso!' };
      }

      const { errors } = resJson as LoginValidationErrors;
      if (errors) return { errors };

      const { message } = resJson as ApiError;
      if (message) return { error: { message } } as LoginServerError;

      return { error: resJson } as LoginServerError;
    } catch(e) {
      return { error: { message: 'Erro no servidor' } } as LoginServerError;
    }
  }

  public async recoverRequest(recoverRequest: RecoverRequest):
      Promise<RecoverSuccess | RecoverValidationErrors | RecoverServerError> {
    try {
      const res = await fetch(`${apiHost}/auth/request-recover`, {
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
    } catch (e) {
      return { error: { message: 'Erro no servidor' } } as RecoverServerError;
    }
  }

  public async recoverPassword(newPasswordRequest: NewPasswordRequest, recoveryToken: string):
      Promise<NewPasswordSuccess | NewPasswordValidationErrors | NewPasswordServerError> {
    try {
      const request = { ...newPasswordRequest };
      delete request.repeatPassword;

      const res = await fetch(`${apiHost}/auth/recover/${recoveryToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const resJson: { token: string } | NewPasswordValidationErrors | ApiError = await res.json();

      if (res.status === 200) {
        const { token } = resJson as { token: string };
        localStorage.setItem('jwt', token);
        return { success: 'Senha alterada com sucesso!' };
      }

      const { errors } = resJson as NewPasswordValidationErrors;
      if (errors) return { errors };

      const { message } = resJson as ApiError;
      if (message) return { error: { message } } as NewPasswordServerError;

      return { error: resJson } as NewPasswordServerError;
    } catch(e) {
      return { error: { message: 'Erro no servidor' } } as NewPasswordServerError;
    }
  }

  public async getUserDetails(token: string): Promise<UserDetails | UserDetailsServerError> {
    try {
      const res = await fetch(`${apiHost}/api/users/details`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const resJson = await res.json();

      if (res.status === 200) {
        const userDetails = { ...resJson } as UserDetails;
        return userDetails;
      }

      return { error: resJson } as UserDetailsServerError;
    } catch (e) {
      return { error: { message: 'Erro no servidor' } } as UserDetailsServerError;
    }
  }

  public async newsletterSubscribe(email: string): Promise<{ success: string }> {
    await fetch(`${apiHost}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    return { success: 'Sucesso na operação' };
  }

  public async newsletterUnsubscribe(email: string): Promise<{ success: string }> {
    await fetch(`${apiHost}/api/newsletter`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    return { success: 'Sucesso na operação' };
  }
}

const api = new Api();

export default api;
