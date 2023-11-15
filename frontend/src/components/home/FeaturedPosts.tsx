'use client';
import FeaturedPost from './FeaturedPost';
import PostCard from '../PostCard';

import mainPost from '@/fakeApi/mainPost';
// import featuredPosts from '@/fakeApi/featuredPosts';
import { useEffect, useState } from 'react';
import Post from '@/types/Post';
import fetchPosts from '@/utils/fetchPosts';

const FeaturedPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const posts = await fetchPosts('http://localhost:8080/api/posts');
      setPosts([...posts]);
    };
    fetchData();
  }, []);
  return (
    <section className="max-w-lg sm:container mx-auto xl:max-w-6xl md:px-6 px-3">
      <h2 className="py-7">Posts em Destaque</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 w-full">
        <FeaturedPost {...mainPost} className="col-span-1 sm:col-span-2" />

        {posts.map((post, index) => index <= 3 && (
          <PostCard key={post.id} {...post} description="" className="col-span-1" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
