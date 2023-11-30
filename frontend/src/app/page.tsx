'use client';

import FeaturedPosts from '@/components/home/FeaturedPosts';
import HomeBanner from '@/components/home/HomeBanner';
import HomeContent from '@/components/home/HomeContent';
import LayoutFooter from '@/components/layout/LayoutFooter';
import LayoutHeader from '@/components/layout/LayoutHeader';

const Home = () => {
  return (
    <>
      <LayoutHeader />

      <main>
        <HomeBanner />

        <FeaturedPosts />

        <HomeContent />
      </main>

      <LayoutFooter />
    </>
  );
};

export default Home;
