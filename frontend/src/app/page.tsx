'use client';

import FeaturedPosts from '@/components/home/FeaturedPosts';
import HomeBanner from '@/components/home/HomeBanner';
import HomeContent from '@/components/home/HomeContent';
import PostsProvider from '@/contexts/PostsProvider';

const Home = () => {
  return (
    <main>
      <HomeBanner />

      <PostsProvider>
        <FeaturedPosts />

        <HomeContent />
      </PostsProvider>

    </main>
  );
};

export default Home;
