import Comment from '@/types/Comment';
import Post from '@/types/Post';

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

  // TODO -> Quando for fazer o Register, fazer um: delete objeto.repeatPassword (pois no DB não tem repeatPassword)
}

const api = new Api();

export default api;
