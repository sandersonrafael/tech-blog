import { createContext } from 'react';

import PostsContextTypes from '@/types/contexts/PostsContextTypes';
import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';

const PostsContext = createContext<PostsContextTypes>({
  posts: [],
  comments: [],
  setPosts: (): Post[] => [],
  setComments: (): Comment[] => [],
});

export default PostsContext;
