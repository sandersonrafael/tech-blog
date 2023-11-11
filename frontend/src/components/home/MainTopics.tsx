import FeaturedCategory from './FeaturedCategory';

import featuredPosts from '@/fakeApi/featuredPosts';
import LatestPosts from './LatestPosts';

const MainTopics = ({ className }: { className?: string }) => {
  return (
    <section className={`${className}`}>
      <FeaturedCategory featuredPosts={featuredPosts} />

      <LatestPosts latestPosts={featuredPosts} />
    </section>
  );
};

export default MainTopics;
