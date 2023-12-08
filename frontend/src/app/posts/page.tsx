'use client';

import PostList from '@/components/PostList';
import PostsContext from '@/contexts/PostsContext';
import { useContext } from 'react';

const AllPostsPage = () => {
  const { posts } = useContext(PostsContext);

  return (
    <PostList posts={posts} title="Todos os Posts" sort="newest" noResults="" />
  );
};

export default AllPostsPage;
