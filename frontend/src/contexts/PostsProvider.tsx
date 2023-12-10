'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import api from '@/api/api';

import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';
import PostsContext from './PostsContext';

const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await api.getAllPosts();

      const extractedComments: Comment[] = [];
      fetchedPosts.forEach((post) => post.comments.forEach(comment => extractedComments.push(comment)));

      setPosts([...fetchedPosts]);
      setComments([...extractedComments]);
    };

    fetchData();
  }, []);

  const value = {
    posts,
    comments,
    setPosts,
    setComments,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
