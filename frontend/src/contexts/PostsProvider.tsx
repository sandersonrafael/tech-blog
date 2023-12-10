'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import api from '@/api/api';

import Comment from '@/types/entities/Comment';
import Post from '@/types/entities/Post';
import PostsContext from './PostsContext';
import Loading from '@/components/Loading';

const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await api.getAllPosts();

      const extractedComments: Comment[] = [];
      fetchedPosts.forEach((post) => post.comments.forEach(comment => extractedComments.push(comment)));

      setPosts([...fetchedPosts]);
      setComments([...extractedComments]);

      setLoading(false);
    };

    fetchData();
  }, []);

  const value = {
    posts,
    comments,
    setPosts,
    setComments,
  };

  return loading
    ? <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex items-center justify-center">
      <Loading diameter={60} />
    </div>
    : <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  ;
};

export default PostsProvider;
