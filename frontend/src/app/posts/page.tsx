'use client';

import PostList from '@/components/PostList';
import LayoutFooter from '@/components/layout/LayoutFooter';
import LayoutHeader from '@/components/layout/LayoutHeader';
import PostsContext from '@/contexts/PostsContext';
import { useContext } from 'react';

const AllPostsPage = () => {
  const { posts } = useContext(PostsContext);

  return (
    <>
      <LayoutHeader />

      <PostList posts={posts} />

      <LayoutFooter />
    </>
  );
};

export default AllPostsPage;
