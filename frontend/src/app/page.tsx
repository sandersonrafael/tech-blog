import FeaturedPosts from '@/components/home/FeaturedPosts';
import HomeBanner from '@/components/home/HomeBanner';
import HomeContent from '@/components/home/HomeContent';

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
