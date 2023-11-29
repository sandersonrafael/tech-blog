import { createContext } from 'react';

import PostsContextTypes from '@/types/PostsContextTypes';
import Comment from '@/types/Comment';
import Post from '@/types/Post';

const PostsContext = createContext<PostsContextTypes>({
  posts: [],
  comments: [],
  setPosts: (): Post[] => [],
  setComments: (): Comment[] => [],
});

export default PostsContext;
