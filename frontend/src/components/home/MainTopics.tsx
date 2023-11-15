'use client';
import FeaturedCategory from './FeaturedCategory';

// import featuredPosts from '@/fakeApi/featuredPosts';
import LatestPosts from './LatestPosts';
import { useEffect, useState } from 'react';
import fetchPosts from '@/utils/fetchPosts';
import Post from '@/types/Post';

const MainTopics = ({ className }: { className?: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const loadedPosts = await fetchPosts('http://localhost:8080/api/posts');
      setPosts([...loadedPosts, ...loadedPosts, ...loadedPosts, ...loadedPosts, ...loadedPosts, ...loadedPosts]);
    };

    fetchData();
  }, []);

  return (
    <section className={`${className}`}>
      <FeaturedCategory featuredPosts={posts} />

      <LatestPosts latestPosts={posts} />
    </section>
  );
};

export default MainTopics;
