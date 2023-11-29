import { Dispatch } from 'react';
import Post from './Post';
import Comment from './Comment';

type PostsContextTypes = {
  posts: Post[];
  comments: Comment[];
  setPosts: Dispatch<React.SetStateAction<Post[]>>
  setComments: Dispatch<React.SetStateAction<Comment[]>>
};

export default PostsContextTypes;
