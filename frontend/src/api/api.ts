import ApiError from '@/types/api/ApiError';
import { RegisterServerError, RegisterSuccess, RegisterValidationErrors } from '@/types/api/AuthResponses';
import { RegisterRequest } from '@/types/api/AuthRequests';
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

    if (res.status === 400) {
      const errors = await res.json();

      if ((errors as RegisterValidationErrors).errors) return errors;
      return { error: errors } as RegisterServerError;
    }

    const error: ApiError = await res.json();
    return { error };
  }
}

const api = new Api();

export default api;
