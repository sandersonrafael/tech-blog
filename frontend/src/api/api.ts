import { UserRegister } from '@/types/AuthenticationTypes';
import Comment from '@/types/Comment';
import Post from '@/types/Post';
import { RegistrationErrors } from '@/types/ValidationErrors';

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

  public async register(registerRequest: UserRegister): Promise<string | { errors: RegistrationErrors }> {
    delete registerRequest.repeatPassword;

    const res = await fetch(`${apiHost}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...registerRequest, profileImg: '' }), // TODO -> Remover esse profileImg e arrumar a imagem depois
    });

    // TODO -> Ver demais tipos de retornos da aplicação e fazer lógica para erros default;
    // TODO -> Ver a possbilidade de fazer tipos "ApiResponses", para usar todos em cada método dessa api do arquivo

    if (res.status === 201) {
      return 'Usuário cadastrado com sucesso e e-mail de confirmação enviado!';
    }

    const resJson: { errors: RegistrationErrors } = await res.json();

    return resJson;
  }
}

const api = new Api();

export default api;

/* TODO -> Me basear nisso para melhorar a análise das respostas com TypeScript

type SuccessResponse = {
  type: 'success';
  success: string;
};

type ErrorResponse = {
  type: 'error';
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

// Função que retorna a API
function consultarAPI(): ApiResponse {
  // Implemente a lógica da sua consulta à API e retorne um objeto SuccessResponse ou ErrorResponse
  return ...;
}

// Função que verifica o retorno da API
function processarResposta(resposta: ApiResponse) {
  if (resposta.type === 'success') {
    // Acesso às informações de sucesso
    console.log(resposta.success);
    // Realizar ação para sucesso
  } else if (resposta.type === 'error') {
    // Acesso às informações de erro
    console.error(resposta.error);
    // Realizar ação para erro
  }
}

// Exemplo de uso
const resultado = consultarAPI();
processarResposta(resultado);

*/
