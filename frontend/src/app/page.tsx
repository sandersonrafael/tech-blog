import FeaturedPosts from '@/components/FeaturedPosts';
import HomeBanner from '@/components/HomeBanner';
import HomeContent from '@/components/HomeContent';

const Home = () => {
  return (
    <main>
      <HomeBanner />

      <FeaturedPosts />

      <HomeContent />
    </main>
  );
};

export default Home;
